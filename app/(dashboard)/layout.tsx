import SideNav from '@/components/dashboard/layout/SideNav'
import React from 'react'

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <main className='flex h-screen'>
            <SideNav />
            <div className="flex-grow overflow-y-scroll">
                {children}
            </div>
        </main>
    )
}

export default DashboardLayout