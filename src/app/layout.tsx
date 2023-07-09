import './globals.css'
import { Kanit, Roboto_Mono } from 'next/font/google'

import Footer from '@/Components/Footer/Footer'

const font = Kanit({weight: "400", subsets: ['latin'] })

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
      <body className={font.className}>
            {children}
            <Footer></Footer>
        </body>
    </html>
  )

}
