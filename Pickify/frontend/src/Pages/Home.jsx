import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../config'
import { clearUser } from '../redux/userSlice'
import Navbar from '../../component/Nav'
import UserDashBoard from '../../component/UserDashBoard'

const Home = () => {
  const { userData, city } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Redirect owners to their dedicated dashboard
  useEffect(() => {
    if (userData?.role?.toLowerCase() === 'owner') {
      navigate('/owner')
    }
  }, [userData, navigate])

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      })
      dispatch(clearUser())
      navigate('/signin')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {userData?.role === 'owner' ? (
        <div className='min-h-screen w-full bg-linear-to-br from-green-50 to-orange-50'>
          <Navbar />
          <main className='p-6'>
            <div className='rounded-2xl bg-white p-6 shadow-sm'>Owner dashboard</div>
          </main>
        </div>
      ) : userData?.role === 'user' ? (
        <UserDashBoard />
      ) : (
        <div className='min-h-screen w-full bg-linear-to-br from-green-50 to-orange-50'>
          <Navbar />
          <main className='p-6'>
            <div className='rounded-2xl bg-white p-6 shadow-sm'>Delivery dashboard</div>
          </main>
        </div>
      )}
    </>
  )
}

export default Home
