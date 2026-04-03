import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'يقين | Yaqeen Store',
  description: 'متجر يقين - تسوق بثقة',
  icons: { icon: '/favicon.jpg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0f1923" />
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com" defer></script>
        <link rel="stylesheet" href="/static/styles.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
