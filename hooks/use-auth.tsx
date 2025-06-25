"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export function useAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  const user = session?.user
  const isAuthenticated = !!user
  const isLoading = status === "loading"
  const isPremium = user?.role === "premium" || user?.role === "admin"
  const isAdmin = user?.role === "admin"

  const login = async () => {
    try {
      await signIn("google", { callbackUrl: "/" })
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: "There was a problem signing in with Google.",
        variant: "destructive",
      })
    }
  }

  const logout = async () => {
    try {
      await signOut({ callbackUrl: "/" })
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const upgradeAccount = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to upgrade your account.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    router.push("/premium")
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    isPremium,
    isAdmin,
    login,
    logout,
    upgradeAccount,
  }
}
