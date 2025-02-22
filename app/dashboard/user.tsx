"use client";

import { Button } from "@/components/ui/button";
/* import { auth, signOut } from '@/lib/auth'; */
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import LogoutForm from "@/components/ui/dashboard/logout-form";
import useAuthUser from "@/hooks/use-auth-user";
import { useSession } from "next-auth/react";

export function User() {
  const { data: session, status: statusSession } = useSession();
  const user = useAuthUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full ml-auto"
        >
          <Image
            src={"/placeholder-user.jpg"}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Mi Perfil</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Configuración</DropdownMenuItem>
        <DropdownMenuItem>Soporte</DropdownMenuItem>
        <DropdownMenuSeparator />
        {session ? (
          <DropdownMenuItem>
            <LogoutForm />
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link href="/auth/login">Iniciar Sesión</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
