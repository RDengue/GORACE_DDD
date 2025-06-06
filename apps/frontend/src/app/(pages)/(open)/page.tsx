import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <span>Landing</span>
      <Link href="/auth">
        <span className="text-blue-500">Auth</span>
      </Link>
    </div>
  );
}
