import css from './Main.module.css'
import Unit from './Unit/Unit'
import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {
  setItemsData,
  setInitialState
} from '../../redux/Reducers/Content/list-reducer'
import ProductList from '../List/ProductList'

class ProductListConteiner extends React.Component {
  constructor(props) {
    super(props)
    this.parentRef = React.createRef()
  }

  async componentDidMount() {
    try {
      const queryString = require('query-string')
      const id = queryString.parseUrl(window.location.search).query.id

      const response = await axios.get('/api/get/items', {
        headers: { id: id }
      })

      this.props.setItemsData(response.data.items)

      const conteiner = Array.from(this.parentRef.current.children)
      conteiner.forEach(element => {
        const buyBtn = element.children[1].children[2].children[0]
        !buyBtn.classList.contains('disabled') && this.setButtonStatus(buyBtn)
      })
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
    const conteiner = this.props.listState.items.map(element => {
      const unit = <Unit data={element} />
      return <ProductList listConteiner={unit} />
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

export default connect(mapStateToProps, { setItemsData, setInitialState })(
  ProductListConteiner
)
