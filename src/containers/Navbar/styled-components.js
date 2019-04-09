import styled from 'styled-components'

export const Header = styled.header`
  position: relative;
  height: 70px;
  width: 100%;
  top: 0;
  left: 0;
  background-color: inherit !important; 
  border-bottom: 2px solid #DC3545;
  box-sizing: border-box;
  z-index: 25;
  animation: fade-in 200ms ease-in-out;

  @keyframes fade-in {
    0% {
      opacity: 0
    }
    100% {
      opacity: 1
    }
  }
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
