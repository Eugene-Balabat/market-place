import css from './Main.module.css'
import Unit from './Unit/Unit'

function Main() {
  return (
    <article className={css.content}>
      <Unit />
      <Unit />
      <Unit />
    </article>
  )
}

export default Main
