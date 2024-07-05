'use client'
import React, { useState } from 'react'
import SideNavLinks from './SideNavLinks'
import { ChevronsLeft, Power, Settings } from 'lucide-react'
import LinkItem from './LinkItem'
import clsx from 'clsx'
import { TooltipProvider } from '@/components/ui/tooltip'
import WithTooltip from '@/components/common/WithTooltip'

const SideNav = () => {
    const [isExpanded, setIsExpanded] = useState(false)
    const expandBtnClick = () => {
        setIsExpanded(prev => !prev)
    }
    return (
        <TooltipProvider delayDuration={0}>
            <div
                // className="w-[15rem] h-screen shadow flex flex-col overflow-hidden"
                className={clsx(" h-screen shadow flex flex-col overflow-hidden transition-all",
                    isExpanded ? "w-[15rem]" : "w-[3.75rem]"
                )}
            >
                <div className="py-8 bg-slate-700 mb-8">
                    <h2 className='text-2xl font-bold text-slate-200 font-mono text-center text-nowrap'>{isExpanded ? "WOW Notes" : "WN"}</h2>
                </div>
                <div className="flex flex-col justify-between flex-grow relative">
                    <SideNavLinks tooltipEnabled={!isExpanded} />
                    <div className="flex flex-col py-4 gap-1">
                        <WithTooltip tooltipComponent={<p >Settings</p>} side='right' enabled={!isExpanded}>
                            <LinkItem label='Settings' href='/settings' isActive={false} icon={<Settings className='text-slate-600 h-5' />} />
                        </WithTooltip>
                        <WithTooltip tooltipComponent={<p >Logout</p>} side='right' enabled={!isExpanded}>
                            <LinkItem label='Logout' href='/api/v1/user/logout' isActive={false} icon={<Power className='text-slate-600 h-5' />} />
                        </WithTooltip>
                    </div>
                    <div
                        className={clsx("absolute shadow right-0 rounded-tl-xl rounded-bl-xl top-[42.5%] ")}
                    >
                        <ChevronsLeft
                            className={
                                clsx("text-slate-300 h-10 w-10 p-2 transition-all hover:text-slate-600 cursor-pointer",
                                    !isExpanded && "rotate-180")
                            }
                            onClick={expandBtnClick}
                        />
                    </div>
                </div>
            </div>
        </TooltipProvider>
    )
}



export default SideNav