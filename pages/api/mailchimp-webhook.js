// pages/api/mailchimp-webhook.js
import mailchimp from '@mailchimp/mailchimp_marketing'
import { randomUUID } from 'crypto'
import { addSubscriber } from '../../lib/api'

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX,
})

export const config = {
    api: {
        bodyParser: {
            type: 'application/x-www-form-urlencoded',
        },
    },
}

export default async function handler(req, res) {
    if (req.method === 'GET') {
        return res.status(200).send('OK')
    }

    if (req.method !== 'POST') {
        return res.status(405).send('Method not allowed')
    }

    console.log('Webhook body:', JSON.stringify(req.body))

    const type = req.body['type']
    const email = req.body['data[email]']
    const fname = req.body['data[merges][FNAME]'] || ''
    const lname = req.body['data[merges][LNAME]'] || ''
    const id = req.body['data[id]']
    const name = `${fname} ${lname}`.trim()
    const token = randomUUID()

    if (type !== 'subscribe') {
        return res.status(200).send('Ignored')
    }

    try {
        await addSubscriber({
            _type: 'subscriber',
            name,
            email,
            token,
            active: true,
            mailchimpId: id,
        })

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