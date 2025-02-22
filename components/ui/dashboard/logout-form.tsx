"use client";

import { handleSignOut } from "@/lib/cognito-actions";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function LogoutForm() {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const success = await signOut({ redirect: false });
    if (success) {
      router.push("/auth/login");
    }
  };

  return (
    <form action={handleSubmit}>
      <button>Desconectar</button>
    </form>
  );
}
