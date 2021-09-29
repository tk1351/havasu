import '../styles/globals.css'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import { ThemeProvider as MaterialUIThemeProvider } from '@material-ui/core/styles'
import { StylesProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/theme'
import Navbar from '../components/common/Navbar'
import Alert from '../components/common/Alert'
import { currentUserState } from '../src/recoil/atoms/currentUser'
import { fetchCurrentUser } from '../src/utils/api/user'

const AppInit = () => {
  const setCurrentUser = useSetRecoilState(currentUserState)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetchCurrentUser()
        setCurrentUser(res.data)
      } catch {
        setCurrentUser(null)
      }
    })()
  }, [])

  return null
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])
  return (
    <RecoilRoot>
      <StylesProvider injectFirst>
        <MaterialUIThemeProvider theme={theme}>
          <StyledComponentsThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <Component {...pageProps} />
            <Alert />
            <AppInit />
          </StyledComponentsThemeProvider>
        </MaterialUIThemeProvider>
      </StylesProvider>
    </RecoilRoot>
  )
}
export default MyApp
