import React, { useEffect, useState } from 'react'
import Navbar from './Nav'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../src/config'
import { IoLocationOutline, IoStorefrontOutline, IoStar } from 'react-icons/io5'
import { FiLoader, FiArrowRight } from 'react-icons/fi'

const UserDashBoard = () => {
  const { userData, city, searchTerm } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  
  const [shops, setShops] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const filteredShops = shops.filter(shop => 
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/shop/all`, {
          withCredentials: true
        })
        setShops(response.data.shops || [])
      } catch (err) {
        setError('Failed to load shops. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchShops()
  }, [])
  
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800'>
      <Navbar />
      
      {/* Hero Banner */}
      <div className='bg-linear-to-r from-gray-900 to-gray-800 py-12 md:py-16 px-6'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-3xl md:text-5xl font-black text-white tracking-tight mb-4'>
            Restaurants & Shops <br className='hidden md:block' /> <span className='text-green-400'>Near You</span>
          </h1>
          <p className='text-gray-300 text-lg md:text-xl max-w-2xl flex items-center gap-2'>
            <IoLocationOutline className='text-green-400 text-2xl shrink-0' />
            Delivering to: <span className='text-white font-semibold'>{city || 'Your Location'}</span>
          </p>
        </div>
      </div>

      <main className='flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full'>
        {loading ? (
          <div className='flex flex-col items-center justify-center py-20'>
            <FiLoader className='text-green-500 text-4xl animate-spin mb-4' />
            <p className='text-gray-500 font-medium'>Finding the best spots...</p>
          </div>
        ) : error ? (
          <div className='bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 text-center font-medium shadow-sm'>
            {error}
          </div>
        ) : filteredShops.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm'>
            <IoStorefrontOutline className='text-6xl text-gray-300 mb-4' />
            <h3 className='text-2xl font-bold text-gray-800 mb-2'>No Shops Found</h3>
            <p className='text-gray-500 text-center max-w-md'>
              {searchTerm 
                ? `We couldn't find any shops matching "${searchTerm}". Try a different search!` 
                : "We couldn't find any registered shops in our system yet. Check back soon!"}
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8'>
            {filteredShops.map((shop) => (
              <div 
                key={shop._id} 
                onClick={() => navigate(`/shop/${shop._id}`)}
                className='bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100 hover:border-green-200 flex flex-col h-full'
              >
                {/* Shop Image */}
                <div className='h-32 md:h-56 bg-gray-200 relative overflow-hidden'>
                  {shop.image ? (
                    <img 
                      src={shop.image} 
                      alt={shop.name} 
                      className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105' 
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center text-gray-400'>
                      <IoStorefrontOutline className='text-5xl opacity-50' />
                    </div>
                  )}
                  {/* Subtle Gradient */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity'></div>
                  
                  {/* Rating / Badges */}
                  <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1'>
                    <IoStar className='text-yellow-500 text-sm' /> 4.5
                  </div>
                </div>

                {/* Shop Details */}
                <div className='p-5 flex-1 flex flex-col'>
                  <div className='flex justify-between items-start gap-4 mb-1 md:mb-2'>
                    <h3 className='text-sm md:text-xl font-extrabold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-1'>
                      {shop.name}
                    </h3>
                  </div>
                  
                  <p className='text-gray-500 text-[10px] md:text-sm mb-2 md:mb-4 flex items-start gap-1 flex-1 line-clamp-2'>
                    <IoLocationOutline className='text-gray-400 text-xs md:text-base shrink-0 mt-0.5' />
                    <span>{shop.address}, {shop.city}</span>
                  </p>

                  <div className='pt-4 border-t border-gray-100 flex justify-between items-center mt-auto'>
                    <span className='text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-md uppercase tracking-wider'>
                      OPEN
                    </span>
                    <span className='text-sm font-semibold text-gray-400 group-hover:text-gray-900 flex items-center gap-1 transition-colors'>
                      Explore <FiArrowRight className='group-hover:translate-x-1 transition-transform' />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default UserDashBoard