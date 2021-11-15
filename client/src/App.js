import Header from './Header/Header'
import Footer from './Footer/Footer'
import './index.css'
import NavBar from './NavBar/NavBar'
import Content from './Content/content-router'

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <Content />
      <NavBar />
      <Footer />
    </div>
  )
}

export default App
