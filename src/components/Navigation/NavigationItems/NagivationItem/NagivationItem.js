import React from 'react'
import PropTypes from 'prop-types'
// JSX
import { NavLink } from 'react-router-dom'
import { NavItem } from './styled-components'

const navigationItem = (props) => {
  return (
    <NavItem>
      <NavLink
        exact={props.isExact}
        onClick={props.onClick}
        to={props.link}>
        {props.children}
      </NavLink>
    </NavItem>
  )
}

navigationItem.propTypes = {
  isExact: PropTypes.bool,
  onClick: PropTypes.func,
  link: PropTypes.string,
  children: PropTypes.any
}

export default navigationItem
