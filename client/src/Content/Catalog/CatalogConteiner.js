import React from 'react'
import Catalog from './Catalog'
import axios from 'axios'
import { setChaptersData } from '../../redux/Reducers/Content/catalog-reducer'
import { connect } from 'react-redux'
import CatalogUnit from './CatalogUnit/CatalogUnit'

class CatalogContainer extends React.Component {
  async componentDidMount() {
    try {
      const response = await axios.get('/api/get/chapters')

      this.props.setChaptersData(response.data.chapters)
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const chapters = [...this.props.catalogState.chapters]

    let rowCount = Math.ceil(chapters.length / 3)

    let conteiner = []
    while (rowCount) {
      let colCount = chapters.length > 2 ? 3 : chapters.length
      const unitsConteiner = []

      while (colCount) {
        unitsConteiner.push(<CatalogUnit data={chapters[0]} />)

        chapters.splice(0, 1)
        colCount -= 1
      }

      conteiner.push(<Catalog unitsConteiner={unitsConteiner} />)
      rowCount -= 1
    }

    return <div class='container overflow-hidden'>{conteiner}</div>
  }
}

const mapStateToProps = state => {
  return {
    catalogState: state.catalogState
  }
}

export default connect(mapStateToProps, { setChaptersData })(CatalogContainer)
