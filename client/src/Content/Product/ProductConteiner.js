import React from 'react'
import Product from './Product'
import axios from 'axios'
import {
  setProductData,
  setInitialState,
  setUpdateValue,
  deleteExiestingToast,
  setNewToast
} from '../../redux/Reducers/Content/product-reducer'
import { setAuthorizedStatus } from '../../redux/Reducers/user-reducer'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Toast } from 'bootstrap'
import { v4 as uuidv4 } from 'uuid'

class ProductContainer extends React.Component {
  constructor(props) {
    super(props)
    this.buttonRef = React.createRef()
    this.toastConteinerRef = React.createRef()

    const queryString = require('query-string')
    this.idProduct = queryString.parseUrl(window.location.search).query.id
  }

  async componentDidMount() {
    this.deffaultSetData()
  }

  componentWillUnmount() {
    this.props.setInitialState()
  }

  componentDidUpdate() {
    if (this.props.productState.upDatePage) {
      this.deffaultSetData()
      this.props.setUpdateValue(false)
    }
  }

  deffaultSetData = async () => {
    try {
      const responseData = await axios.get('/api/get/product', {
        headers: { id: this.idProduct }
      })

      if (this.props.userState.isAuthorized)
        this.requestToCheckOrders(responseData)
      else {
        const productData = { ...responseData.data.product, disable: true }
        this.props.setProductData(productData)
      }
    } catch (error) {
      const { msg } = error.response.data.error
      const headerToast = 'Ошибка'

      if (this.toastConteinerRef.current) {
        this.addNewToast(msg, headerToast, this.props.setNewToast)
        this.showToasts()
      }
    }
  }

  deleteToast = id => {
    this.props.productState.toasts.forEach(element => {
      const index = this.props.productState.toasts.indexOf(element)
      if (element.id === id) this.props.deleteExiestingToast(index)
    })
  }

  getUniqToastId = () => {
    const id = uuidv4()
    this.props.productState.toasts.forEach(element => {
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

  isOrder = (product, orders) => {
    for (const element of orders) {
      if (element.item === product._id) return true
    }
    return false
  }

  logOut = () => {
    this.props.setAuthorizedStatus(false)
    this.props.setUpdateValue(true)
  }

  clickToBuy = async () => {
    try {
      const responseData = await axios.get('/api/get/product', {
        headers: { id: this.idProduct }
      })

      await axios.post(
        '/api/post/add-order',
        {
          idProduct: this.idProduct
        },
        {
          headers: { Token: localStorage.getItem('key') }
        }
      )

      this.requestToCheckOrders(responseData)
    } catch (err) {
      if (err.response) {
        const { type, msg } = err.response.data.error
        const headerToast = 'Ошибка'

        if (type) this.props.userState.isAuthorized && this.logOut()

        if (this.toastConteinerRef.current) {
          this.addNewToast(msg, headerToast, this.props.setNewToast)
          this.showToasts()
        }
      } else if (err.request) console.log(Error, err.messages)
    }
  }

  requestToCheckOrders = async responseData => {
    try {
      const responseOrders = await axios.get('/api/get/orders', {
        headers: { Token: localStorage.getItem('key') }
      })

      const orders = responseOrders.data.orders
      const product = responseData.data.product

      const data = this.isOrder(product, orders)
        ? { ...product, disable: true }
        : { ...product, disable: false }

      this.props.setProductData(data)
    } catch (err) {
      if (err.response) {
        const { type, msg } = err.response.data.error
        const headerToast = 'Ошибка'

        if (type) this.props.userState.isAuthorized && this.logOut()

        if (this.toastConteinerRef.current) {
          this.addNewToast(msg, headerToast, this.props.setNewToast)
          this.showToasts()
        }
      } else if (err.request) console.log(Error, err.messages)
    }
  }

  render() {
    return (
      <Product
        productState={this.props.productState}
        buttonRef={this.buttonRef}
        clickToBuy={this.clickToBuy}
        toastConteinerRef={this.toastConteinerRef}
        deleteToast={this.deleteToast}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    productState: state.productState,
    userState: state.userState
  }
}

export default connect(mapStateToProps, {
  setProductData,
  setInitialState,
  setUpdateValue,
  setAuthorizedStatus,
  deleteExiestingToast,
  setNewToast
})(ProductContainer)
