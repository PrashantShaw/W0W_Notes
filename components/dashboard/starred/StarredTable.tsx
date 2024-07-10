
import { auth } from '@/auth/auth.config'
import { getNotes } from '@/lib/helpers/dashboard.helpers'
import React from 'react'
import NoteTableWrapper from '@/components/dashboard/Notes/NoteTableWrapper';

// FIXME: when unstarred it should be removed from the 'StarredTable'
const StarredTable = async () => {

    const session = await auth();
    const userId = session?.user.userId
    const notes = await getNotes(userId!, true);

    return (
        <div className="">
            <NoteTableWrapper notes={notes} />
        </div>
    )
}

export default StarredTable