import TrashedTable from "@/components/dashboard/trash/TrashedTable";
import React, { Suspense } from "react";

const TrashNotes = () => {
  return (
    <div className="flex flex-col p-10 gap-6">
      <div className="flex w-full items-center justify-between space-x-4">
        <div className="">
          <h1 className="text-3xl text-secondary-foreground font-semibold mb-2">
            Starred Notes
          </h1>
          <p className="text-muted-foreground">
            All your starred notes at one place, keep starring!
          </p>
        </div>
      </div>
      <Suspense
        fallback={
          <h1 className="text-center text-4xl font-semibold text-slate-300 pt-[10rem]">
            loading ...{" "}
          </h1>
        }
      >
        <TrashedTable />
      </Suspense>
    </div>
  );
};

export default TrashNotes;
