import { useEffect } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { RecoilRoot, useSetRecoilState, useRecoilValue } from 'recoil'
import createEmotionCache from '../src/createEmotionCache'
import theme from '../src/theme'
import Alert from '../components/common/Alert'
import { currentUserState } from '../recoil/atoms/currentUser'
import { fetchCurrentUser } from '../src/api/auth'
import { isLoginState } from '../recoil/atoms/isLogin'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const AppInit = () => {
  const setCurrentUser = useSetRecoilState(currentUserState)
  const isLogin = useRecoilValue(isLoginState)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetchCurrentUser()
        setCurrentUser(res.data)
      } catch {
        setCurrentUser(null)
      }
    })()
  }, [isLogin])
  return null
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <RecoilRoot>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
          <Alert />
          <AppInit />
        </ThemeProvider>
      </CacheProvider>
    </RecoilRoot>
  )
}
export default MyApp
