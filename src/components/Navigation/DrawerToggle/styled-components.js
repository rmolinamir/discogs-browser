import styled from 'styled-components'

export const Button = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  margin-left: 20px;
  box-sizing: border-box;
  cursor: pointer;
  z-index: 205;

  div {
    width: 90%;
    height: 2px;
    background-color: #484848;
    transition: all 0.25s ease-out;
  }

  div:after {
    content: '';
    display: block;
    transform:translateY(-12px);
    height: 100%;
    background-color: #484848;
    transition: all 0.25s ease-out;
  }

  div:before {
    content: '';
    display: block;
    transform:translateY(10px);
    height: 100%;
    background-color: #484848;
    transition: all 0.25s ease-out;
  }

  &.open {
    z-index: 225;
  }

  &.open div {
    width: 90%;
    height: 3px;
    background-color: transparent;
  }

  &.open div:after {
    content: '';
    display: block;
    transform: translateY(-3px) rotate(225deg);
    height: 100%;
    background-color: #484848 !important;
  }

  &.open div:before {
    content: '';
    display: block;
    transform: rotate(-45deg);
    height: 100%;
    background-color: #484848 !important;
  }

  @media (min-width: 1121px) {
    display: none;
  }
`
