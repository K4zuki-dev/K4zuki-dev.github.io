import './globals.css'
import { Inter } from 'next/font/google'

import Footer from '@/Components/Footer/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Website',
  description: 'Explore our ambitions',
  innerWidth: "device-width",
  viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
  }
}

export default function RootLayout({children,}: {children: React.ReactNode}) {

  return (
    <html lang="en">
      <body className={inter.className}>
            {children}
            <Footer></Footer>
        </body>
    </html>
  )

}
