
import React from 'react'
import SideNavLinks from './SideNavLinks'
import { Power, Settings } from 'lucide-react'
import LinkItem from './LinkItem'

const SideNav = () => {
    return (
        <div className="w-[15rem] h-screen shadow flex flex-col">
            <div className="py-8 bg-slate-700 mb-8">
                <h2 className='text-2xl font-bold text-slate-200 font-mono text-center'>WOW Notes</h2>
            </div>
            <div className="flex flex-col justify-between flex-grow">
                <SideNavLinks />
                <div className="flex flex-col py-4 gap-1">
                    <LinkItem label='Settings' href='/settings' isActive={false} icon={<Settings className='text-slate-600 h-5' />} />
                    <LinkItem label='Logout' href='/api/v1/user/logout' isActive={false} icon={<Power className='text-slate-600 h-5' />} />
                </div>
            </div>
        </div>
    )
}

export default SideNav