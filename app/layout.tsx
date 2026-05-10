import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WM Funilaria & Pintura',
  description: 'Sistema da oficina',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}