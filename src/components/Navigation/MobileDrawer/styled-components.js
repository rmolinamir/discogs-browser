import styled from 'styled-components'

export const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  left: 0;
  top: 0;
  z-index: 220;
  background-color: rgb(255, 255, 255);
  padding: 0 16px;
  box-sizing: border-box;
  transition: transform 300ms ease;
  border-left: 0;
  border-bottom: 0.5px solid rgba(51, 51, 51, 0.5);

  &.open {
    transform: translateY(0);
    animation: fade-in 250ms ease forwards;
  }

  &.close {
    transform: translateY(-100%);
    animation: fade-out 250ms ease forwards;
  }

  @keyframes fade-in {
    0% {
        opacity: 0;
    }
    66% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
  }
`

export const Container = styled.div`
  position: relative;
  height: 100%;
  padding: 18px 24px;
`

export const Drawer = styled.div`
  position: relative;

  ul {
    width: 100%;
    height: auto;
    flex-flow: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-bottom: 48px;
  }

  ul li *:not(hr) {
    color: #484848;
    justify-content: flex-start;
    font-size: 16px;
    letter-spacing: normal;
    padding: 8px 0;
    font-weight: normal;
    display: block;
    position: relative;
    text-decoration: none;
  }

  ul li *:hover {
    color: #484848;
    border: 0;
    box-shadow: none;
  }

  button,
  li {
    width: auto;
    height: auto;
    max-width: 100%;
  }

  .open {
    animation: fade-in 500ms ease;
  }

  .close {
    animation: fade-out 250ms ease;
  }

  @keyframes fade-in {
    0% {
        opacity: 0;
    }
    66% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
  }
`
