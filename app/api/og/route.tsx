import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

// Branded OG card generator. Every page gets a unique share image via
// /api/og?title=...&tag=... (wired up as the default in lib/metadata.ts).
// Navy gradient + white logo + teal accent, per the site palette.

export const dynamic = 'force-dynamic'

// Current brand lockup (matches the site header): blue block icon + wordmark.
let logoDataUri: Promise<string> | null = null
function getLogo(): Promise<string> {
  if (!logoDataUri) {
    logoDataUri = readFile(
      join(process.cwd(), 'public/assets/images/site/logo-icon.png')
    ).then((buf) => `data:image/png;base64,${buf.toString('base64')}`)
  }
  return logoDataUri
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title')?.slice(0, 120) || 'Business Loans & Financing'
  const tag = searchParams.get('tag')?.slice(0, 40) || ''
  const logo = await getLogo()
  const titleSize = title.length > 55 ? 52 : title.length > 38 ? 60 : 68

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 76px',
          background: 'linear-gradient(120deg, #0F2137 0%, #1E3C72 50%, #2A5298 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* teal glow, top right */}
        <div
          style={{
            position: 'absolute',
            right: -160,
            top: -160,
            width: 520,
            height: 520,
            borderRadius: 520,
            display: 'flex',
            background: '#3FDBB1',
            opacity: 0.14,
          }}
        />
        {/* second glow, bottom left, for depth (this Next version's satori
            can't parse rgba() inside gradients, so no grid texture here) */}
        <div
          style={{
            position: 'absolute',
            left: -200,
            bottom: -260,
            width: 560,
            height: 560,
            borderRadius: 560,
            display: 'flex',
            background: '#3083e4',
            opacity: 0.18,
          }}
        />

        {/* Top row: logo + tag chip */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                display: 'flex',
                width: 78,
                height: 78,
                borderRadius: 18,
                background: '#FFFFFF',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo} width={56} height={56} alt="" />
            </div>
            <div style={{ display: 'flex', fontSize: 34, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
              Quick Lenders
            </div>
          </div>
          {tag ? (
            <div
              style={{
                display: 'flex',
                padding: '10px 24px',
                borderRadius: 99,
                border: '2px solid #3FDBB1',
                color: '#3FDBB1',
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {tag}
            </div>
          ) : null}
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            fontSize: titleSize,
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            maxWidth: 960,
          }}
        >
          {title}
        </div>

        {/* Bottom meta */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', width: 110, height: 6, borderRadius: 99, background: '#3FDBB1', marginBottom: 20 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 24, fontWeight: 600 }}>
            <div style={{ display: 'flex', color: 'rgba(255,255,255,0.9)' }}>Fast, reliable business funding</div>
            <div style={{ display: 'flex', color: '#3FDBB1', fontWeight: 800 }}>quicklenders.com</div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
