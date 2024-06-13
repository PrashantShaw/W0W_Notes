import { auth, signOut } from '@/auth/auth.config';
import { Button } from '@/components/ui/button';
import React from 'react'

const ProfilePage = async () => {
    const session = await auth();
    return (
        <div className='flex flex-col items-center p-10 gap-6'>
            <h1 className='text-4xl font-semibold'>Profile Page</h1>
            <pre>
                {JSON.stringify(session, null, 2)}
            </pre>
            <form action={async () => {
                'use server'
                await signOut({
                    redirectTo: '/login'
                })
            }}>
                <Button variant="outline">Logout</Button>
            </form>
        </div>
    )
}

export default ProfilePage