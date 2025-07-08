import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from './Components/Pages/Home'
import Company from './Components/Pages/Company'
import Contact from './Components/Pages/Contact'
import NewProject from './Components/Pages/NewProject'
import Projects from './Components/Pages/Projects'

import Container from './Components/Layout/Container'
import Footer from './Components/Layout/Footer'
import Navbar from './Components/Layout/NavBar'

function App() {
  
  return (
    <Router>
      <Navbar />
      <Container customClass ="min-height">
        <Routes>
          <Route path ="/" element={<Home />} />
          <Route path ="/Company" element={<Company />} />
          <Route path ="/Contact" element={<Contact />} />
          <Route path ="/NewProject" element={<NewProject />} />
          <Route path ="/Projects" element={<Projects />} />
        </Routes>
      </Container>
      
      <Footer />
    </Router>
  )
}

export default App
