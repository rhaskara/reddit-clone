import { NAVBAR_HEIGHT } from '@/utils'
import Navbar from './components/Navbar'
import { Providers } from './providers'

export default function RootLayout({
  children,
}) {
  return (
    <html lang='en'>
      <body style={{paddingTop: NAVBAR_HEIGHT}}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
