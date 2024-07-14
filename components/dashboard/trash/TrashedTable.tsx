import { auth } from '@/auth/auth.config';
import { getNotes } from '@/lib/helpers/dashboard.helpers';
import React from 'react'
import TrashedTableWrapper from './TrashedTableWrapper';

const TrashedTable = async () => {

    const session = await auth();
    const userId = session?.user.userId
    const filterOptions = { trashed: true }
    const notes = await getNotes(userId!, filterOptions);

    return (
        <div className="">
            <TrashedTableWrapper notes={notes} />
        </div>
    )
}

export default TrashedTable