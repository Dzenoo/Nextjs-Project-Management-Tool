import MainNavigation from '@/components/shared/MainNavigation'
import './globals.css'
import { Inter } from 'next/font/google'
import { AppProvider } from '@/context/AppContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Projexity',
  description: 'Projexity is a fully functional project management tool!'
}

export default function RootLayout ({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="main_layout">
          <MainNavigation />
          <div className="content">
            <AppProvider>{children}</AppProvider>
          </div>
        </div>
      </body>
    </html>
  )
}
