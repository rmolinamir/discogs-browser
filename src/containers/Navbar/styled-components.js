import styled from 'styled-components'

export const Header = styled.header`
  position: relative;
  height: 70px;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255,255,255) !important; 
  border-bottom: 0.5px solid rgba(51,51,51,0.15);
  box-sizing: border-box;
  z-index: 25;
`

export const Navbar = styled.nav`
  display: flex;
  height: 100%;
  position: relative;

  @media screen and (max-width: 1121px) {
    order: 2;
    justify-content: flex-end;
    margin-right: 14px;
  }
`
