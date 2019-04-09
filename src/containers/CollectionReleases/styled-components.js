import styled from 'styled-components'

export const Wrapper = styled.section`
  display: flex;
  flex-flow: column;
  width: 100%;
  min-height: 100%;
  background: inherit;

  .disabled {
    color: #FFF7F7
    opacity: 0.5;
    cursor: not-allowed !important;
    pointer-events: none;
  }

  .pagination {
    z-index: 2;
    position: sticky;
    top: 0px;
    display: flex;
    padding: 12px 9px;
    box-shadow: -1px 2px 3px rgba(0,0,0,.16), 1px 2px 3px rgba(0,0,0,.53);
    margin: 0 auto;
    background-color: #2F2F2F;
    color: #FFF7F7;
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
    color: #DC3545;
    font-weight: bold;
    min-width: 32px;
    min-height: 32px;
    border-radius: 50%;
  }
`

export const NextButton = styled.span`
  display: flex;
  font-size: 2em;
  color: #DC3545;
`

export const PrevButton = styled.span`
  display: flex;
  font-size: 2em;
  color: #DC3545;


  svg {
    -moz-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    filter: FlipH;
    -ms-filter: "FlipH";
  }
`

export const Container = styled.div`
  align-items: center;
  position: relative;
  margin: 56px 0 24px;
  padding: 8px 0px;
`

export const Releases = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: calc(2em + 2vh) calc(1.5em + 1vmin);
  grid-auto-flow: row dense;
  width: 95%;
  margin: 0 auto;
  overflow: hidden;
`

export const Release = styled.div`
  display: inline-block;
  vertical-align: top;
  text-align: center;
  position: relative;
  width: 25%;
  min-width: 340px;
  max-width: 555px;
  padding: 20px 2% 50px 2%;
  text-align: left;
`

export const NoReleases = styled.div`
  display: block;
  padding: 18px;
  position: relative;
  color: #FFF7F7;
  background: #DC3545;
  font-size: 21px;
  border-radius: 6px;
  margin: 0 auto 21px;
  width: 95%;
  text-align: center;
  overflow: hidden;
`
