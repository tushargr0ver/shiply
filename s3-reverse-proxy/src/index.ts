import { Hono } from 'hono'
import { ContentfulStatusCode } from 'hono/utils/http-status'

const app = new Hono()
const PORT = 3001

const BASE_S3 = 'https://shiply-outputs.s3.ap-south-1.amazonaws.com/dist'

const mimeTypes: Record<string, string> = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
}

app.all('*', async (c) => {
  try {
    const hostname = c.req.header('host') || ''
    const subdomain = hostname.split('.')[0]
    let path = c.req.path

    if (path === '/') {
      path = '/index.html'
    }

    const s3Url = `${BASE_S3}/${subdomain}${path}`
    console.log('[Proxying]', s3Url)

    // Clone headers and override Host to S3 host (important!)
    const headers = new Headers(c.req.raw.headers)
    headers.set('Host', 'shiply-outputs.s3.ap-south-1.amazonaws.com')

    const reqInit: RequestInit = {
      method: c.req.method,
      headers,
    }

    if (!['GET', 'HEAD'].includes(c.req.method)) {
      reqInit.body = await c.req.raw.clone().text()
    }

    const s3Res = await fetch(s3Url, reqInit)

    if (!s3Res.ok) {
      // Return S3 error response as text
      const errorText = await s3Res.text()
      return c.text(errorText, s3Res.status as ContentfulStatusCode)
    }

    const extMatch = path.match(/\.\w+$/)
    const ext = extMatch ? extMatch[0] : ''
    const contentType = mimeTypes[ext] || 'application/octet-stream'

    const body = await s3Res.arrayBuffer()

    return new Response(body, {
      status: s3Res.status,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=60',
      },
    })
  } catch (err) {
    console.error('[Proxy Error]', err)
    return c.text('Internal Server Error', 500)
  }
})

export default {
  port: PORT,
  fetch: app.fetch,
}
