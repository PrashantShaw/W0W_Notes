'use client'

import React, { FormEvent, useCallback, useState } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import githubIcon from "@/public/icons/Github.svg"
import { OAuthLoginAction } from '@/lib/actions/auth.actions'
import { LoaderCircle } from 'lucide-react'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'

const GithubForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    // const GithubLoginAction = OAuthLoginAction.bind(null, 'github')
    const GithubLoginAction = useCallback(async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault()

        setIsSubmitting(true);
        const result = await OAuthLoginAction('github')

        if (result && !result?.success) {
            setIsSubmitting(false)
            toast({
                variant: 'destructive',
                title: result?.formError,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    }, [])

    return <form
        className='mt-4 '
        // action={GithubLoginAction}
        onSubmit={GithubLoginAction}
    >
        <SubmitButton isSubmiting={isSubmitting} />
    </form>
}

const SubmitButton = ({ isSubmiting = false }) => {
    const btnTxt = isSubmiting ? 'Authenticating' : 'Github'
    const btnIcon = isSubmiting ?
        <LoaderCircle className="animate-spin mr-2" />
        :
        <Image src={githubIcon} alt="github Icon" className="mr-2" />

    return <Button
        disabled={isSubmiting}
        type="submit"
        className="w-full shadow-sm"
        variant={"outline"}
    >
        {btnIcon} {btnTxt}
    </Button>
}

export default GithubForm