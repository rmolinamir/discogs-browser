import styled from 'styled-components'

export const Divider = styled.div`
  display: none;

  @media (max-width: 1120px) {
    display: block !important;
    width: 100% !important;
    padding: 0 16px;

    hr {
      height: 0px !important;
      border-width: 1px 0px 0px !important;
      border-top: 1px solid rgb(205, 205, 205) !important;
      margin: 16px 0px !important;
    }
  }
`
