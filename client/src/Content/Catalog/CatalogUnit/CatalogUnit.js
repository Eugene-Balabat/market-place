import { NavLink } from 'react-router-dom'

function CatalogUnit() {
  return (
    <div class='col-4'>
      <div class='p-3 border bg-light rounded-3'>
        <div class='card'>
          <img
            src='/images/product.jpg'
            className='rounded card-img-top img-thumbnail'
            alt='...'
          />
          <div class='card-body'>
            <h5 class='card-title p-0 mb-3'>Карточка с растянутой ссылкой</h5>
            <p class='card-text p-0'>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <NavLink to='/product' class='p-0 m-0 stretched-link' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatalogUnit
