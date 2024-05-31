import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">Wow Notes App</h1>
      <Button
        variant={"secondary"}
        size={"default"}
        className="w-[12rem] text-slate-600 font-bold"
        asChild
      >
        <Link href="/signup">Get Started</Link>
      </Button>
    </main>
  );
}
