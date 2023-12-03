import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ProfilePage from './pages/ProfilePage'
import EditProfile from './pages/EditProfile'
import UserPage from './pages/UserPage'
import CreatePost from './pages/CreatePost'
import PostDetails from './pages/PostDetails'
import Footer from './components/Footer'

function App() {
  

  return (
    <>
      <Router>
        <NavBar />
        <div className='flex flex-col h-screen justify-between'>
        <Routes >
          <Route path='/' element={<HomePage />}/>
          <Route path='/register' element={<SignUp />}/>
          <Route path='/login' element={<SignIn />}/>
          <Route path='/profile' element={<ProfilePage />}/>
          <Route path='/profile_edit' element={<EditProfile />}/>
          <Route path='/profile/:username' element={<UserPage />}/>
          <Route path='/create_offer' element={<CreatePost />}/>
          <Route path='/rooms/:id' element={<PostDetails />}/>
        </Routes>
        <Footer />
        </div>

      </Router>
    </>
  )
}

export default App
