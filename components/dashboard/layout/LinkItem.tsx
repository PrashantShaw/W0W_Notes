import { LinkItemProps } from "@/lib/utils/definitions";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const LinkItem = ({ label, href, isActive = false, icon }: LinkItemProps) => {
  return (
    <Link href={href}>
      <div
        className={clsx(
          "py-2 px-5 flex justify-between items-center transition-all",
          isActive ? "bg-primary hover:bg-primary/90" : "hover:bg-secondary"
        )}
      >
        <div
          className={clsx(
            "flex gap-[1rem] items-center",
            isActive
              ? "text-primary-foreground font-medium"
              : "text-secondary-foreground"
          )}
        >
          {icon}
          <p>{label}</p>
        </div>
        <ChevronRight
          className={clsx(
            " h-5",
            isActive ? "text-slate-600" : "text-slate-400"
          )}
        />
      </div>
    </Link>
  );
};

export default LinkItem;
