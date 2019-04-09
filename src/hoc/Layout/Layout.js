import React from 'react'
import PropTypes from 'prop-types'
// JSX
import Navbar from '../../containers/Navbar/Navbar'

const layout = (props) => {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  )
}

layout.propTypes = {
  children: PropTypes.any
}

export default layout
