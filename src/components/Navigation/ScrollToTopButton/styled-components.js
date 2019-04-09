import styled from 'styled-components'

export const Button = styled.button`
  z-index: 5;
  position: fixed;
  cursor: pointer;
  bottom: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 35%;
  color: #484848;
  background-color: rgba(255, 255, 255, 0.5);
  background-image: none;
  border: 2px solid #484848;
  transition: all 200ms ease-out;
  opacity: ${props => props.isInvisible ? 0 : 1};
  outline: 0;

  :active {
    color: #DC3545;
    background-color: #484848;
    border-color: #DC3545;
  }
`
export const Arrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  transform: scaleY(-1);
`
