import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { LoginButtons } from "@/components/auth/LoginButtons"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  if (session) redirect("/")

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-text">
            Welcome back
          </h1>
          <p className="text-sm text-muted">
            Choose your preferred sign in method
          </p>
        </div>
        <LoginButtons />
        <p className="px-8 text-center text-sm text-muted">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="hover:text-text underline underline-offset-4"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="hover:text-text underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
} 