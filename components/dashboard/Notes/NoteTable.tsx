'use client'

import { notesColumns } from '@/components/common/datatable/columns/notes.columns'
import { DataTable } from '@/components/common/datatable/DataTable'
import { toast } from '@/components/ui/use-toast'
import { deleteManyNotes } from '@/lib/actions/dashboard.actions'
import { INote } from '@/lib/utils/definitions'
import { TableMeta } from '@tanstack/react-table'
import { CircleCheckBig } from 'lucide-react'
import React from 'react'

type NoteTableProps = {
    notes: INote[]
}

const NoteTable = ({ notes }: NoteTableProps) => {

    async function deleteHandler(noteIdList: string[], tableDataDeleteHandler: TableMeta<INote>['deleteData']) {
        const delResult = await deleteManyNotes(noteIdList)
        if (delResult.success && delResult.data?.deletedCount! > 0) {
            tableDataDeleteHandler(noteIdList)
            toast({
                description: (
                    <div className="flex items-center gap-4 mb-2"><CircleCheckBig color="green" />
                        <p className="font-semibold text-slate-800">{delResult.data?.deletedCount!} Note(s) Successfully Deleted!</p>
                    </div>
                ),
            })
        }
    }

    return (
        <div className="">
            <DataTable
                data={notes}
                columns={notesColumns}
                deleteHandler={deleteHandler}
            />
        </div>
    )
}

export default NoteTable