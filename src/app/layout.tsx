import './globals.css'
import { Kanit } from 'next/font/google'

import Footer from '@/Components/Footer/Footer'
import Header from '@/Components/Header/Header'

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
            <Header></Header>
            {children}
            <Footer></Footer>
        </body>
    </html>
  )

}
