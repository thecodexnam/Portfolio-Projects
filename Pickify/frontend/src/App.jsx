import { Routes, Route } from 'react-router-dom'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import Home from './Pages/Home'
import ForgetPassword from './Pages/ForgetPassword'
import useCurrentUser from './hooks/useCurrentUser'
import { useSelector } from 'react-redux'
 

const App = () => {
  useCurrentUser()
  const {userData} = useSelector(state=>state.auth)
  console.log("Redux User Data:", userData)
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
