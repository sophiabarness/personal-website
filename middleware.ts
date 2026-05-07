import { NextRequest, NextResponse } from 'next/server'

const MINTLIFY = 'https://onboardingsophia.mintlify.app'
const PREFIX = '/mintlify-demo'
const PASSTHROUGH_PREFIXES = [
  '/mintlify-assets/',
  '/_mintlify/',
  '/.well-known/vercel/',
] as const
const MINTLIFY_ROOT_FILES = new Set([
  '/llms.txt',
  '/llms-full.txt',
  '/skill.md',
  '/sitemap.xml',
])

function shouldProxy(pathname: string) {
  if (pathname === PREFIX || pathname.startsWith(PREFIX + '/')) return 'prefixed'
  if (PASSTHROUGH_PREFIXES.some((p) => pathname.startsWith(p))) return 'passthrough'
  if (MINTLIFY_ROOT_FILES.has(pathname)) return 'passthrough'
  return null
}

export async function middleware(req: NextRequest) {
  const mode = shouldProxy(req.nextUrl.pathname)
  if (!mode) return NextResponse.next()

  const upstreamPath =
    mode === 'prefixed'
      ? req.nextUrl.pathname.slice(PREFIX.length) || '/'
      : req.nextUrl.pathname
  const upstreamUrl = new URL(upstreamPath + req.nextUrl.search, MINTLIFY)

  const headers = new Headers(req.headers)
  headers.set('host', new URL(MINTLIFY).host)
  headers.set('Origin', MINTLIFY)
  headers.set('X-Forwarded-Host', req.nextUrl.host)
  headers.set('X-Forwarded-Proto', req.nextUrl.protocol.replace(':', ''))
  headers.delete('accept-encoding')

  const upstream = await fetch(upstreamUrl, {
    method: req.method,
    headers,
    body: ['GET', 'HEAD'].includes(req.method) ? undefined : await req.arrayBuffer(),
    redirect: 'manual',
  })

  const contentType = upstream.headers.get('content-type') ?? ''
  const responseHeaders = new Headers(upstream.headers)
  responseHeaders.delete('content-encoding')
  responseHeaders.delete('content-length')
  responseHeaders.delete('transfer-encoding')

  if (contentType.includes('text/html')) {
    const html = await upstream.text()
    const rewritten = rewriteHtml(html)
    return new NextResponse(rewritten, { status: upstream.status, headers: responseHeaders })
  }

  return new NextResponse(upstream.body, { status: upstream.status, headers: responseHeaders })
}

function rewriteHtml(html: string): string {
  const SKIP = /^\/(?:mintlify-demo|mintlify-assets|_mintlify|\.well-known)(?:\/|$)/
  const ATTR = /\b(href|src|action|formaction)="(\/[^"#?]*)([?#][^"]*)?"/g
  let out = html.replace(ATTR, (match, attr, path, suffix = '') => {
    if (path.startsWith('//')) return match
    if (SKIP.test(path)) return match
    return `${attr}="${PREFIX}${path}${suffix}"`
  })
  const URL_IN_JSON = /"(\/(?!mintlify-demo\/|mintlify-assets\/|_mintlify\/|\.well-known\/)[a-zA-Z0-9][a-zA-Z0-9_\-/.]*)"/g
  out = out.replace(URL_IN_JSON, (match, path) => {
    if (path.includes('://') || path.startsWith('//')) return match
    return `"${PREFIX}${path}"`
  })
  return out
}

export const config = {
  matcher: [
    '/mintlify-demo',
    '/mintlify-demo/:path*',
    '/mintlify-assets/:path*',
    '/_mintlify/:path*',
    '/.well-known/vercel/:path*',
    '/llms.txt',
    '/llms-full.txt',
    '/skill.md',
    '/sitemap.xml',
  ],
}
