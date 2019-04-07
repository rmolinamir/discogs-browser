
import styled from 'styled-components'

export const Wrapper = styled.main`
  width: 100%;
  min-height: 105%;
  max-width: 1020px;
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
  padding: 12px 0;
  background: inherit;
`

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 68px;
  max-width: 1020px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  padding: 18px 14px;
  box-shadow: -2px 3px 6px rgba(0,0,0,.16), 2px 4px 12px rgba(0,0,0,.53);
  margin-bottom: 16px;

  form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  form > * {
    width: 30%;
    margin: 0 !important;
    heigh: 48px !important;
  }

  form > *:not(button) {
    padding: 0;
  }

  ::before {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    content: '';
    border-top: 800vmax solid #6E7E8C;
    border-left: 5000vmax solid #8DC3F4;
  }
`

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: inherit;
`