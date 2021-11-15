import preloader from '../assets/preloader.svg'
import css from './Preloader.module.css'

const Preloader = props => {
  return <img src={preloader} alt='preloader' className={css.image} />
}

export default Preloader
