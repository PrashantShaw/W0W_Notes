"use client";

import { ChevronRight, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ToggleThemeSidebarButton = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <div className="py-2 px-5 flex justify-between items-center transition-all hover:bg-secondary">
          <div className="flex gap-[1rem] items-center text-secondary-foreground">
            <Sun className="h-5 transition-all dark:hidden" />
            <Moon className="h-5 transition-all hidden dark:block" />
            <span className="sr-only">Toggle theme</span>
            <p className="text-nowrap">Toggle Theme</p>
          </div>
          <ChevronRight className="h-5 text-slate-400" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ToggleThemeSidebarButton;
