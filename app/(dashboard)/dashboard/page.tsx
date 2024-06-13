import { auth, signOut } from '@/auth/auth.config'
import { Button } from '@/components/ui/button'
import Link from 'next/link';
import React from 'react'

const DashboardPage = async () => {
    const session = await auth();
    // console.log('Login Page - session :: ', session)
    return (<>
        <div className='flex flex-col items-center p-10 gap-6'>
            <h1 className='text-4xl font-semibold'>Dashboard Page</h1>
            <pre>
                {JSON.stringify(session, null, 2)}
            </pre>
            <Button variant="outline" asChild>
                <Link href='/settings'>Settings</Link>
            </Button>
        </div>
    </>)
}

export default DashboardPage