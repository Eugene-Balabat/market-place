import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import CatalogConteiner from './Catalog/CatalogConteiner'
import css from './Content.module.css'
import LogInContainer from './LogIn/LogInContainer'
import RegisterConteiner from './Register/RegisterConteiner'
import ProfileConteiner from './Profile/ProfileContainer'
import ProductListConteiner from './List/ProductListConteiner'
import OrderConteiner from './Order/OrderConteiner'
import ProductConteiner from './Product/ProductConteiner'

function Content() {
  return (
    <div className={css.mainContent}>
      <Switch>
        <Route path='/' exact render={() => <ProfileConteiner />} />
        <Route path='/list' render={() => <ProductListConteiner />} />
        <Route path='/catalog' exact render={() => <CatalogConteiner />} />
        <Route path='/login' exact render={() => <LogInContainer />} />
        <Route path='/register' exact render={() => <RegisterConteiner />} />
        <Route path='/profile' exact render={() => <ProfileConteiner />} />
        <Route path='/order' render={() => <OrderConteiner />} />
        <Route path='/product' render={() => <ProductConteiner />} />
        <Redirect to='/' />
      </Switch>
    </div>
  )
}

export default Content
