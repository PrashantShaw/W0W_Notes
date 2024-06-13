import clsx from 'clsx'
import { ChevronRight, Lightbulb, Power, Settings, Star, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <main className='flex'>
            <div className="w-[15rem] min-h-screen shadow flex flex-col">
                <div className="py-8 bg-slate-700 mb-8">
                    <h2 className='text-2xl font-bold text-slate-200 font-mono text-center'>WOW Notes</h2>
                </div>
                <div className="flex flex-col justify-between flex-grow">
                    <div className="flex flex-col py-2 gap-1">
                        <LinkItem label='Notes' href='/dashboard' isActive={false} icon={<Lightbulb className='text-slate-600 h-5' />} />
                        <LinkItem label='Starred' href='/dashboard/starred' isActive={false} icon={<Star className='text-slate-600 h-5' />} />
                        <LinkItem label='Trash' href='/dashboard/trash' isActive={true} icon={<Trash2 className='text-slate-600 h-5' />} />
                    </div>
                    <div className="flex flex-col py-4 gap-1">
                        <LinkItem label='Settings' href='/settings' isActive={false} icon={<Settings className='text-slate-600 h-5' />} />
                        <LinkItem label='Logout' href='/api/v1/user/logout' isActive={false} icon={<Power className='text-slate-600 h-5' />} />
                    </div>
                </div>
            </div>
            {children}
        </main>
    )
}
type LinkItemProps = {
    label: string
    href: string
    isActive?: boolean
    icon?: React.ReactElement
}
const LinkItem = ({ label, href, isActive = false, icon }: LinkItemProps) => {

    return (
        <Link href={href}>

            {/* <div className=" bg-slate-0 py-2 px-6 flex justify-between items-center hover:bg-slate-50 transition-all"> */}
            <div className={clsx("py-2 px-5 flex justify-between items-center hover:bg-slate-50 transition-all",
                isActive && 'bg-slate-100'
            )}>
                <div className="flex gap-2 items-center">
                    {icon}<p className='text-slate-600'>{label}</p>
                </div>
                <ChevronRight className='text-slate-400 h-5' />
            </div>
        </Link>
    )
}

export default DashboardLayout