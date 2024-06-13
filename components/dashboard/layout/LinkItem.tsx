import { LinkItemProps } from "@/lib/utils/definitions"
import clsx from "clsx"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

const LinkItem = ({ label, href, isActive = false, icon }: LinkItemProps) => {

    return (
        <Link href={href}>
            <div className={clsx("py-2 px-5 flex justify-between items-center hover:bg-slate-50 transition-all",
                isActive && 'bg-slate-100 hover:bg-slate-100'
            )}>
                <div className="flex gap-2 items-center">
                    {icon}<p className='text-slate-600'>{label}</p>
                </div>
                <ChevronRight className='text-slate-400 h-5' />
            </div>
        </Link>
    )
}

export default LinkItem