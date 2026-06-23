"use client";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export default function SSOCallbackPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const syncUser = async () => {
        try {
          const res = await fetch("/api/auth/sync-user", {
            method: "POST",
          });
          if (res.ok) {
            router.push("/");
          } else {
            toast.error("Đăng nhập thất bại");
          }
        } catch (err) {
          console.error(err);
          toast.error("Đăng nhập thất bại");
        }
      };
      syncUser();
    }
  }, [isSignedIn, isLoaded, router]);

  return <AuthenticateWithRedirectCallback />;
}

