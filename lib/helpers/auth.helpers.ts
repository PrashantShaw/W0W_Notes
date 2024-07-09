import { IUser, LoginResponse } from "@/lib/utils/definitions";

export const sleep = (ms = 2000) => new Promise(r => setTimeout(r, ms))

export const authenticateCredentialsLogin = async (email: string, password: string): Promise<IUser | null> => {
    const DOMAIN = process.env.DOMAIN || ''

    try {
        const loginApiRoute = DOMAIN + '/api/v1/user/login';
        const res = await fetch(loginApiRoute, {
            method: 'POST',
            body: JSON.stringify({ email, password })
        })
        const data: LoginResponse = await res.json();

        if (!data.success) return null;

        return data.user!

    } catch (error) {
        console.error('Failed to Authenticate user :: ', error);
        throw new Error('Failed to Authenticate user.');
    }
}

export const authenticateOAuthLogin = async (
    email: string,
    // html_url?: string, 
    // image?: string
) => {
    const DOMAIN = process.env.DOMAIN || ''

    try {
        const oauthLoginApiRoute = DOMAIN + '/api/v1/user/oauth';
        const res = await fetch(oauthLoginApiRoute, {
            method: 'POST',
            body: JSON.stringify({ email })
        })
        const data: LoginResponse = await res.json();

        if (!data.success) throw new Error(data.message);

        return data.user!

    } catch (error) {
        console.error('Failed to Authenticate OAuth user :: ', error);

    }
}