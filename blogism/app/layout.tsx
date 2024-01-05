import type { Metadata } from 'next'
import './globals.css'
import Provider from './components/Provider'
import Appbar from './components/Appbar'
import Footbar from './components/Footbar'



export const metadata: Metadata = {
  title: 'Blogism',
  description: 'blog for all',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Provider>
          <Appbar/>
          <main className='flex-1' >{children}</main>
          <Footbar />
        </Provider>
      </body>
    </html>
  )
}
