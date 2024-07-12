'use client'

import { DataTable } from '@/components/common/datatable/DataTable'
import { deleteManyNotes } from '@/lib/actions/dashboard.actions'
import { toast } from '@/components/ui/use-toast'
import { CircleCheckBig } from 'lucide-react'
import { notesColumns } from '@/components/common/datatable/columns/notes.columns'
import { INote } from '@/lib/utils/definitions'
import { TableMeta } from '@tanstack/react-table'
import NoteDialog from '@/components/common/NoteDialog'
import { useState } from 'react'

type NoteTableWrapperProps = {
    notes: INote[]
}
const NoteTableWrapper = ({ notes }: NoteTableWrapperProps) => {
    const [showRowDialog, setShowRowDialog] = useState(false)
    const [rowContent, setRowContent] = useState<INote | null>(null)

    function showRowContent(noteData: INote) {
        setRowContent(noteData)
        setShowRowDialog(true)
    }
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
                columns={notesColumns}
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

export default NoteTableWrapper