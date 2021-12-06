import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Order from './Order'
import { setAuthorizedStatus } from '../../redux/Reducers/user-reducer'
import {
  setOrdersData,
  setUpdateValue
} from '../../redux/Reducers/Content/order-reducer'
import OrderUnit from './OrderUnit'
import { Redirect } from 'react-router'

class OrderConteiner extends React.Component {
  async componentDidMount() {
    this.responseToGetOrders()
  }

  responseToGetOrders = async () => {
    try {
      const responseItems = await axios.get('/api/get/orderItems', {
        headers: { Token: localStorage.getItem('key') }
      })

      this.props.setOrdersData(responseItems.data.items)
    } catch (err) {
      if (err.response) {
        const { type, msg } = err.response.data.error
        const headerToast = 'Ошибка'

        if (type) {
          //   this.addNewToast(msg, headerToast, this.props.setNewUserToast)
          this.logOut()
        } else {
          //   this.addNewToast(msg, headerToast, this.props.setNewToast)
          //   this.showToasts()
          console.log(err.response)
        }
      } else if (err.request) console.log(Error, err.messages)
    }
  }

  deleteOrderItem = async id => {
    try {
      await axios.post(
        '/api/post/deleteOrder',
        { id_order: id },
        {
          headers: { Token: localStorage.getItem('key') }
        }
      )
      this.responseToGetOrders()
    } catch (err) {
      if (err.response) {
        const { type, msg } = err.response.data.error
        const headerToast = 'Ошибка'

        if (type) {
          //   this.addNewToast(msg, headerToast, this.props.setNewUserToast)
          this.logOut()
        } else {
          //   this.addNewToast(msg, headerToast, this.props.setNewToast)
          //   this.showToasts()
          console.log(err.response)
        }
      } else if (err.request) console.log(Error, err.messages)
    }
    // const parent =
    //   event.currentTarget.parentNode.parentNode.parentNode.parentNode
    // const child = event.currentTarget.parentNode.parentNode.parentNode
    // parent.removeChild(child)
  }

  logOut = () => {
    this.props.setAuthorizedStatus(false)
    this.props.setUpdateValue(true)
  }

  render() {
    const orderUnits = this.props.orderState.orders.map(element => {
      return <OrderUnit data={element} deleteOrderItem={this.deleteOrderItem} />
    })

    return (
      (this.props.orderState.upDatePage && this.props.setUpdateValue(false) && (
        <Redirect to={`/login`} />
      )) || <Order units={orderUnits} />
    )
  }
}

const mapStateToProps = state => {
  return {
    orderState: state.orderState,
    userState: state.userState
  }
}

export default connect(mapStateToProps, {
  setOrdersData,
  setAuthorizedStatus,
  setUpdateValue
})(OrderConteiner)
