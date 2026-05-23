// pages/api/mailchimp-webhook.js
import mailchimp from '@mailchimp/mailchimp_marketing'
import { randomUUID } from 'crypto'
import { addSubscriber } from '../../lib/api'

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g. "us21"
})

export default async function handler(req, res) {
    // MailChimp sends a GET request to verify the webhook
    if (req.method === 'GET') {
        return res.status(200).send('OK')
    }

    if (req.method !== 'POST') {
        return res.status(405).send('Method not allowed')
    }

    const { type, data } = req.body

    // Only handle new subscriptions
    if (type !== 'subscribe') {
        return res.status(200).send('Ignored')
    }

    const { email, merges, id } = data
    const name = `${merges?.FNAME || ''} ${merges?.LNAME || ''}`.trim()
    const token = randomUUID()

    try {
        // Save to Sanity
        addSubscriber({
            _type: 'subscriber',
            name,
            email,
            token,
            active: true,
            mailchimpId: id,
        });

        // Write token back to MailChimp
        await mailchimp.lists.updateListMember(
            process.env.MAILCHIMP_AUDIENCE_ID,
            email,
            {
                merge_fields: {
                    TOKEN: token,
                },
            }
        )

        return res.status(200).send('OK')
    } catch (err) {
        console.error(err)
        return res.status(500).send('Error')
    }
}