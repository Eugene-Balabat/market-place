import { NavLink } from 'react-router-dom'

function CatalogUnit(props) {
  return (
    <div class='col-4'>
      <div class='p-3 border bg-light rounded-3'>
        <div class='card'>
          <img
            src={props.data.imageUrl || `/images/product.jpg`}
            className='rounded card-img-top img-thumbnail'
            alt='...'
            style={{ width: '300px', height: '280px' }}
          />
          <div class='card-body'>
            <h5 class='card-title p-0 mb-3'>{props.data.title}</h5>
            <NavLink
              to={`/list/?id=${props.data._id}`}
              class='p-0 m-0 stretched-link'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatalogUnit
