// pages/api/mailchimp-webhook.js
import mailchimp from '@mailchimp/mailchimp_marketing'
import { createClient } from '@sanity/client'
import { randomUUID } from 'crypto'

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

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
    await sanity.create({
      _type: 'subscriber',
      name,
      email,
      token,
      active: true,
      mailchimpId: id,
    })

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