import { Icons } from "@/components/icons"

export default function LoginLoading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Icons.logo className="h-12 w-12 animate-pulse text-muted" />
    </div>
  )
} 