import clsx from "clsx";
import React from "react";

type StarIconProps = {
  isSelected?: boolean;
};

const StarIcon = ({ isSelected = false }: StarIconProps) => {
  const classes = isSelected ? "text-amber-400" : "text-slate-400";
  const fillColor = isSelected ? "rgb(251 191 36)" : "None";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill={fillColor}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx(
        "lucide lucide-star cursor-pointer p-[0.5rem] rounded-sm hover:bg-secondary ",
        classes
      )}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

export default StarIcon;
