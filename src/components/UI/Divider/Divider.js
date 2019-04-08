import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const divider = (props) => {
  const Divider = styled.div`
    width: 100%;
    height: ${props.height || '18px'};
    position: relative;
  `

  const Line = styled.div`
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    height: 1px;
    opacity: ${props.opacity || 0.5} !important;
    background: ${props.color || 'currentColor'};
  `

  return (
    <Divider>
      <Line />
    </Divider>
  )
}

divider.propTypes = {
  height: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.string
}

export default divider
