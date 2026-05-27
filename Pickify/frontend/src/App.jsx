import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import Home from './Pages/Home'
import ForgetPassword from './Pages/ForgetPassword'
import OwnerDashBoard from '../component/OwnerDashBoard'
import CreateEditShopPage from './Pages/CreateEditShopPage'
import AddItemPage from './Pages/AddItemPage'
import ShopCatalogPage from './Pages/ShopCatalogPage'
import CheckoutPage from './Pages/CheckoutPage'
import MyOrdersPage from './Pages/MyOrdersPage'
import ProductDetailsPage from './Pages/ProductDetailsPage'
import useCurrentUser from './hooks/useCurrentUser'
import { useDispatch, useSelector } from 'react-redux'
import { setCity } from './redux/userSlice'

const App = () => {
  useCurrentUser()
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.auth)

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY

    if (!userData || !apiKey || typeof navigator === 'undefined' || !navigator.geolocation) {
      return
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const { data } = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json&apiKey=${apiKey}`
          )

          const location = data.results?.[0]
          if (!location) {
            dispatch(setCity('Location Not Found'))
            return
          }

          const area =
            location.suburb ||
            location.neighbourhood ||
            location.quarter ||
            location.town ||
            location.village ||
            location.hamlet
          const broadCity =
            location.city || location.municipality || location.county || location.state

          const locationName =
            area && broadCity && area !== broadCity
              ? `${area}, ${broadCity}`
              : area || broadCity || location.formatted?.split(',')[0] || 'Unknown Location'

          dispatch(setCity(locationName))
        } catch {
          dispatch(setCity('Fetch Error'))
        }
      },
      ({ code }) => {
        let errorMsg = 'Location Blocked'
        if (code === 2) errorMsg = 'Position Unavailable'
        if (code === 3) errorMsg = 'Timeout'
        dispatch(setCity(errorMsg))
      }
    )
  }, [dispatch, userData])

  return (
    <Routes>
      <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
      <Route path='/signin' element={!userData ? <SignIn /> : <Navigate to={"/"} />} />
      <Route path='/forget-password' element={!userData ? <ForgetPassword /> : <Navigate to={"/"} />} />
      <Route path='/' element={userData ? <Home /> : <Navigate to={`/signin`} />} />
      <Route path='/owner' element={userData ? <OwnerDashBoard /> : <Navigate to='/signin' />} />
      <Route path='/owner/create-edit-shop' element={userData ? <CreateEditShopPage /> : <Navigate to='/signin' />} />
      <Route path='/owner/add-item' element={userData ? <AddItemPage /> : <Navigate to='/signin' />} />
      <Route path='/owner/edit-item/:itemId' element={userData ? <AddItemPage /> : <Navigate to='/signin' />} />
      <Route path='/shop/:shopId' element={userData ? <ShopCatalogPage /> : <Navigate to='/signin' />} />
      <Route path='/checkout' element={userData ? <CheckoutPage /> : <Navigate to='/signin' />} />
      <Route path='/my-orders' element={userData ? <MyOrdersPage /> : <Navigate to='/signin' />} />
      <Route path='/product/:itemId' element={userData ? <ProductDetailsPage /> : <Navigate to='/signin' />} />
    </Routes>
  )
}

export default App
