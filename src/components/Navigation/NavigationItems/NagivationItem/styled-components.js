import styled from 'styled-components'

export const NavItem = styled.li`
    display: flex;
    width: 150px;
    width: fit-content;
    min-width: 100px;
    max-width: 150px;
    margin: 0;
    padding: 9px 21px;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

  a {
    color: #484848;
    padding: 6px 0px;
    font-weight: 600;
    text-decoration: none;
    text-transform: uppercase;
    width: 100%;
    height: 100%;
    transition: box-shadow 250ms ease-out, font-size 50ms ease-out, color 150ms ease-out;
  }

  a:hover {
    box-shadow: 0px 2px #da4251;
  }

  a.active {
    color: #da4251;
    box-shadow: 0px 2px #da4251;
  }

  @media (min-width: 744px) {
    a {
      justify-content: center;
      display: flex;
      align-items: center;
      box-sizing: border-box;
    }
  }
`
