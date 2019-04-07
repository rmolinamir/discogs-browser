import styled from 'styled-components'

export const SearchResults = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 24px 12px 80px;
  margin-top: 9px;
  width: 100%;
  height: 100%;
  background: inherit;

  .disabled {
    opacity: 0.5;
    cursor: not-allowed !important;
    pointer-events: none;
  }

  .pagination {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    padding: 12px 9px;
    max-width: 620px;
    box-shadow: -2px 3px 6px rgba(0,0,0,.16), 2px 4px 6px rgba(0,0,0,.53);
    margin: 0 auto;
    background-color: #8DC3F4;
    color: #FFF;
    border-radius: 4px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .pagination li {
    cursor: pointer;
    list-style: none;
    user-select: none;
    width: 32px;
    height: 32px;
    font-size: 13px;
    border-radius: 50%;
    text-align: center;
    transition: all 100ms ease-in-out, color 0ms;
  }

  .pagination li a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    outline: none;
  }

  .active {
    border: 2px solid currentColor;
  }

  .active,
  .pagination .break {
    font-size: 14px !important;
    color: #0062b3;
    font-weight: bold;
    min-width: 32px;
    min-height: 32px;
    border-radius: 50%;
  }
`

export const NextButton = styled.span`
  display: flex;
  font-size: 2em;
  color: #0062b3;
`

export const PrevButton = styled.span`
  display: flex;
  font-size: 2em;
  color: #0062b3;


  svg {
    -moz-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    filter: FlipH;
    -ms-filter: "FlipH";
  }
`
