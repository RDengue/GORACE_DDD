"use client";
import { useState } from "react";
import useApi from "./api.hook";
import useSession from "./use-session.hook";
import { useRouter } from "next/navigation";

export type Usuario = {
  nome?: string;
  email?: string;
  senha?: string;
};

export default function useAuthForm() {
  const [modo, setModo] = useState<"login" | "registrar">("login");
  const [usuario, setUsuario] = useState<Usuario>({});
  const { createSession } = useSession();
  const router = useRouter();

  const { post } = useApi();

  async function registrar(usuario: Usuario) {
    try {
      await post("/auth/register", usuario);
      setModo("login");
      setUsuario({});
      alert("Usuário registrado com sucesso!");
    } catch (error) {
      alert((error as any).message);
    }
  }

  async function login(usuario: Usuario) {
    try {
      const resposta = await post("/auth/login", {
        email: usuario.email,
        senha: usuario.senha,
      });
      setUsuario({});
      createSession(resposta.token);
      router.push("/dashboard");
    } catch (error) {
      alert((error as any).message);
    }
  }

  return {
    modo,
    usuario,
    setModo,
    setUsuario,
    registrar,
    login,
  };
}
