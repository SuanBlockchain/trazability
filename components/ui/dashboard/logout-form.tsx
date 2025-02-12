"use client";

import { handleSignOut } from "@/lib/cognitoActions";

export default function LogoutForm() {
  return (
    <form action={handleSignOut}>
      <button>Desconectar</button>
    </form>
  );
}
