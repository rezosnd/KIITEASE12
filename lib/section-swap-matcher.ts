import type { ObjectId } from "mongodb"
import { connectToDatabase } from "@/lib/db"
import { sendSwapMatchEmail, sendSwapExpiredEmail } from "@/lib/email-service"

interface SwapRequest {
  _id: ObjectId
  userId: ObjectId
  userName: string
  userEmail: string
  userPhone?: string // Optional phone number
  currentBranch: string
  currentSection: string
  targetSection: string
  status: "pending" | "matched" | "completed" | "expired" | "cancelled"
  matchedWith?: ObjectId
  matchedWithName?: string
  matchedWithEmail?: string
  matchedWithPhone?: string // Optional phone number for matched user
  matchedAt?: Date
  completedAt?: Date
  expiresAt?: Date
  createdAt: Date
  updatedAt: Date
}

export async function findMatchingSwapRequests() {
  const { db } = await connectToDatabase()

  // Get all pending swap requests with user details including phone
  const pendingRequests = await db
    .collection("sectionSwapRequests")
    .aggregate([
      { $match: { status: "pending" } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 1,
          userId: 1,
          userName: "$user.name",
          userEmail: "$user.email",
          userPhone: "$user.phone", // Include phone if available
          currentBranch: 1,
          currentSection: 1,
          targetSection: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      { $sort: { createdAt: 1 } },
    ])
    .toArray()

  const matches: { request1: SwapRequest; request2: SwapRequest }[] = []

  // Find complementary swap requests
  for (let i = 0; i < pendingRequests.length; i++) {
    const request1 = pendingRequests[i]

    for (let j = i + 1; j < pendingRequests.length; j++) {
      const request2 = pendingRequests[j]

      // Check if requests are complementary
      if (
        request1.currentBranch === request2.currentBranch &&
        request1.currentSection === request2.targetSection &&
        request1.targetSection === request2.currentSection
      ) {
        matches.push({ request1, request2 })

        // Update both requests to matched status
        const expiresAt = new Date()
        expiresAt.setHours(expiresAt.getHours() + 24) // 24 hours expiry

        await db.collection("sectionSwapRequests").updateOne(
          { _id: request1._id },
          {
            $set: {
              status: "matched",
              matchedWith: request2.userId,
              matchedWithName: request2.userName,
              matchedWithEmail: request2.userEmail,
              matchedWithPhone: request2.userPhone, // Include phone if available
              matchedAt: new Date(),
              expiresAt,
              updatedAt: new Date(),
            },
          },
        )

        await db.collection("sectionSwapRequests").updateOne(
          { _id: request2._id },
          {
            $set: {
              status: "matched",
              matchedWith: request1.userId,
              matchedWithName: request1.userName,
              matchedWithEmail: request1.userEmail,
              matchedWithPhone: request1.userPhone, // Include phone if available
              matchedAt: new Date(),
              expiresAt,
              updatedAt: new Date(),
            },
          },
        )

        // Send email notifications to both users
        await sendSwapMatchEmail({
          name: request1.userName,
          email: request1.userEmail,
          currentSection: request1.currentSection,
          targetSection: request1.targetSection,
          matchedWithName: request2.userName,
          matchedWithPhone: request2.userPhone, // Include phone if available
          expiresAt,
        })

        await sendSwapMatchEmail({
          name: request2.userName,
          email: request2.userEmail,
          currentSection: request2.currentSection,
          targetSection: request2.targetSection,
          matchedWithName: request1.userName,
          matchedWithPhone: request1.userPhone, // Include phone if available
          expiresAt,
        })

        break // Move to next request1
      }
    }
  }

  return matches
}

export async function expireOldMatches() {
  const { db } = await connectToDatabase()

  const now = new Date()

  // Find matched requests that have expired with user details
  const expiredMatches = await db
    .collection("sectionSwapRequests")
    .aggregate([
      {
        $match: {
          status: "matched",
          expiresAt: { $lt: now },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 1,
          userId: 1,
          userName: "$user.name",
          userEmail: "$user.email",
          currentBranch: 1,
          currentSection: 1,
          targetSection: 1,
          status: 1,
          matchedWith: 1,
          matchedWithName: 1,
          matchedWithEmail: 1,
          expiresAt: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ])
    .toArray()

  for (const match of expiredMatches) {
    // Reset to pending status
    await db.collection("sectionSwapRequests").updateOne(
      { _id: match._id },
      {
        $set: {
          status: "pending",
          matchedWith: null,
          matchedWithName: null,
          matchedWithEmail: null,
          matchedAt: null,
          expiresAt: null,
          updatedAt: new Date(),
        },
      },
    )

    // Send expiration email
    await sendSwapExpiredEmail({
      name: match.userName,
      email: match.userEmail,
      currentSection: match.currentSection,
      targetSection: match.targetSection,
    })

    // Also reset the matched request
    if (match.matchedWith) {
      await db.collection("sectionSwapRequests").updateOne(
        { userId: match.matchedWith, status: "matched" },
        {
          $set: {
            status: "pending",
            matchedWith: null,
            matchedWithName: null,
            matchedWithEmail: null,
            matchedAt: null,
            expiresAt: null,
            updatedAt: new Date(),
          },
        },
      )

      // Send expiration email to the matched user
      if (match.matchedWithEmail) {
        await sendSwapExpiredEmail({
          name: match.matchedWithName || "User",
          email: match.matchedWithEmail,
          currentSection: match.targetSection, // Reversed for the matched user
          targetSection: match.currentSection, // Reversed for the matched user
        })
      }
    }
  }

  return expiredMatches.length
}
