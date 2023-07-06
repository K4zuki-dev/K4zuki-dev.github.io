import './globals.css'
import { Inter } from 'next/font/google'

import Footer from '@/Footer/Footer'
import Header from '@/Header/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Website',
  description: 'Explore our ambitions',
  innerWidth: "device-width"
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
