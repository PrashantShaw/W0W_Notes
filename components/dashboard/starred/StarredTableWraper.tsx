'use client'
import React from 'react'
import { DataTable } from '@/components/common/datatable/DataTable'
import { deleteManyNotes } from '@/lib/actions/dashboard.actions'
import { toast } from '@/components/ui/use-toast'
import { CircleCheckBig } from 'lucide-react'
import { starredColumns } from '@/components/common/datatable/columns/starred.columns'
import { INote } from '@/lib/utils/definitions'
import { TableMeta } from '@tanstack/react-table'

type NoteTableWrapperProps = {
    notes: INote[]
}
const StarredTableWrapper = ({ notes }: NoteTableWrapperProps) => {
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
        <div className=''>
            <DataTable
                data={notes}
                columns={starredColumns}
                deleteHandler={deleteHandler}
            />
        </div>
    )
}

export default StarredTableWrapper