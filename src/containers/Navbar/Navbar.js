import React from 'react'
// JSX
import {
  Header,
  Navbar
} from './styled-components'
import NagivationItems from '../../components/Navigation/NavigationItems/NavigationItems'
import DrawerToggle from '../../components/Navigation/DrawerToggle/DrawerToggle'
import MobileDrawer from '../../components/Navigation/MobileDrawer/MobileDrawer'
import ScrollToTopButton from '../../components/Navigation/ScrollToTopButton/ScrollToTopButton'
import smoothscroll from 'smoothscroll-polyfill'

const setIsMobile = () => {
  let isMobile = false
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    isMobile = true
  }
  return isMobile
}

const isMobile = setIsMobile()

if (isMobile) {
  smoothscroll.polyfill()
}

const appbar = () => {
  const myNavbar = React.useRef(null)

  const [state, setState] = React.useState({
    isMobile: isMobile,
    width: window.innerWidth,
    isDrawerOpen: false
  })

  /**
   * Toggles (opens/closes) the SideDrawer on click.
   */
  const toggleMobileDrawer = () => {
    setState({
      ...state,
      isDrawerOpen: !state.isDrawerOpen
    })
  }

  const handleResize = () => {
    setState({
      ...state,
      width: window.innerWidth
    })
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return (
    <Header ref={myNavbar}>
      <>
        <Navbar>
          <NagivationItems width={state.width} />
        </Navbar>
        {state.width < 1121 ? (
          <>
            <DrawerToggle
              isOpen={state.isDrawerOpen}
              onClick={toggleMobileDrawer} />
            <MobileDrawer
              isOpen={state.isDrawerOpen}
              isMobile={state.isMobile}
              onClick={toggleMobileDrawer} />
          </>
        ) : null}
      </>
      <ScrollToTopButton />
    </Header>
  )
}

export default React.memo(appbar)
