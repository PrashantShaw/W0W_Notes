"use client"

import {
    ColumnFiltersState,
    RowSelectionState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, CircleCheckBig, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DataTableProps } from "@/lib/utils/definitions"
import { useState } from "react"
import { deleteManyNotes } from "@/lib/actions/dashboard.actions"
import { toast } from "@/components/ui/use-toast"

export function DataTable<TData extends { _id?: string }, TValue>({
    columns: tableCols,
    data: tableData
}: DataTableProps<TData, TValue>) {

    const [data, setData] = useState(tableData)
    const [columns] = useState(tableCols)
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState("")
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        onRowSelectionChange: setRowSelection,
        onColumnVisibilityChange: setColumnVisibility,
        globalFilterFn: 'includesString',
        state: {
            sorting,
            columnFilters,
            globalFilter,
            rowSelection,
            columnVisibility,
        },
        getRowId: (originalRow, index, parent) => originalRow._id ?? String(index),
        meta: {
            updateData: (rowId: string, columnName: string, value: string) => {
                setData(oldData =>
                    oldData.map(row => {
                        if (row._id === rowId) {
                            return {
                                ...row,
                                [columnName]: value
                            }
                        }
                        return row;
                    })
                )
            },
        },
    })

    console.log('dataTable data :: ', data)
    function DeleteManyIconButton() {
        return <form action={async () => {
            const noteIdsList = Object.keys(rowSelection)
            const delResult = await deleteManyNotes(noteIdsList)
            if (delResult.success && delResult.data?.deletedCount! > 0) {
                setData(rest => rest.filter(note => !noteIdsList.includes(note._id!)))
                toast({
                    description: (
                        <div className="flex items-center gap-4 mb-2"><CircleCheckBig color="green" />
                            <p className="font-semibold text-slate-800">{delResult.data?.deletedCount!} Note(s) Successfully Deleted!</p>
                        </div>
                    ),
                })

            }
        }}>
            <Button
                type="submit"
                variant="outline"
                size="icon"
                className=""
                disabled={Object.keys(rowSelection).length === 0}
            // onClick={() => console.log(Object.keys(rowSelection))}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </form>
    }

    // FIXME: search filter is not working on 'Date Time' column
    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Search"
                    value={globalFilter}
                    onChange={(event) =>
                        table.setGlobalFilter(event.target.value)
                    }
                    className="max-w-sm"
                />
                <div className="flex gap-3">
                    <DeleteManyIconButton />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}



