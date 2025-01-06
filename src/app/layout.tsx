import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import localFont from 'next/font/local'
import { Providers } from '@/components/providers'

const cabinetGrotesk = localFont({
  src: '../assets/fonts/CabinetGrotesk-Variable.woff2',
  variable: '--font-cabinet-grotesk',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} ${cabinetGrotesk.variable} font-sans bg-base text-text`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 