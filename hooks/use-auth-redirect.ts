"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthUser from "./use-auth-user";

export function useAuthRedirect() {
  const router = useRouter();
  const user = useAuthUser();

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  return user;
} 