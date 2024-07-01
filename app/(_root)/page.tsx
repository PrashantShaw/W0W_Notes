import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import githubIcon from "@/public/icons/Github.svg"
import { Sparkle } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-slate-200">
      <h1 className="text-[4rem] font-bold ">Wow Notes App</h1>
      <p className="text-lg text-slate-700 text-center max-w-[40rem] mb-[3rem]">Boost your productivity by managing all your dev tasks in a single place. Loved and appreciated by the devs all over the globe.</p>
      <div className="flex gap-4">
        <Button
          variant={"default"}
          size={"default"}
          className="w-[12rem] font-bold"
          asChild
        >
          <Link href="/signup"><Sparkle className="mr-2 w-4" /> Get Started</Link>
        </Button>
        <Button
          variant={"outline"}
          size={"default"}
          className="w-[12rem] text-slate-900 font-bold"
          asChild
        >
          <Link href="https://github.com/PrashantShaw/W0W_Notes-Nextjs-14">
            <Image src={githubIcon} alt="github Icon" className="mr-2" />
            Visit Code
          </Link>
        </Button>
      </div>
    </main>
  );
}
