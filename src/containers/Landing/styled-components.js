
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

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  width: 100%;
  height: 248px;
  margin: 124px auto;
  position: relative;
  overflow: hidden;
  padding: 18px 14px;
  background-color: rgba(47, 47, 47, 0.9);

  form {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    max-width: 1240px;
    margin: 0 auto;
  }

  form > * {
    width: 30%;
    margin: 0 !important;
    height: 48px !important;
  }

  form > *:not(button) {
    padding: 0;
  }

  @media (max-width: 744px) {
    margin: 0 auto;
    height: auto;

    form {
      flex-flow: column;
    }

    form > * {
      width: 100%;
      margin: 0 auto 9px !important;
    }
  }
`

export const Title = styled.h1`
  color: #FFF7F7;
  margin: 0 0 24px;
  font-size: 2em;
  text-align: center;
  font-weight: normal;
  user-select: none;
`
