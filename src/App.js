import { ForgotPassword, Home, Offers, Profile, SignIn, SignUp } from './pages'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { Header } from './components'

// import ForgotPassword from './pages'


const App = () => {
  return (
    <>
    <Router>
      <Header />
      {/* <ForgotPassword /> */}
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
