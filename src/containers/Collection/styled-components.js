
import styled from 'styled-components'

export const Wrapper = styled.main`
  width: 100%;
  min-height: 105%;
  ${'' /* max-width: 1024px; */}
  margin: 0 auto;
  color: #383838;
  background: #FFF;
  position: relative;
`

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-flow: column;
  height: 100%;
  width: 100%;
  color: inherit;
  margin: 0 auto;
  padding: 0 0 12px;
  background: inherit;
`

export const Title = styled.h1`
  margin: 0;
  font-size: 2.5em;
  text-align: center;
  color: inherit;
`