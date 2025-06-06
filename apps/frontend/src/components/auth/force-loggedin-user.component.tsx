"use client";
import useSession from "@/data/hooks/use-session.hook";
import { useRouter } from "next/navigation";
import React from "react";

export interface ForceLoggedInUserProps {
  children: any;
  admin?: boolean;
}

export default function ForceLoggedInUser(props: {
  children: React.ReactNode;
}) {
  const { loading, user } = useSession();
  const router = useRouter();

  if (loading) return <span>Processando...</span>;

  if (!user?.email) {
    if (typeof window !== "undefined") {
      Promise.resolve().then(() => router.push("/auth"));
    }
    return <span>Processando...</span>;
  }

  return props.children;
}
