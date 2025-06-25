"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Navbar from "@/components/navbar"
import { AlertCircle } from "lucide-react"
import { FcGoogle } from "react-icons/fc"

export default function LoginPage() {
  const { isAuthenticated, isLoading, login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push(callbackUrl)
    }
  }, [isAuthenticated, isLoading, router, callbackUrl])

  const handleGoogleLogin = async () => {
    await login()
  }

  return (
    <div className="sci-fi-container">
      <Navbar />

      <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-12 sci-fi-grid">
        <div className="w-full max-w-md">
          <Card className="sci-fi-card">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Login to <span className="text-primary sci-fi-text-glow">KIIT{"{ease}"}</span>
              </CardTitle>
              <CardDescription className="text-center">
                Sign in to access premium features and your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {error === "OAuthAccountNotLinked"
                      ? "This email is already associated with another account."
                      : "An error occurred during sign in. Please try again."}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full sci-fi-button flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                <FcGoogle className="h-5 w-5" />
                {isLoading ? "Signing in..." : "Continue with Google"}
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="text-center text-sm text-muted-foreground mt-2">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
