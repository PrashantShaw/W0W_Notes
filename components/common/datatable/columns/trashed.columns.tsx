"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef, TableMeta } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  ArchiveRestore,
  ArrowUpDown,
  Circle,
  CircleCheck,
  CircleCheckBig,
  CircleDotDashed,
  CircleHelp,
  CircleX,
  MoreHorizontal,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { INote } from "@/lib/utils/definitions";
import { Badge } from "@/components/ui/badge";
import date from "date-and-time";
import { deleteManyNotes, updateNote } from "@/lib/actions/dashboard.actions";
import { toast } from "@/components/ui/use-toast";
import StarIcon from "@/components/common/StarIcon";

export type PartialNoteData = Partial<
  Omit<INote, "_id" | "user" | "createdAt" | "updatedAt">
>;

const statusIcons = {
  ToDo: Circle,
  "In Progress": CircleDotDashed,
  Cancelled: CircleX,
  Done: CircleCheck,
  Backlog: CircleHelp,
};

async function updateTableData(
  itemId: string,
  update: PartialNoteData,
  onSuccessFn: TableMeta<INote>["updateData"]
) {
  const result = await updateNote(itemId, update);
  if (result.success) {
    onSuccessFn(itemId, update);
    toast({
      description: (
        <div className="flex items-center gap-4 mb-2">
          <CircleCheckBig color="green" />
          <p className="font-semibold text-secondary-foreground">
            Note Successfully Updated!
          </p>
        </div>
      ),
    });
  }
}

async function deleteTableData(
  itemIdList: string[],
  onSuccessFn: TableMeta<INote>["deleteData"]
) {
  const result = await deleteManyNotes(itemIdList);
  if (result.success) {
    onSuccessFn(itemIdList);
    toast({
      description: (
        <div className="flex items-center gap-4 mb-2">
          <CircleCheckBig color="green" />
          <p className="font-semibold text-secondary-foreground">
            Note Successfully Deleted!
          </p>
        </div>
      ),
    });
  }
}

async function restoreTableData(
  itemId: string,
  update: PartialNoteData,
  onSuccessFn: TableMeta<INote>["deleteData"]
) {
  const result = await updateNote(itemId, update);
  if (result.success) {
    onSuccessFn([itemId]);
    toast({
      description: (
        <div className="flex items-center gap-4 mb-2">
          <ArchiveRestore color="green" />
          <p className="font-semibold text-secondary-foreground">
            Note Successfully Restored!
          </p>
        </div>
      ),
    });
  }
}

export const trashedColumns: ColumnDef<INote>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className=" flex justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div
        className=" flex justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="ml-8"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row, table }) => {
      const { _id: rowId, label, starred } = row.original;
      const isStarred = starred ?? false;
      return (
        <div className="flex items-center">
          <span
            onClick={(evt) => {
              evt.stopPropagation();
              updateTableData(
                rowId,
                { starred: !isStarred },
                table.options.meta?.updateData!
              );
            }}
          >
            <StarIcon isSelected={isStarred} />
          </span>
          <Badge variant="outline" className="rounded mx-3">
            {label}
          </Badge>
          <p>{row.getValue("title")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("priority")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusVal = row.original.status;
      const StatusIcon = statusIcons[statusVal];
      return (
        <div className="capitalize flex items-center">
          <StatusIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          {statusVal}
        </div>
      );
    },
  },
  {
    accessorKey: "createdat",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      const dateTime = new Date(createdAt!);
      const datTimeFormatted = date.format(dateTime!, "DD-MM-YYYY, hh:mm:ss A");
      // console.log("dateTime :: ", datTimeFormatted)
      return <div className="capitalize">{datTimeFormatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const rowId = row.original._id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="flex items-center"
              onClick={() =>
                restoreTableData(
                  rowId,
                  { trashed: false },
                  table.options.meta?.deleteData!
                )
              }
            >
              <ArchiveRestore className="mr-2 h-4 w-4 text-muted-foreground" />{" "}
              Restore
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center"
              onClick={() =>
                deleteTableData([rowId], table.options.meta?.deleteData!)
              }
            >
              <X className="mr-2 h-4 w-4 text-muted-foreground" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
