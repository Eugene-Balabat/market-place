import css from './Header.module.css'
import Unauthorized from './Header-Content/Unauthorized'
import Authorized from './Header-Content/Authorized'
import { setAuthorizedStatus } from '../redux/Reducers/user-reducer'
import React from 'react'
import { connect } from 'react-redux'

class HeaderConteiner extends React.Component {
  clickToLogout = () => {
    this.props.userState.isAuthorized && this.props.setAuthorizedStatus(false)
  }

  render() {
    const component = this.props.userState.isAuthorized ? (
      <Authorized clickToLogout={this.clickToLogout} />
    ) : (
      <Unauthorized />
    )
    return <header className={css.header}>{component}</header>
  }
}
const mapStateToProps = state => {
  return {
    userState: state.userState
  }
}

export default connect(mapStateToProps, {
  setAuthorizedStatus
})(HeaderConteiner)
