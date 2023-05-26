import '../../styles/globals.css'
import { ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { lightTheme } from 'themes'
import { AuthProvider, UiProvider } from 'context'
import { SessionProvider } from "next-auth/react"
import { useEffect } from 'react'
import { initGA, logPageView } from 'utils/gaUtils'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initGA();
    logPageView();
  }, [])

  return (
    <SessionProvider>
      <SWRConfig value={{ fetcher: (resource, init) => fetch(resource, init).then(res => res.json()) }}>
        <AuthProvider>
          <UiProvider>
            <ThemeProvider theme={lightTheme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </UiProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  )
}
