import { NextRequest, NextResponse } from 'next/server'

const TCPA_CONSENT_TEXT_V1 =
  'By checking this box and clicking "Get Your Options," I agree to the Terms of Service and Privacy Policy, and I provide my express written consent for Quick Lenders and its lending partners to contact me at the phone number and email address I provided — including via automated telephone dialing system, artificial or prerecorded voice, and SMS/text message — regarding my business financing request, even if my number is on a federal or state Do Not Call list. I understand that consent is not a condition of any purchase, that message and data rates may apply, and that I can reply STOP to opt out of text messages at any time. I also confirm that I am the subscriber to, or the customary user of, the phone number provided and that I am at least 18 years old.'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Honeypot check: if the hidden field has a value, it is a bot
    if (data.website) {
      return NextResponse.json({ success: true })
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    const leadRecord = {
      ...data,
      consentRecord: {
        consentGiven: data.consent === true,
        consentTextVersion: 'V1',
        consentText: TCPA_CONSENT_TEXT_V1,
        timestamp: new Date().toISOString(),
        ip,
        userAgent,
        page: data.page || '/get-started',
      },
    }

    // Log lead data (replace with Airtable/CRM integration later)
    console.log('--- NEW LEAD ---')
    console.log(JSON.stringify(leadRecord, null, 2))
    console.log('----------------')

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
