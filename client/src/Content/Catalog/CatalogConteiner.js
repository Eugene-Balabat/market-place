import CatalogUnit from './CatalogUnit/CatalogUnit'

function Catalog() {
  return (
    <div class='container overflow-hidden'>
      <div class='row gy-5'>
        <CatalogUnit />
        <CatalogUnit />
        <CatalogUnit />
      </div>
      <div class='row gy-5'>
        <CatalogUnit />
      </div>
    </div>
  )
}

export default Catalog
