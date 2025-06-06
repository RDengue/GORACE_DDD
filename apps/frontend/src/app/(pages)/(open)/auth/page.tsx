"use client";

import Input from "@/components/shared/input.component";
import useAuthForm from "@/data/hooks/auth-form.hook";
import useSession from "@/data/hooks/use-session.hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthPage() {
  const router = useRouter();
  const { loading, user } = useSession();
  const { modo, usuario, setModo, setUsuario, registrar, login } =
    useAuthForm();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col w-96 gap-5">
        {modo === "registrar" && (
          <Input
            value={usuario.nome ?? ""}
            label="Nome"
            onChangeValue={(nome) => setUsuario({ ...usuario, nome })}
          />
        )}
        <Input
          value={usuario.email ?? ""}
          label="Email"
          onChangeValue={(email) => setUsuario({ ...usuario, email })}
        />
        <Input
          value={usuario.senha ?? ""}
          label="Senha"
          type="password"
          onChangeValue={(senha) => setUsuario({ ...usuario, senha })}
        />
      </div>
      <div className="flex flex-col gap-5 mt-5">
        <button
          onClick={() => {
            modo === "registrar" ? registrar(usuario) : login(usuario);
          }}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          {modo === "registrar" ? "Registrar" : "Entrar"}
        </button>
        <button
          onClick={() => setModo(modo === "registrar" ? "login" : "registrar")}
          className="text-blue-500"
        >
          {modo === "registrar"
            ? "Já tem uma conta? Entre"
            : "Não tem uma conta? Registre-se"}
        </button>
      </div>
    </div>
  );
}
