import { NavLink } from 'react-router-dom'

function Authorized(props) {
  return (
    <nav class='navbar navbar-expand-lg navbar-light bg-light'>
      <div class='collapse navbar-collapse p-0' id='navbarSupportedContent'>
        <ul class='navbar-nav me-auto mb-2 mb-lg-0'>
          <li class='nav-item'>
            <NavLink className='nav-link' to='/main'>
              Главная
            </NavLink>
          </li>
          <li class='nav-item'>
            <NavLink className='nav-link' to='/catalog'>
              Каталог
            </NavLink>
          </li>
          <li class='nav-item'>
            <NavLink className='nav-link' to='/profile'>
              Профиль
            </NavLink>
          </li>
          <li class='nav-item'>
            <NavLink className='nav-link' to='/' onClick={props.clickToLogout}>
              Выход
            </NavLink>
          </li>
        </ul>
        <form class='d-flex'>
          <input
            class='form-control me-2'
            type='search'
            placeholder='Search'
            aria-label='Search'
          />
          <button class='btn btn-outline-secondary' type='submit'>
            Поиск
          </button>
        </form>
      </div>
    </nav>
  )
}

export default Authorized
