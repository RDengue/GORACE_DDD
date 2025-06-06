"use client";
import { MainMenu } from "./menu.component";
import { UserMenu } from "./user-menu.component";

export interface AdminTemplateProps {
  children: React.ReactNode;
}

export default function AdminTemplate(props: AdminTemplateProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-8 h-20 bg-black border-b border-zinc-800">
        <div>Logo</div>
        <UserMenu />
      </header>
      <div className="flex flex-1">
        <MainMenu className="w-72" />
        <main className="flex-1 p-8 bg-black">{props.children}</main>
      </div>
      <footer className="flex items-center justify-end min-h-12 px-8">
        <span className="text-zinc-600 text-sm">
          Feito com ❤️ por Cod3r - {new Date().getFullYear()}{" "}
        </span>
      </footer>
    </div>
  );
}
