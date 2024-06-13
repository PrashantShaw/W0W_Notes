import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const SettingsLayout = ({ children }
    : Readonly<{
        children: React.ReactNode;
    }>) => {
    return (
        <main className='min-h-screen flex flex-col items-center p-20'>
            <h1 className='text-slate-700 font-semibold text-4xl mb-10'>Settings Layout</h1>
            <div className="flex gap-4">

                <Button variant='outline' asChild>
                    <Link href='/settings'>Settings</Link>
                </Button>
                <Button variant='outline' asChild>
                    <Link href='/settings/profile'>Profile</Link>
                </Button>
            </div>
            {children}
        </main>
    )
}

export default SettingsLayout