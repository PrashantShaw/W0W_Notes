import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import githubIcon from "@/public/icons/Github.svg";
import { Github, Sparkle } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 bg-yellow-100">
      <h1 className="text-[3rem] text-gray-900 leading-[3.5rem] text-center md:text-[4rem] md:leading-[4.5rem] font-bold mb-4">
        Wow Notes App
      </h1>
      <p className="text-lg text-slate-700 text-center max-w-[40rem] mb-[3rem]">
        Boost your productivity by managing all your dev tasks in a single
        place. Loved and appreciated by the devs all over the globe.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <Button
          variant={"default"}
          size={"default"}
          className="w-[12rem] font-bold"
          asChild
        >
          <Link href="/signup">
            <Sparkle className="mr-2 w-4" /> Get Started
          </Link>
        </Button>
        <Button
          variant={"outline"}
          size={"default"}
          className="w-[12rem] font-bold"
          asChild
        >
          <Link href="https://github.com/PrashantShaw/W0W_Notes-Nextjs-14">
            <Github size={16} className="mr-2" />
            Visit Code
          </Link>
        </Button>
      </div>
    </main>
  );
}
