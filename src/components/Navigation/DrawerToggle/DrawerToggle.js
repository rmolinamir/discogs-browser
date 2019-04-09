import React from 'react'
import PropTypes from 'prop-types'
// JSX
import {
  Button
} from './styled-components'

const drawerToggle = (props) => {
  return (
    <Button
      className={props.isOpen && 'open'}
      onClick={props.onClick}>
      <div />
    </Button>
  )
}

drawerToggle.propTypes = {
  isOpen: PropTypes.bool,
  onClick: PropTypes.func
}

export default drawerToggle
