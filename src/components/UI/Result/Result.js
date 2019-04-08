import React from 'react'
import image_not_found from '../../../assets/images/not_found_image.svg'
// CSS
import modalCSS from './Modal.module.css'
import 'react-lazy-load-image-component/src/effects/blur.css'
// JSX
import {
  Title,
  Result,
  Container,
  MoreInformation,
  StyledImage,
  Text,
  Community
} from './styled-components'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Icon } from 'react-svg-library'
import Modal from 'react-png-modal'
import ModalContent from './ModalContent/ModalContent'

const result = (props) => {
  console.log('result', props)
  const [isModalOpen, setModalOpen] = React.useState(false)
  const {
    community,
    cover_image,
    thumb,
    title,
    user_data,
    year,
    type
  } = props

  return (
    <>
      {user_data && (
        <Modal
          className={modalCSS.Aesthetics}
          center
          closeModal={() => setModalOpen(false)}
          open={isModalOpen}>
          <ModalContent open={isModalOpen} {...props} />
        </Modal>
      )}
      <Result onClick={() => setModalOpen(true)}>
        <StyledImage>
          {user_data && (
            <MoreInformation>
              <Icon size='50%' icon='show' />
            </MoreInformation>
          )}
          <LazyLoadImage
            className='gallery-img'
            effect='blur'
            width={'100%'}
            height={205}
            alt={image_not_found}
            placeholderSrc={props.placeholder || thumb}
            src={cover_image}
            wrapperClassName='gallery-img-wrapper' />
        </StyledImage>
        <Container>
          <Title>{title}</Title>
          <Text>{year}</Text>
          <Text>{type}</Text>
          {/* Protection for  empty objects. */}
          {community && (
            <>
            <Community style={{
                color: '#EDCE21'
              }}>
              <span>{community.have}</span>
              <Icon icon='bullet-checkmark-no-bg' />
            </Community>
            <Community style={{
                color: '#C45A5A'
              }}>
              <span>{community.want}</span>
              <Icon icon='like' />
            </Community>
            </>
          )}
        </Container>
      </Result>
    </>
  )
}

export default result
