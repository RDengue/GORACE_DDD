import { cn } from "@/lib/utils";
import Link from "next/link";

export interface MainMenuProps {
  className?: string;
}

export function MainMenu(props: MainMenuProps) {
  return (
    <aside
      className={cn(
        "flex flex-col gap-2 p-4 bg-black border-r border-zinc-800 text-zinc-200 rounded-lg",
        props.className
      )}
    >
      <nav>
        <ul className="flex flex-col gap-2">
          <li className="cursor-pointer px-4 py-2 rounded-lg hover:bg-white/10">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="cursor-pointer px-4 py-2 rounded-lg hover:bg-white/10">
            <Link href="/extrato">Extrato</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
