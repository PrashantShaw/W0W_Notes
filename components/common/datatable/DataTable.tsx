"use client"

import {
    ColumnFiltersState,
    PaginationState,
    RowData,
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
import { ChevronDown, CircleX, Trash2 } from "lucide-react"

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
import { ChangeEvent, useCallback, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { debounce } from "@/lib/utils/functions"
import { TooltipProvider } from "@/components/ui/tooltip"
import WithTooltip from "../WithTooltip"

/** 
 * Below declarations of module is for adding the 'updateData' function 
 * to the "@tanstack/react-table" meta, and then use it as-
 * table.options.meta?.updateData(rowId, 'status', 'Done')
*/
declare module '@tanstack/table-core' {
    interface TableMeta<TData extends RowData> {
        updateData: (
            rowId: string,
            update: Partial<Omit<TData, '_id' | 'user' | 'createdAt' | 'updatedAt'>>
        ) => void;
        deleteData: (rowIdList: string[]) => void;
    }
}

export function DataTable<TData extends { _id?: string }, TValue>({
    columns: tableCols,
    data: tableData,
    deleteHandler,
    showRowContent,
    enableDelete
}: DataTableProps<TData, TValue>) {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const defaultSearchTxt = searchParams.get('search')?.toString() ?? ""
    const defaultPage = Number(searchParams.get('page')) || 1

    const [data, setData] = useState(tableData)
    const [columns] = useState(tableCols)
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState(defaultSearchTxt)
    const [searchTxt, setSearchTxt] = useState(defaultSearchTxt)
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: defaultPage - 1,
        pageSize: 7
    })

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
        onPaginationChange: setPagination,
        globalFilterFn: 'includesString',
        state: {
            sorting,
            columnFilters,
            globalFilter,
            rowSelection,
            columnVisibility,
            pagination
        },
        getRowId: (originalRow, index, parent) => originalRow._id ?? String(index),
        meta: {
            updateData: (
                rowId: string,
                update: Partial<Omit<TData, '_id' | 'user' | 'createdAt' | 'updatedAt'>>
            ) => {
                setData(oldData =>
                    oldData.map(row =>
                        row._id === rowId ?
                            { ...row, ...update } : row
                    )
                )
            },
            deleteData: (rowIdList: string[]) => {
                setData(rest => rest.filter(note => !rowIdList.includes(note._id!)))
            },
        },
    })

    // console.log('dataTable data :: ', data)



    const tiggerSearch = useCallback((searchTxt: string) => {
        table.setGlobalFilter(searchTxt)

        const params = new URLSearchParams(searchParams.toString())
        searchTxt !== '' ? params.set('search', searchTxt) : params.delete('search')
        params.set('page', '1')
        router.replace(`${pathname}?${params.toString()}`)
    }, [pathname, router, searchParams, table])

    const debouncedSearch = useMemo(() => debounce(tiggerSearch, 500), [tiggerSearch])

    const searchOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const searchTxt = event.target.value
        setSearchTxt(searchTxt)
        debouncedSearch(searchTxt)
    }, [debouncedSearch])

    const changePage = useCallback((step: 'previous' | 'next') => {
        const params = new URLSearchParams(searchParams.toString())
        const currPage = table.getState().pagination.pageIndex + 1
        let page;
        if (step === 'next') {
            table.nextPage()
            page = currPage + 1
        }
        else {
            table.previousPage()
            page = currPage - 1
        }

        params.set('page', page.toString())
        router.replace(`${pathname}?${params.toString()}`)
    }, [searchParams, pathname, router, table])

    // FIXME: search filter is not working on 'Date Time' column and 'lable' badge

    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Search"
                    value={searchTxt}
                    onChange={searchOnChange}
                    className="max-w-sm"
                />
                <div className="flex gap-3">
                    <TooltipProvider delayDuration={0}>
                        {enableDelete ?
                            <WithTooltip
                                tooltipComponent={<p >Delete All</p>}
                                side='top'
                                enabled={Object.keys(rowSelection).length > 0}
                            >
                                <Button
                                    type="submit"
                                    variant="outline"
                                    size="icon"
                                    disabled={Object.keys(rowSelection).length === 0}
                                    onClick={() => deleteHandler && deleteHandler(Object.keys(rowSelection), table.options.meta?.deleteData!)}
                                >
                                    <CircleX className="h-4 w-4" />
                                </Button>
                            </WithTooltip>
                            :
                            <WithTooltip
                                tooltipComponent={<p >Trash All</p>}
                                side='top'
                                enabled={Object.keys(rowSelection).length > 0}
                            >
                                <Button
                                    type="submit"
                                    variant="outline"
                                    size="icon"
                                    disabled={Object.keys(rowSelection).length === 0}
                                    onClick={() => deleteHandler && deleteHandler(Object.keys(rowSelection), table.options.meta?.deleteData!)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </WithTooltip>
                        }
                    </TooltipProvider>

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
                                    className="cursor-pointer hover:shadow duration-300"
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    onClick={() => showRowContent && showRowContent(row.original)}
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
                        onClick={() => changePage("previous")}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => changePage("next")}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

