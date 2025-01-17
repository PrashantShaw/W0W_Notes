"use client";
import React, { useState } from "react";
import SideNavLinks from "./SideNavLinks";
import { ChevronsLeft, Power, Settings } from "lucide-react";
import LinkItem from "./LinkItem";
import clsx from "clsx";
import { TooltipProvider } from "@/components/ui/tooltip";
import WithTooltip from "@/components/common/WithTooltip";
import ToggleThemeSidebarButton from "./ToggleThemeSidebarButton";
import Image from "next/image";

const SideNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandBtnClick = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <div className="">
      <TooltipProvider delayDuration={0}>
        <div
          // className="w-[15rem] h-screen shadow flex flex-col overflow-hidden"
          className={clsx(
            " h-screen  shadow flex flex-col overflow-hidden transition-all md:relative absolute bg-background z-10",
            isExpanded ? "w-[15rem]" : "w-0 md:w-[3.75rem]"
          )}
        >
          <div className="py-8 bg-primary mb-8 ">
            <div
              className={clsx(
                "flex gap-[1rem] items-center justify-start transition-all",
                isExpanded ? "px-6" : "px-[0.875rem]"
              )}
            >
              <Image
                src={"/icon-dark.png"}
                alt="Brand Logo"
                width={32}
                height={32}
              />
              <p className="font-bold text-2xl text-primary-foreground text-nowrap">
                Wow Notes
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between flex-grow relative">
            <SideNavLinks tooltipEnabled={!isExpanded} />
            <div className="flex flex-col py-4 gap-1 border-t-[1px] border-t-muted-foreground/30">
              <WithTooltip
                tooltipComponent={<p>Toggle Theme</p>}
                side="right"
                enabled={!isExpanded}
              >
                <ToggleThemeSidebarButton />
              </WithTooltip>
              <WithTooltip
                tooltipComponent={<p>Settings</p>}
                side="right"
                enabled={!isExpanded}
              >
                <LinkItem
                  label="Settings"
                  href="/settings"
                  isActive={false}
                  icon={<Settings className=" h-5" />}
                />
              </WithTooltip>
              <WithTooltip
                tooltipComponent={<p>Logout</p>}
                side="right"
                enabled={!isExpanded}
              >
                <LinkItem
                  label="Logout"
                  href="/api/v1/user/logout"
                  isActive={false}
                  icon={<Power className=" h-5" />}
                />
              </WithTooltip>
            </div>
            <div
              className={clsx(
                "absolute shadow right-0 rounded-tl-xl rounded-bl-xl top-[42.5%] "
              )}
            >
              <ChevronsLeft
                className={clsx(
                  "text-slate-300 h-10 w-10 p-2 transition-all hover: cursor-pointer",
                  !isExpanded && "rotate-180"
                )}
                onClick={expandBtnClick}
              />
            </div>
          </div>
        </div>
      </TooltipProvider>
      <div
        className={clsx(
          "absolute shadow rounded-tr-xl rounded-br-xl top-0 transition-all md:hidden",
          isExpanded ? "left-[15rem]" : "left-0"
        )}
      >
        <ChevronsLeft
          className={clsx(
            "text-slate-500 h-9 w-9 p-1 transition-all hover:text-secondary-foreground cursor-pointer",
            !isExpanded && "rotate-180"
          )}
          onClick={expandBtnClick}
        />
      </div>
    </div>
  );
};

export default SideNav;
