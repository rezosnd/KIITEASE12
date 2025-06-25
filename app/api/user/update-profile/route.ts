import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-config"
import { connectToDatabase } from "@/lib/db"
import { ObjectId } from "mongodb"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { phone } = await req.json()

    // Validate phone number format if provided
    if (phone && !/^\+?[0-9]{10,15}$/.test(phone)) {
      return NextResponse.json({ message: "Invalid phone number format" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Check if phone number already exists for another user
    if (phone) {
      const existingUser = await db.collection("users").findOne({
        _id: { $ne: new ObjectId(session.user.id) },
        phone,
      })

      if (existingUser) {
        return NextResponse.json({ message: "Phone number already in use" }, { status: 409 })
      }
    }

    // Update user profile
    await db.collection("users").updateOne(
      { _id: new ObjectId(session.user.id) },
      {
        $set: {
          phone,
          updatedAt: new Date(),
        },
      },
    )

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    })
  } catch (error: any) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ message: error.message || "Failed to update profile" }, { status: 500 })
  }
}
