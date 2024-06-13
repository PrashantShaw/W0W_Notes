'use client'
import React from 'react'
import LinkItem from './LinkItem'
import { Lightbulb, Star, Trash2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const links = [
    {
        label: 'Notes',
        href: '/dashboard',
        icon: Lightbulb
    },
    {
        label: 'Starred',
        href: '/dashboard/starred',
        icon: Star
    },
    {
        label: 'Trash',
        href: '/dashboard/trash',
        icon: Trash2
    },
]
const SideNavLinks = () => {
    const pathname = usePathname()
    return (
        <div className="flex flex-col py-2 gap-1">
            {links.map(({ label, href, icon: Icon }, idx) => {
                const isActive = pathname === href
                return (
                    <LinkItem
                        key={idx}
                        label={label}
                        href={href}
                        isActive={isActive}
                        icon={<Icon className={clsx('text-slate-700 h-5', isActive && 'text-slate-950')} />}
                    />
                )
            })}
        </div>
    )
}

export default SideNavLinks