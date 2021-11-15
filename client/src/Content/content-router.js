import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Catalog from './Catalog/Catalog'
import css from './Content.module.css'
import LogInContainer from './LogIn/LogInContainer'
import Main from './Main/Main'
import RegisterConteiner from './Register/RegisterConteiner'
import ProfileConteiner from './Profile/ProfileContainer'

function Content() {
  return (
    <div className={css.mainContent}>
      <Switch>
        <Route path='/' exact render={() => <Main />} />
        <Route path='/main' exact render={() => <Main />} />
        <Route path='/catalog' exact render={() => <Catalog />} />
        <Route path='/login' exact render={() => <LogInContainer />} />
        <Route path='/register' exact render={() => <RegisterConteiner />} />
        <Route path='/profile' exact render={() => <ProfileConteiner />} />
        <Redirect to='/' />
      </Switch>
    </div>
  )
}

export default Content
