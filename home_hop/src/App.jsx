import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
  

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/register' element={<SignUp />}/>
          <Route path='/login' element={<SignIn />}/>
          {/* TODO: Add profile route and page */}
        </Routes>
      </Router>
    </>
  )
}

export default App
