import React from 'react'
import Product from './Product'
import axios from 'axios'
import {
  setProductData,
  setInitialState
} from '../../redux/Reducers/Content/product-reducer'
import { connect } from 'react-redux'

class ProductContainer extends React.Component {
  constructor(props) {
    super(props)
    this.buttonRef = React.createRef()
  }

  async componentDidMount() {
    try {
      const queryString = require('query-string')
      const id = queryString.parseUrl(window.location.search).query.id

      const response = await axios.get('/api/get/product', {
        headers: { id: id }
      })

      this.props.setProductData(response.data.product)
      !this.buttonRef.current.classList.contains('disabled') &&
        this.setButtonStatus(this.buttonRef.current)
    } catch (e) {
      console.log(e)
    }
  }

  componentWillUnmount() {
    this.props.setInitialState()
  }

  setButtonStatus(element) {
    this.props.userState.isAuthorized
      ? this.setUnDisable(element)
      : this.setDisable(element)
  }

  setDisable = element => {
    !element.classList.contains('disabled') && element.classList.add('disabled')
  }

  setUnDisable = element => {
    element.classList.contains('disabled') &&
      element.classList.remove('disabled')
  }

  render() {
    return (
      <Product data={this.props.productState.data} buttonRef={this.buttonRef} />
    )
  }
}

const mapStateToProps = state => {
  return {
    productState: state.productState,
    userState: state.userState
  }
}

export default connect(mapStateToProps, { setProductData, setInitialState })(
  ProductContainer
)
