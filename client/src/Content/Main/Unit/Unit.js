import css from './Unit.module.css'

function Unit() {
  return (
    <div className={css.unit}>
      <img src='/images/product.jpg' alt='Product logo' />
      <div className={css.description}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quinsequat. Duis aute irure dolor in reprehenderit in
          voluptate velit ess nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo cose cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum."
        </p>
      </div>
    </div>
  )
}

export default Unit
