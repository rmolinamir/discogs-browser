import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
// Logo
import logo from '../../../assets/images/discogs_logo.png'
// JSX
import {
  Navigation,
  Wrapper,
  StyledLink as NavLink,
  Container,
  Spacing
} from './styled-components'
import Divider from './Divider/Divider'
import NavigationItem from './NagivationItem/NagivationItem'

const Children = (props) => {
  switch (props.navbarType) {
    case 'MobileDrawer':
      return props.width < 1121 ? null : (
        <>
          <NavLink
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.discogs.com/'>
            <img src={logo} draggable='false' alt='' />
          </NavLink>
          <Spacing />
          <Divider />
          <NavigationItem {...props} isExact={true} link='/'>
            Search
          </NavigationItem>
          <NavigationItem {...props} link='/collection'>
            Collection
          </NavigationItem>
          <Divider />
        </>
      )
    default:
      return props.width < 1121 ? null : (
        <Wrapper>
          <Container>
            <NavigationItem {...props} isExact={true} link='/'>
              Search
            </NavigationItem>
          </Container>
          <NavLink
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.discogs.com/'>
            <img src={logo} draggable='false' alt='' />
          </NavLink>
          <Container>
            <NavigationItem {...props} link='/collection'>
              Collection
            </NavigationItem>
          </Container>
        </Wrapper>
      )
  }
}

Children.propTypes = {
  navbarType: PropTypes.string,
  width: PropTypes.number
}

const nagivationItems = (props) => {
  return (
    <>
      <Navigation>
        <Children {...props} />
      </Navigation>
    </>
  )
}

export default withRouter(nagivationItems)
