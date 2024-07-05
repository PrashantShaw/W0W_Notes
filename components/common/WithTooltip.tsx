import { ReactElement } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

type WithTooltipProps = {
    children: ReactElement,
    tooltipComponent: ReactElement,
    side?: "top" | "right" | "bottom" | "left",
    enabled?: boolean
}
function WithTooltip({ children, tooltipComponent, side = "top", enabled = true }: WithTooltipProps) {
    return enabled ?
        <Tooltip>
            <TooltipTrigger asChild>
                <span>
                    {children}
                </span>
            </TooltipTrigger>
            <TooltipContent side={side} className='bg-slate-900 text-white'>
                {tooltipComponent}
            </TooltipContent>
        </Tooltip>
        :
        <>{children}</>
}

export default WithTooltip