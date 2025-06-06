import { SessionProvider } from "@/data/contexts/session.context";
import React from "react";

export default function Layout(props: { children: React.ReactNode }) {
  return <SessionProvider>{props.children}</SessionProvider>;
}
