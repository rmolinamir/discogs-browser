import React from 'react'
// JSX
import { 
  SearchResults,
  PrevButton,
  NextButton
} from './styled-components'
import ReactPaginate from 'react-paginate'
import { Icon } from 'react-svg-library'

const app = () => {
  return (
    <SearchResults>
      <Icon
        size='25vmin'
        animationFill={[
          '#00407C',
          '#0364BF',
          '#0364BF',
          '#4BA7FC'
        ]}
        icon='loading-one' />
      <ReactPaginate
        previousLabel={<PrevButton><Icon icon='arrow-right' /></PrevButton>}
        nextLabel={<NextButton><Icon icon='arrow-right' /></NextButton>}
        breakLabel={'•••'}
        breakClassName={'break'}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'} />
    </SearchResults>
  )
}

export default app
