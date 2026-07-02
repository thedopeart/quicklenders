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

// Finance icon library (24x24 stroke paths), themed per section tag.
const ICON_PATHS: Record<string, string[]> = {
  dollar: ['M12 2v20', 'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'],
  chart: ['M3 3v18h18', 'M7 15l4-5 3 3 5-7'],
  building: ['M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16', 'M16 9h3a1 1 0 0 1 1 1v11', 'M2 21h20', 'M8 7h2', 'M8 11h2', 'M8 15h2', 'M12 7h2', 'M12 11h2'],
  briefcase: ['M4 7h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z', 'M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'],
  calculator: ['M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z', 'M8 6h8', 'M8 11h.01', 'M12 11h.01', 'M16 11h.01', 'M8 15h.01', 'M12 15h.01', 'M16 15h.01', 'M8 19h.01', 'M12 19h.01', 'M16 19h.01'],
  bulb: ['M9 18h6', 'M10 22h4', 'M12 2a7 7 0 0 1 4.9 12c-.7.7-1.2 1.6-1.4 2.5H8.5c-.2-.9-.7-1.8-1.4-2.5A7 7 0 0 1 12 2Z'],
  handshake: ['m11 17 2 2a1 1 0 1 0 3-3', 'm14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a2 2 0 0 0-2.8 0L11 11.4a2 2 0 0 1-2.8 0L6.4 9.6a2 2 0 0 1 0-2.8L9 4.2', 'm2 8 4.5 4.5', 'M2 8l5-5 4 1.5'],
  pencil: ['M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z', 'm15 5 4 4'],
  percent: ['M19 5 5 19', 'M6.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z', 'M17.5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z'],
  shield: ['M12 22s8-3 8-10V5l-8-3-8 3v7c0 7 8 10 8 10Z', 'm9 12 2 2 4-4'],
}

const ICON_SETS: Record<string, string[]> = {
  'business loans': ['building', 'dollar', 'handshake', 'chart', 'percent', 'shield'],
  'free tool': ['calculator', 'percent', 'chart', 'dollar', 'bulb', 'shield'],
  insights: ['bulb', 'chart', 'pencil', 'dollar', 'building', 'percent'],
  default: ['dollar', 'chart', 'building', 'briefcase', 'percent', 'shield'],
}

// Constellation slots on the right + edges; title zone stays clear.
const SLOTS: [number, number, number, number, number][] = [
  [975, 195, 116, -12, 0.3],
  [845, 320, 70, 14, 0.22],
  [1070, 390, 84, 8, 0.26],
  [905, 495, 62, -16, 0.2],
  [1080, 85, 54, 18, 0.18],
  [755, 145, 46, -8, 0.16],
  [645, 520, 50, 12, 0.15],
  [200, 495, 46, 10, 0.13],
]

function iconEl(name: string, slot: [number, number, number, number, number], key: number) {
  const [x, y, size, rot, opacity] = slot
  const paths = ICON_PATHS[name] ?? ICON_PATHS.dollar
  return (
    <div
      key={key}
      style={{ position: 'absolute', left: x, top: y, display: 'flex', opacity, transform: `rotate(${rot}deg)` }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        {paths.map((d, i) => (
          <path key={i} d={d} stroke="#3FDBB1" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        ))}
      </svg>
    </div>
  )
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title')?.slice(0, 120) || 'Business Loans & Financing'
  const tag = searchParams.get('tag')?.slice(0, 40) || ''
  const logo = await getLogo()
  const titleSize = title.length > 55 ? 52 : title.length > 38 ? 60 : 68
  const set = ICON_SETS[tag.toLowerCase()] ?? ICON_SETS.default
  const icons = SLOTS.map((slot, i) => iconEl(set[i % set.length], slot, i))

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
        {/* themed finance icon constellation */}
        {icons}

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
    {
      width: 1200,
      height: 630,
      // Override @vercel/og's default 1-year immutable cache so design
      // updates propagate within a day.
      headers: {
        'cache-control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      },
    }
  )
}
