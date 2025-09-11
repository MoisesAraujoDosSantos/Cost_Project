import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'


import './App.css'
import Home from './components/pages/Home'
import Contact from './components/pages/Contact'
import NewProject from './components/pages/NewProject'
import Company from './components/pages/Company'
import Container from './components/layouts/Container'
import Footer from './components/layouts/Footer'
import NavBar from './components/layouts/NavBar'
import Projects from './components/pages/Projects'

function App() {


  return (
    <Router>
      < NavBar/>
    <Routes>
      < Route element={<Container customClass="min_height"/>}>
        <Route path='/'          element={<Home/>}/>
        <Route path='/contact'   element={<Contact/>}/>
        <Route path='/company'   element={<Company/>}/>
        <Route path='/projects'element={<Projects/>}/>
        <Route path='/newproject'element={<NewProject/>}/>
      </Route>
      
    </Routes>
      < Footer/>
    </Router>
  )
}

export default App
