import { Routes, Route } from 'react-router-dom'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import Home from './Pages/Home'
import ForgetPassword from './Pages/ForgetPassword'
import useCurrentUser from './hooks/useCurrentUser'
 

const App = () => {
  useCurrentUser()
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/forget-password' element={<ForgetPassword />} />
    </Routes>
  )
}

export default App
