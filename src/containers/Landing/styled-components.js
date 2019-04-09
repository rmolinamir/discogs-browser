
import styled from 'styled-components'

export const Wrapper = styled.main`
  width: 100%;
  min-height: 105%;
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
  padding: 0 0 12px;
  background: inherit;
`

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 68px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border-bottom: 2px solid #0062B3;
  padding: 18px 14px;
  margin-bottom: 16px;
  background-color: #8DC3F4;

  form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1024px;
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
`

export const Title = styled.h1`
  margin: 0;
  font-size: 2.5em;
  text-align: center;
  color: inherit;
`
