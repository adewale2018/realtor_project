import { ForgotPassword, Home, Offers, Profile, SignIn, SignUp } from './pages';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Header } from './components';
import { ToastContainer } from 'react-toastify';

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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
 />
    </>
  );
};

export default App;
