import { getSubscriberByToken } from '../../../lib/api';

export default async function handler(req, res) {
    const { token, redirect } = req.query

    if (!token) {
        return res.status(400).json({ error: 'No token provided' })
    }

    const subscriber = await getSubscriberByToken(token);
    console.log(subscriber);

    // const subscriber = await client.fetch(
    //     `*[_type == "subscriber" && accessToken == $token][0]{ _id, email }`,
    //     { token }
    // )

    if (!subscriber) {
        // return res.status(401).json({ error: 'Invalid token' })
        res.redirect(307, '/blog?err=401')
    }

    // Set a long-lived cookie so they don't need the link again
    res.setHeader('Set-Cookie', [
        `access_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 365}; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''
        }`,
    ])

    res.redirect(307, redirect || '/blog')
}