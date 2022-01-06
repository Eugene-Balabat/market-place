import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Order from './Order'
import {
  setAuthorizedStatus,
  setNewUserToast
} from '../../redux/Reducers/user-reducer'
import {
  setOrdersData,
  deleteExiestingToast,
  setNewToast
} from '../../redux/Reducers/Content/order-reducer'
import OrderUnit from './OrderUnit'
import { Redirect } from 'react-router'
import { Toast } from 'bootstrap'
import { v4 as uuidv4 } from 'uuid'

class OrderConteiner extends React.Component {
  constructor(props) {
    super(props)
    this.toastConteinerRef = React.createRef()
  }

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
          this.addNewToast(msg, headerToast, this.props.setNewUserToast)
          this.props.setAuthorizedStatus(false)
        } else {
          this.addNewToast(msg, headerToast, this.props.setNewToast)
          this.showToasts()
        }
      } else if (err.request) console.log(Error, err.messages)
    }
  }

  deleteToast = id => {
    this.props.orderState.toasts.forEach(element => {
      const index = this.props.orderState.toasts.indexOf(element)
      if (element.id === id) this.props.deleteExiestingToast(index)
    })
  }

  getUniqToastId = () => {
    const id = uuidv4()
    this.props.orderState.toasts.forEach(element => {
      if (element.id === id) return this.getUniqToastId()
    })
    return id
  }

  addNewToast = (message, header, addToastCallback) => {
    const id = this.getUniqToastId()
    addToastCallback({
      id,
      body: message,
      header
    })
  }

  showToasts = () => {
    const toastsLiveExample = this.toastConteinerRef.current.children

    Object.entries(toastsLiveExample).forEach(element => {
      const toast = new Toast(element[1])
      toast.show()
    })
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
          this.addNewToast(msg, headerToast, this.props.setNewUserToast)
          this.props.setAuthorizedStatus(false)
        } else {
          this.addNewToast(msg, headerToast, this.props.setNewToast)
          this.showToasts()
        }
      } else if (err.request) console.log(Error, err.messages)
    }
  }

  render() {
    const orderUnits = this.props.orderState.orders.map(element => {
      return <OrderUnit data={element} deleteOrderItem={this.deleteOrderItem} />
    })

    return (
      (this.props.orderState.upDatePage && <Redirect to={`/login`} />) || (
        <Order
          units={orderUnits}
          countOrders={this.props.orderState.orders.length}
          orderState={this.props.orderState}
          toastConteinerRef={this.toastConteinerRef}
          deleteToast={this.deleteToast}
        />
      )
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
  setNewUserToast,
  deleteExiestingToast,
  setNewToast
})(OrderConteiner)
