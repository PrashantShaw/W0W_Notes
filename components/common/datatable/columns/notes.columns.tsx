'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef, TableMeta } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Circle, CircleCheck, CircleCheckBig, CircleDotDashed, CircleHelp, CircleX, MoreHorizontal, Pencil, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { INote } from "@/lib/utils/definitions"
import { Badge } from "@/components/ui/badge"
import date from 'date-and-time';
import { deleteManyNotes, updateNote } from "@/lib/actions/dashboard.actions"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"


export type PartialNoteData = Partial<Omit<INote, '_id' | 'user' | 'createdAt' | 'updatedAt'>>

const statusIcons = {
    ToDo: Circle,
    'In Progress': CircleDotDashed,
    Cancelled: CircleX,
    Done: CircleCheck,
    Backlog: CircleHelp,
}

async function updateTableData(
    itemId: string,
    update: PartialNoteData,
    onSuccessFn: TableMeta<INote>['updateData']
) {
    const result = await updateNote(itemId, update)
    if (result.success) {
        onSuccessFn(itemId, update)
        toast({
            description: (
                <div className="flex items-center gap-4 mb-2"><CircleCheckBig color="green" />
                    <p className="font-semibold text-slate-900">Note Successfully Updated!</p>
                </div>
            ),
        })
    }
}

async function deleteTableData(
    itemIdList: string[],
    onSuccessFn: TableMeta<INote>['deleteData']
) {
    const result = await deleteManyNotes(itemIdList)
    if (result.success) {
        onSuccessFn(itemIdList)
        toast({
            description: (
                <div className="flex items-center gap-4 mb-2"><CircleCheckBig color="green" />
                    <p className="font-semibold text-slate-900">Note Successfully Deleted!</p>
                </div>
            ),
        })
    }
}

export const notesColumns: ColumnDef<INote>[] = [
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
            <div className=" flex justify-center">
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
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">
            <Badge variant="outline" className="rounded mx-3">{row.original.label}</Badge>
            {row.getValue("title")}
        </div>,
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
            const statusVal = row.original.status
            const StatusIcon = statusIcons[statusVal]
            return <div className="capitalize flex items-center">
                <StatusIcon className="mr-2 h-4 w-4 text-slate-600" />
                {statusVal}
            </div>
        },
    },
    {
        accessorKey: "createdat",
        header: "Created At",
        cell: ({ row }) => {
            const createdAt = row.original.createdAt
            const dateTime = new Date(createdAt!)
            const datTimeFormatted = date.format(dateTime!, "DD-MM-YYYY, hh:mm:ss A")
            // console.log("dateTime :: ", datTimeFormatted)
            return <div className="capitalize">{datTimeFormatted}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row, table }) => {
            const rowId = row.original._id

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            className="flex items-center"
                            onClick={() => updateTableData(rowId, { status: 'Done' }, (table.options.meta?.updateData!))}
                        >
                            <CircleCheck className="mr-2 h-4 w-4 text-slate-600" /> Done
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => updateTableData(rowId, { status: 'In Progress' }, (table.options.meta?.updateData!))}
                            className="flex items-center"
                        >
                            <CircleDotDashed className="mr-2 h-4 w-4 text-slate-600" />
                            In Progress
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <Link href={`/dashboard/notes/${rowId}/edit`}>
                            <DropdownMenuItem className="flex items-center">
                                <Pencil className="mr-2 h-4 w-4 text-slate-600" />Edit
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                            className="flex items-center"
                            onClick={() => deleteTableData([rowId], (table.options.meta?.deleteData!))}
                        >
                            <Trash className="mr-2 h-4 w-4 text-slate-600" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]