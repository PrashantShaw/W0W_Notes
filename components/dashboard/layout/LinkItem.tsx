import { LinkItemProps } from "@/lib/utils/definitions"
import clsx from "clsx"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

const LinkItem = ({ label, href, isActive = false, icon }: LinkItemProps) => {

    return (
        <Link href={href}>
            <div className={clsx("py-2 px-5 flex justify-between items-center transition-all",
                isActive ? 'bg-slate-100 hover:bg-slate-100' : 'hover:bg-slate-50'
            )}>
                <div className="flex gap-[1rem] items-center">
                    {icon}<p className={clsx('text-slate-700', isActive && 'text-slate-950')}>{label}</p>
                </div>
                <ChevronRight className={clsx('text-slate-400 h-5', isActive && 'text-slate-600')} />
            </div>
        </Link>
    )
}

export default LinkItem