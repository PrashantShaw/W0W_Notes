import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const SettingsPage = () => {
    return (
        <div className='flex flex-col items-center p-10 gap-6'>
            <h1 className='text-4xl font-semibold'>Settings Page</h1>
            <Button variant='outline' asChild>
                <Link href='/dashboard'>Dashboard</Link>
            </Button>
        </div>
    )
}

export default SettingsPage