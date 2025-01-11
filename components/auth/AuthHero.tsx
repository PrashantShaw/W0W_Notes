import React from "react";

const AuthHero = () => {
  return (
    <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div className="absolute inset-0 bg-yellow-500" />
      <div className="relative z-20 text-lg font-medium h-full grid place-items-center pb-6">
        <div className=" flex flex-col py-6 px-8 ">
          <p className="  text-[6rem] leading-[6rem] font-bold italic drop-shadow-xl">
            WOW
          </p>
          <p className="pl-[4rem] text-[6rem] leading-[6rem] font-bold italic drop-shadow-xl">
            NOTES
          </p>
        </div>
      </div>
      <div className="relative z-20 mt-auto">
        <blockquote className="space-y-2">
          <p className="text-lg">
            &ldquo;This App has saved me countless hours of work and helped me
            deliver efficient workflow to my clients faster than ever
            before.&rdquo;
          </p>
          <footer className="text-sm text-muted-foreground">Sofia Davis</footer>
        </blockquote>
      </div>
    </div>
  );
};

export default AuthHero;
