import { MongoClient } from "mongodb"

// This script sets up the MongoDB database for KIITease
async function setupDatabase() {
  console.log("Setting up KIITease database...")

  // Connect to MongoDB
  const uri =
    process.env.MONGODB_URI ||
    "mongodb+srv://rehansuman41008:qU5sgnrCY0q8i2rn@kiitease.kcndzbn.mongodb.net/kiitease?retryWrites=true&w=majority&appName=KIITease"
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db("kiitease")

    // Drop existing collections and indexes to avoid conflicts
    try {
      const collections = await db.listCollections().toArray()
      for (const collection of collections) {
        await db.collection(collection.name).drop()
      }
      console.log("Dropped existing collections")
    } catch (error) {
      console.log("No existing collections to drop or error dropping collections:", error)
    }

    // Create collections with validation
    console.log("Creating collections...")

    // Users collection
    await db.createCollection("users", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "email", "role"],
          properties: {
            name: { bsonType: "string" },
            email: { bsonType: "string" },
            passwordHash: { bsonType: ["string", "null"] },
            role: { enum: ["free", "premium", "admin"] },
            referralCode: { bsonType: ["string", "null"] },
            referredBy: { bsonType: ["string", "null"] },
            phone: { bsonType: ["string", "null"] },
            premiumUntil: { bsonType: ["date", "null"] },
            image: { bsonType: ["string", "null"] },
            createdAt: { bsonType: ["date", "null"] },
            updatedAt: { bsonType: ["date", "null"] },
          },
        },
      },
    })

    // Teachers collection
    await db.createCollection("teachers", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "department", "subjects"],
          properties: {
            name: { bsonType: "string" },
            department: { bsonType: "string" },
            subjects: { bsonType: "array", items: { bsonType: "string" } },
            image: { bsonType: ["string", "null"] },
            createdAt: { bsonType: ["date", "null"] },
            updatedAt: { bsonType: ["date", "null"] },
          },
        },
      },
    })

    // Reviews collection
    await db.createCollection("reviews", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["teacherId", "userId", "subject", "rating", "content"],
          properties: {
            teacherId: { bsonType: "objectId" },
            userId: { bsonType: "objectId" },
            subject: { bsonType: "string" },
            rating: { bsonType: "number", minimum: 1, maximum: 5 },
            content: { bsonType: "string" },
            createdAt: { bsonType: ["date", "null"] },
            updatedAt: { bsonType: ["date", "null"] },
          },
        },
      },
    })

    // Notes collection
    await db.createCollection("notes", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title", "subject", "branch", "year", "userId", "fileUrl", "fileSize", "fileType"],
          properties: {
            title: { bsonType: "string" },
            subject: { bsonType: "string" },
            branch: { bsonType: "string" },
            year: { bsonType: "string" },
            userId: { bsonType: "objectId" },
            fileUrl: { bsonType: "string" },
            fileSize: { bsonType: "string" },
            fileType: { bsonType: "string" },
            downloads: { bsonType: "int" },
            createdAt: { bsonType: ["date", "null"] },
            updatedAt: { bsonType: ["date", "null"] },
          },
        },
      },
    })

    // Section Swap Requests collection
    await db.createCollection("sectionSwapRequests", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["userId", "currentBranch", "currentSection", "targetSection", "status"],
          properties: {
            userId: { bsonType: "objectId" },
            currentBranch: { bsonType: "string" },
            currentSection: { bsonType: "string" },
            targetSection: { bsonType: "string" },
            status: { enum: ["pending", "matched", "completed", "expired", "cancelled"] },
            matchedWith: { bsonType: ["objectId", "null"] },
            matchedWithName: { bsonType: ["string", "null"] },
            matchedWithEmail: { bsonType: ["string", "null"] },
            matchedAt: { bsonType: ["date", "null"] },
            completedAt: { bsonType: ["date", "null"] },
            expiresAt: { bsonType: ["date", "null"] },
            createdAt: { bsonType: ["date", "null"] },
            updatedAt: { bsonType: ["date", "null"] },
          },
        },
      },
    })

    // Referrals collection
    await db.createCollection("referrals", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["referrerId", "referredId", "status"],
          properties: {
            referrerId: { bsonType: "objectId" },
            referredId: { bsonType: "objectId" },
            status: { enum: ["pending", "completed"] },
            rewardType: { bsonType: ["string", "null"] },
            rewardAmount: { bsonType: ["int", "null"] },
            createdAt: { bsonType: ["date", "null"] },
            updatedAt: { bsonType: ["date", "null"] },
          },
        },
      },
    })

    // Payments collection
    await db.createCollection("payments", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["userId", "amount", "status", "paymentMethod"],
          properties: {
            userId: { bsonType: "objectId" },
            amount: { bsonType: "number" },
            status: { enum: ["pending", "completed", "failed", "refunded"] },
            paymentMethod: { bsonType: "string" },
            transactionId: { bsonType: ["string", "null"] },
            createdAt: { bsonType: ["date", "null"] },
            updatedAt: { bsonType: ["date", "null"] },
          },
        },
      },
    })

    // Completed Swaps collection for public display
    await db.createCollection("completedSwaps", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["user1Id", "user2Id", "branch", "section1", "section2", "completedAt"],
          properties: {
            user1Id: { bsonType: "objectId" },
            user1Name: { bsonType: "string" },
            user2Id: { bsonType: "objectId" },
            user2Name: { bsonType: "string" },
            branch: { bsonType: "string" },
            section1: { bsonType: "string" },
            section2: { bsonType: "string" },
            completedAt: { bsonType: "date" },
            createdAt: { bsonType: "date" },
          },
        },
      },
    })

    // Create indexes
    console.log("Creating indexes...")

    // Users indexes
    await db.collection("users").createIndex({ email: 1 }, { unique: true })
    await db.collection("users").createIndex({ referralCode: 1 }, { unique: true, sparse: true })
    // Only create phone index if the field is not null
    await db.collection("users").createIndex({ phone: 1 }, { unique: true, sparse: true })

    // Teachers indexes
    await db.collection("teachers").createIndex({ name: 1 })
    await db.collection("teachers").createIndex({ department: 1 })
    await db.collection("teachers").createIndex({ subjects: 1 })

    // Reviews indexes
    await db.collection("reviews").createIndex({ teacherId: 1 })
    await db.collection("reviews").createIndex({ userId: 1 })
    await db.collection("reviews").createIndex({ teacherId: 1, userId: 1 }, { unique: true })

    // Notes indexes
    await db.collection("notes").createIndex({ subject: 1 })
    await db.collection("notes").createIndex({ branch: 1 })
    await db.collection("notes").createIndex({ year: 1 })
    await db.collection("notes").createIndex({ userId: 1 })

    // Section Swap Requests indexes
    await db.collection("sectionSwapRequests").createIndex({ userId: 1 })
    await db.collection("sectionSwapRequests").createIndex({ currentBranch: 1, currentSection: 1 })
    await db.collection("sectionSwapRequests").createIndex({ currentBranch: 1, targetSection: 1 })
    await db.collection("sectionSwapRequests").createIndex({ status: 1 })

    // Referrals indexes
    await db.collection("referrals").createIndex({ referrerId: 1 })
    await db.collection("referrals").createIndex({ referredId: 1 })

    // Payments indexes
    await db.collection("payments").createIndex({ userId: 1 })
    await db.collection("payments").createIndex({ transactionId: 1 }, { sparse: true })

    console.log("Database setup completed successfully!")
  } catch (error) {
    console.error("Error setting up database:", error)
  } finally {
    await client.close()
    console.log("Database connection closed")
  }
}

setupDatabase()
