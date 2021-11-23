import { NavLink } from 'react-router-dom'

function CatalogUnit() {
  return (
    <div class='container overflow-hidden'>
      <div class='row gy-5 m-0 p-0'>
        <div class='col m-0'>
          <div class='card-image bg-light m-0'>
            <img
              src='/images/product.jpg'
              className='rounded card-img-top img-thumbnail'
              alt='...'
            />
          </div>
        </div>
        <div class='col m-0'>
          <div class='card-body bg-light'>
            <div class='header'>
              <h5 class='card-title p-0 mb-3'>Карточка с растянутой ссылкой</h5>
              <p class='card-text p-0'>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatalogUnit
