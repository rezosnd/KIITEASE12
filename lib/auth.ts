import { hash, compare } from "bcryptjs"
import { sign, verify } from "jsonwebtoken"
import crypto from "crypto"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "your-encryption-key"

// Generate a unique referral code
export function generateReferralCode(name: string): string {
  const randomString = crypto.randomBytes(4).toString("hex").toUpperCase()
  const namePrefix = name.substring(0, 3).toUpperCase()
  return `${namePrefix}${randomString}`
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12)
}

// Compare password with hash
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword)
}

// Generate JWT token
export function generateToken(payload: any): string {
  return sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

// Verify JWT token
export function verifyToken(token: string): any {
  try {
    return verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

// Encrypt sensitive data
export function encryptData(data: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(ENCRYPTION_KEY, "base64"), iv)

  let encrypted = cipher.update(data, "utf8", "hex")
  encrypted += cipher.final("hex")

  const authTag = cipher.getAuthTag().toString("hex")

  return `${iv.toString("hex")}:${encrypted}:${authTag}`
}

// Decrypt sensitive data
export function decryptData(encryptedData: string): string {
  const [ivHex, encryptedHex, authTagHex] = encryptedData.split(":")

  const iv = Buffer.from(ivHex, "hex")
  const authTag = Buffer.from(authTagHex, "hex")

  const decipher = crypto.createDecipheriv("aes-256-gcm", Buffer.from(ENCRYPTION_KEY, "base64"), iv)

  decipher.setAuthTag(authTag)

  let decrypted = decipher.update(encryptedHex, "hex", "utf8")
  decrypted += decipher.final("utf8")

  return decrypted
}
