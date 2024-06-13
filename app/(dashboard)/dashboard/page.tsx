import { auth } from '@/auth/auth.config'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const DashboardPage = async () => {
    const session = await auth();
    // console.log('Login Page - session :: ', session)
    return (<>
        <div className='flex flex-col p-10 gap-6'>
            <h1 className='text-3xl text-slate-700 font-semibold'>All Notes</h1>
            <div className="flex w-full items-center space-x-4">
                <Input type="text" placeholder="Search" />
                <Button asChild>
                    <Link href='/dashboard/notes/create'>
                        <Plus strokeWidth={1.5} className='mr-1' />
                        <p className=''>Create</p>
                    </Link>
                </Button>
            </div>
        </div>
    </>)
}

export default DashboardPage