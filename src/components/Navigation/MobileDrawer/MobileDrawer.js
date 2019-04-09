import React from 'react'
import PropTypes from 'prop-types'
// JSX
import {
  Wrapper,
  Container,
  Drawer
} from './styled-components'
import NagivationItems from '../NavigationItems/NavigationItems'

const mobileDrawer = (props) => {
  const [pageYOffset, setPageYOffset] = React.useState()

  const handleScrollOnMobile = (handler) => {
    const currentPageYOffset = pageYOffset
    switch (handler) {
      case 'enable':
        // Enabling mobile scrolling
        document.body.style.position = null
        document.body.style.top = null
        document.body.style.width = null
        window.scrollTo(0, currentPageYOffset)
        break
      default:
      case 'disable':
        const pageYOffset = window.pageYOffset
        document.body.style.top = `-${pageYOffset}px`
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
        setPageYOffset(currentPageYOffset)
        break
    }
  }

  React.useEffect(() => {
    document.body.style.overflow = null
  }, [])

  React.useEffect(() => {
    if (props.isOpen) {
      document.body.style.overflow = 'hidden'
      if (props.isMobile) {
        handleScrollOnMobile('disable')
      }
    } else {
      document.body.style.overflow = null
      if (props.isMobile) {
        handleScrollOnMobile('enable')
      }
    }
  }, [props.isOpen])

  return (
    <Wrapper className={props.isOpen ? 'open' : 'close'}>
      <Container>
        <Drawer>
          <NagivationItems
            navbarType='MobileDrawer'
            onClick={props.onClick} />
        </Drawer>
      </Container>
    </Wrapper>
  )
}

mobileDrawer.propTypes = {
  isMobile: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClick: PropTypes.func
}

export default mobileDrawer
