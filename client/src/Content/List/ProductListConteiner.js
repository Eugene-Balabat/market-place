import css from './Main.module.css'
import Unit from './Unit/Unit'
import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {
  setItemsData,
  setInitialState,
  setUpdateValue
} from '../../redux/Reducers/Content/list-reducer'
import { setAuthorizedStatus } from '../../redux/Reducers/user-reducer'
import ProductList from '../List/ProductList'
import { Redirect } from 'react-router'

class ProductListConteiner extends React.Component {
  constructor(props) {
    super(props)
    this.parentRef = React.createRef()

    const queryString = require('query-string')
    this.idChapter = queryString.parseUrl(window.location.search).query.id
  }

  async componentDidMount() {
    try {
      const responseItems = await axios.get('/api/get/items', {
        headers: { id: this.idChapter }
      })

      const items = responseItems.data.items.map(element => ({
        ...element,
        disable: true
      }))
      this.props.setItemsData(items)

      this.requestToSetItems(responseItems)
    } catch (error) {
      if (error.response) {
        const { type, msg } = error.response.data.error
        const headerToast = 'Ошибка'

        //   this.addNewToast(msg, headerToast, this.props.setNewToast)
        //   this.showToasts()
        console.log(error.response)
      } else if (error.request) console.log(Error, error.messages)
    }
  }

  logOut = () => {
    this.props.setAuthorizedStatus(false)
    this.props.setUpdateValue(true)
  }

  componentWillUnmount() {
    this.props.setInitialState()
  }

  isOrdered = (element, orders) => {
    for (const order of orders) {
      if (order.item === element._id) return true
    }
    return false
  }

  clickToBuy = async idProduct => {
    try {
      const responseItems = await axios.get('/api/get/items', {
        headers: { id: this.idChapter }
      })

      await axios.post(
        '/api/post/add-order',
        {
          idProduct: idProduct
        },
        {
          headers: { Token: localStorage.getItem('key') }
        }
      )

      this.requestToSetItems(responseItems)
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

  requestToSetItems = async responseItems => {
    try {
      const responseOrders = await axios.get('/api/get/orders', {
        headers: { Token: localStorage.getItem('key') }
      })

      const orders = responseOrders.data.orders

      const items = await responseItems.data.items.map(element => {
        if (this.isOrdered(element, orders))
          return { ...element, disable: true }
        else return { ...element, disable: false }
      })
      this.props.setItemsData(items)
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
    const conteiner = this.props.listState.items.map(element => {
      const unit = <Unit data={element} clickToBuy={this.clickToBuy} />
      return <ProductList listConteiner={unit} />
    })
    return (
      (this.props.listState.upDatePage && this.props.setUpdateValue(false) && (
        <Redirect to={`/list/?id=${this.idChapter}`} />
      )) || (
        <article ref={this.parentRef} className={css.content}>
          {conteiner}
        </article>
      )
    )
  }
}

const mapStateToProps = state => {
  return {
    listState: state.listState,
    userState: state.userState
  }
}

export default connect(mapStateToProps, {
  setItemsData,
  setInitialState,
  setAuthorizedStatus,
  setUpdateValue
})(ProductListConteiner)
