'use client'

import Script from 'next/script'

export default function CatchAllPage() {
  return (
    <>
      <div id="app"></div>
      <Script src="/static/app.js" strategy="afterInteractive" />
    </>
  )
}
