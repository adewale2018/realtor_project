import { ForgotPassword, Home, Offers, Profile, SignIn, SignUp } from './pages'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/offers' element={<Offers />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
