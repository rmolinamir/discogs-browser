
import styled from 'styled-components'

export const Wrapper = styled.main`
  width: 100%;
  min-height: 105%;
  margin: 0 auto;
  color: #383838;
  background: #FFF7F7;
  position: relative;
  animation: fade-in 300ms ease-in-out;

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
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

export const Background = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 320px;
  border-bottom: 2px solid #DC3545;
`

export const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(47, 47, 47, 0.33);
  
  span {
    display: block !important;
    height: 100%
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: -1;
  }
`

export const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF7F7;
  background-color: rgba(47, 47, 47, 0.8);
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  font-size: 4em;
  text-align: center;
  font-weight: normal;
  z-index: 1;
  user-select: none;

  span {
    margin-left: 0.5ch;
    color: #da4251;
    font-weight: bold;
    box-shadow: 0px 3px 0px 0px #FFF;
  }
`
