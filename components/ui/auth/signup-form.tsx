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
import { handleSignUp } from "@/lib/cognitoActions";
import Image from "next/image";
import { useActionState } from "react";

export default function SignUpForm() {
  const [errorMessage, dispatch] = useActionState(handleSignUp, undefined);

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
        <CardTitle className="text-2xl">Creación de cuenta</CardTitle>
        <CardDescription>
          Crea tu cuenta para poder ingresar a la Plataforma
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Usuario</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" type="password" />
        </div>
        <div className="grid gap-2 text-right text-xs text-[#4DBC5E]">
          <a href="#" className="">
            Olvidaste tu contraseña?
          </a>
        </div>
      </CardContent>
      <div className="p-6 pt-0">
        <Button className="w-full">Ingresar</Button>
      </div>
      <CardFooter className="justify-center text-xs space-x-2">
        <span>¿Ya tienes una cuenta?</span>
        <a href="/auth/login" className="text-[#4DBC5E]">
          Ingresar
        </a>
      </CardFooter>
    </Card>
  );
}
