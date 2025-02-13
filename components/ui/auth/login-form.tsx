"use client";
/* import { signIn } from "next-auth/react";
import { useState } from "react"; */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleSignIn } from "@/lib/cognito-actions";
import Image from "next/image";
import { useActionState } from "react";

export default function LoginForm() {
  const [errorMessage, dispatch] = useActionState(handleSignIn, undefined);

  return (
    <Card className="w-full max-w-sm">
      <div className="flex justify-center pt-6">
        <Image
          src="/logo/suan-min.png"
          alt="suan"
          width={40}
          height={80}
        ></Image>
      </div>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Inicio de Sesión</CardTitle>
        <CardDescription>
          Ingresa tu usuario y contraseña para iniciar sesión
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form action={dispatch} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Usuario</Label>
            <Input id="username" name="username" type="text" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" name="password" type="password" />
          </div>
          <div className="grid gap-2 text-right text-xs text-[#4DBC5E]">
            <a href="#" className="">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm">
              Error en la autenticación. Por favor, verifica tus credenciales.
            </div>
          )}
          <Button type="submit" className="w-full">
            Ingresar
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center text-xs space-x-2">
        <span>¿Necesitas una cuenta?</span>
        <a href="/auth/register" className="text-[#4DBC5E]">
          Registrate
        </a>
      </CardFooter>
    </Card>
  );
}
