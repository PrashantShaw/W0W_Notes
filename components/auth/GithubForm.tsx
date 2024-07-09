'use client'

import React, { FormEvent, useCallback, useState } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import githubIcon from "@/public/icons/Github.svg"
import { OAuthLoginAction } from '@/lib/actions/auth.actions'
import { LoaderCircle } from 'lucide-react'

// FIXME: improve github login form
const GithubForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    // const GithubLoginAction = OAuthLoginAction.bind(null, 'github')
    const GithubLoginAction = useCallback(async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault()

        setIsSubmitting(true);
        await OAuthLoginAction('github')
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
    const btnTxt = isSubmiting ? 'Loading' : 'Github'
    const btnIcon = isSubmiting ?
        <LoaderCircle className="animate-spin mr-2" />
        :
        <Image src={githubIcon} alt="github Icon" className="mr-2" />

    return <Button
        disabled={isSubmiting}
        type="submit"
        className="w-full"
        variant={"outline"}
    >
        {btnIcon} {btnTxt}
    </Button>
}

export default GithubForm