import styled from 'styled-components'
import imageNotFound from '../../../assets/images/not_found_image.svg'

export const Title = styled.div`
  padding: 0 0 3px;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: all 200ms ease-in-out;
`

export const Result = styled.div`
  cursor: pointer;
  display: inline-block;
  position: relative;
  max-width: 225px;
  width: 100%;
  height: auto;
  margin: 0 auto;

  :hover span {
    transform: scale(1);
  }
  
  :hover ${Title} {
    color: #DC3545;
  }
`

export const Container = styled.div`
  width: 95%;
  margin: 0 auto;
`

export const MoreInformation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  left: 50%;
  top: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  background: rgba(220, 53, 69, 0.5);
  transition: all 200ms ease-in-out;

  svg {
    opacity: 0.8;
    z-index: 1;
    color: #FFF7F7;
    width: 80px;
    height: 80px;
  }
`

export const StyledImage = styled.span`
  display: inline-block;
  position: relative;
  background-image: url(${imageNotFound});
  background-size: 100% 100%;
  color: transparent;
  width: 100%;
  height: 205px;
  transition: all 200ms ease-in-out;
  transform: scale(0.95);

  :hover ${MoreInformation} {
    z-index: 1;
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1);
    border-radius: 0px;
  }
`

export const Text = styled.div`
  padding: 3px 0 3px;
  font-weight: 200;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: all 200ms ease-in-out;
  text-transform: capitalize;
`

export const Community = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 3px 1ch 3px 0px;
  font-weight: 600;
  font-size: 1em;

  span {
    margin-right: 3px;
  }
`
