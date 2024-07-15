'use client'
import React, { useState } from 'react'
import { DataTable } from '@/components/common/datatable/DataTable'
import { updateManyNotes } from '@/lib/actions/dashboard.actions'
import { toast } from '@/components/ui/use-toast'
import { Trash2 } from 'lucide-react'
import { starredColumns } from '@/components/common/datatable/columns/starred.columns'
import { INote } from '@/lib/utils/definitions'
import { TableMeta } from '@tanstack/react-table'
import NoteDialog from '@/components/common/NoteDialog'

type NoteTableWrapperProps = {
    notes: INote[]
}
const StarredTableWrapper = ({ notes }: NoteTableWrapperProps) => {
    const [showRowDialog, setShowRowDialog] = useState(false)
    const [rowContent, setRowContent] = useState<INote | null>(null)

    function showRowContent(noteData: INote) {
        setRowContent(noteData)
        setShowRowDialog(true)
    }

    async function deleteHandler(noteIdList: string[], tableDataDeleteHandler: TableMeta<INote>['deleteData']) {
        const delResult = await updateManyNotes(noteIdList, { trashed: true })
        if (delResult.success && delResult.data?.modifiedCount! > 0) {
            tableDataDeleteHandler(noteIdList)
            toast({
                description: (
                    <div className="flex items-center gap-4 mb-2"><Trash2 color="orange" />
                        <p className="font-semibold text-slate-800">{delResult.data?.modifiedCount!} Note(s) Moved to Trash!</p>
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
                showRowContent={showRowContent}
            />
            <NoteDialog
                open={showRowDialog}
                setOpen={setShowRowDialog}
                note={rowContent}
            />
        </div>
    )
}

export default StarredTableWrapper