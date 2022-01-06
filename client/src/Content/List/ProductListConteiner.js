import css from './Main.module.css'
import Unit from './Unit/Unit'
import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {
  setItemsData,
  setInitialState,
  setUpdateValue,
  setNewToast,
  deleteExiestingToast
} from '../../redux/Reducers/Content/list-reducer'
import { setAuthorizedStatus } from '../../redux/Reducers/user-reducer'
import ProductList from '../List/ProductList'
import { Toast } from 'bootstrap'
import { v4 as uuidv4 } from 'uuid'

class ProductListConteiner extends React.Component {
  constructor(props) {
    super(props)
    this.parentRef = React.createRef()
    this.toastConteinerRef = React.createRef()

    const queryString = require('query-string')
    this.idChapter = queryString.parseUrl(window.location.search).query.id
  }

  async componentDidMount() {
    this.deffaultSetItems()
  }

  deffaultSetItems = async () => {
    try {
      const responseItems = await axios.get('/api/get/items', {
        headers: { id: this.idChapter }
      })

      if (this.props.userState.isAuthorized)
        this.requestToSetItems(responseItems)
      else {
        const items = responseItems.data.items.map(element => ({
          ...element,
          disable: true
        }))
        this.props.setItemsData(items)
      }
    } catch (error) {
      if (error.response) {
        const { msg } = error.response.data.error
        const headerToast = 'Ошибка'

        if (this.toastConteinerRef.current) {
          this.addNewToast(msg, headerToast, this.props.setNewToast)
          this.showToasts()
        }
      } else if (error.request) console.log(Error, error.messages)
    }
  }

  deleteToast = id => {
    this.props.listState.toasts.forEach(element => {
      const index = this.props.listState.toasts.indexOf(element)
      if (element.id === id) this.props.deleteExiestingToast(index)
    })
  }

  getUniqToastId = () => {
    const id = uuidv4()
    this.props.listState.toasts.forEach(element => {
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

  logOut = () => {
    this.props.setUpdateValue(true)
    this.props.setAuthorizedStatus(false)
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

        if (type) this.props.userState.isAuthorized && this.logOut()

        if (this.toastConteinerRef.current) {
          this.addNewToast(msg, headerToast, this.props.setNewToast)
          this.showToasts()
        }
      } else if (err.request) console.log(Error, err.messages)
    }
  }

  componentDidUpdate() {
    if (this.props.listState.upDatePage) {
      this.deffaultSetItems()
      this.props.setUpdateValue(false)
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

        if (type) this.props.userState.isAuthorized && this.logOut()

        if (this.toastConteinerRef.current) {
          this.addNewToast(msg, headerToast, this.props.setNewToast)
          this.showToasts()
        }
      } else if (err.request) console.log(Error, err.messages)
    }
  }

  render() {
    const conteiner = this.props.listState.items.map(element => {
      const unit = <Unit data={element} clickToBuy={this.clickToBuy} />
      return (
        <ProductList
          listConteiner={unit}
          toastConteinerRef={this.toastConteinerRef}
          deleteToast={this.deleteToast}
          listState={this.props.listState}
        />
      )
    })
    return (
      <article ref={this.parentRef} className={css.content}>
        {conteiner}
      </article>
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
  setUpdateValue,
  setNewToast,
  deleteExiestingToast
})(ProductListConteiner)
