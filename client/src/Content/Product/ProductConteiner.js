import React from 'react'
import Product from './Product'
import axios from 'axios'
import {
  setProductData,
  setInitialState,
  setUpdateValue
} from '../../redux/Reducers/Content/product-reducer'
import { setAuthorizedStatus } from '../../redux/Reducers/user-reducer'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

class ProductContainer extends React.Component {
  constructor(props) {
    super(props)
    this.buttonRef = React.createRef()

    const queryString = require('query-string')
    this.idProduct = queryString.parseUrl(window.location.search).query.id
  }

  async componentDidMount() {
    try {
      const responseData = await axios.get('/api/get/product', {
        headers: { id: this.idProduct }
      })

      const productData = { ...responseData.data.product, disable: true }
      this.props.setProductData(productData)

      this.requestToCheckOrders(responseData)
      // !this.buttonRef.current.classList.contains('disabled') &&
      //   this.setButtonStatus(this.buttonRef.current)
    } catch (e) {
      console.log(e)
    }
  }

  componentWillUnmount() {
    this.props.setInitialState()
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

  render() {
    return (
      (this.props.productState.upDatePage &&
        this.props.setUpdateValue(false) && (
          <Redirect to={`/product/?id=${this.idProduct}`} />
        )) || (
        <Product
          data={this.props.productState.data}
          buttonRef={this.buttonRef}
          clickToBuy={this.clickToBuy}
        />
      )
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
  setAuthorizedStatus
})(ProductContainer)
