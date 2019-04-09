import React from 'react'
// JSX
import {
  Button,
  Arrow
} from './styled-components'
import { Icon } from 'react-svg-library'

const scrollToTopButton = () => {
  const [isInvisible, setIsInvisible] = React.useState(true)

  /**
   * If the current scroll position of the user is less than half of the screen height,
   * show the button.
   */
  const scrollHandler = () => {
    setIsInvisible(window.scrollY < window.screen.height / 2)
  }

  /**
   * Smoothly scrolls to the top, works in mobile with the polyfill.
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  React.useEffect(() => {
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return (
    <Button
      isInvisible={isInvisible}
      onClick={scrollToTop}>
      <Arrow>
        <Icon
          size='80%'
          icon='arrow-down' />
      </Arrow>
    </Button>
  )
}

export default scrollToTopButton
