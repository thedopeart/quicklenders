import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Honeypot check: if the hidden field has a value, it is a bot
    if (data.website) {
      return NextResponse.json({ success: true })
    }

    // Log lead data (replace with Airtable/CRM integration later)
    console.log('--- NEW LEAD ---')
    console.log(JSON.stringify(data, null, 2))
    console.log('----------------')

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
