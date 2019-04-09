import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Navigation = styled.ul`
  user-select: none;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  @media (min-width: 1120px) {
    width: 100%;
    margin: 0;
    flex-flow: row;
  }
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`

export const StyledLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0.25;

  img {
    user-select: none;
    height: 70px;
    width: auto;
  }

  @media (max-width: 1121px) {
    display: flex;
    width: 100%;
    padding: 42px 23px 12px;
    flex-flow: row;
    align-items: center;
    justify-content: center;

    img {
      user-select: none;
      display: flex;
      height: 64px;
      width: auto;
    }
  }
`

export const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 100%;
  align-items: center;
  flex-flow: row;
  flex-grow: 0.25;
`

export const Spacing = styled.div`
  flex-grow: 1;
`
