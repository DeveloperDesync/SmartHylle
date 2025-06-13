import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Smarthylle - Reduser matsvinn med AI",
  description: "AI-drevet plattform for å redusere matsvinn gjennom smarte tilbud",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="no">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        try {
          if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        } catch (_) {}
      `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
