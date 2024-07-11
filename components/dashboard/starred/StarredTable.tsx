
import { auth } from '@/auth/auth.config'
import { getNotes } from '@/lib/helpers/dashboard.helpers'
import React from 'react'
import StarredTableWrapper from '@/components/dashboard/starred/StarredTableWraper';

// FIXME: when unstarred it should be removed from the 'StarredTable'
const StarredTable = async () => {

    const session = await auth();
    const userId = session?.user.userId
    const notes = await getNotes(userId!, true);

    return (
        <div className="">
            <StarredTableWrapper notes={notes} />
        </div>
    )
}

export default StarredTable