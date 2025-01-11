import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SignupForm } from "@/components/auth/SignupForm";
import AuthHero from "@/components/auth/AuthHero";
import AuthDivider from "@/components/auth/AuthDivider";
import GithubForm from "@/components/auth/GithubForm";
import { ThemeToggler } from "@/components/common/ThemeToggler";

export const metadata: Metadata = {
  title: "Authentication",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Button
          variant="ghost"
          className="absolute right-4 top-4 md:right-8 md:top-8"
        >
          <Link href="/login">Login</Link>
        </Button>
        <div className="absolute left-4 top-4 md:left-[calc(50%+2rem)] md:top-8">
          <ThemeToggler variant={"ghost"} />
        </div>
        <AuthHero />
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <SignupForm />
            <AuthDivider />
            <GithubForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By creating an account, you agree to our{" "}
              <Link
                href="/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
