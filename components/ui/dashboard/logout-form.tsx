"use client";

import { handleSignOut } from "@/lib/cognito-actions";
import { useRouter } from "next/navigation";

export default function LogoutForm() {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const success = await handleSignOut();
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
