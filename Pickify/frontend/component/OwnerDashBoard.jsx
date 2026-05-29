import React, { useEffect, useState } from 'react'
import Navbar from './Nav'
import { useSelector } from 'react-redux'
import useGetMyShop from '../src/hooks/useGetMyShop'
import { useNavigate } from 'react-router-dom'
import { IoStorefrontOutline, IoLocationOutline } from 'react-icons/io5'
import { FiPlusCircle, FiBox, FiDollarSign, FiTrendingUp, FiShoppingBag, FiActivity, FiEdit3, FiSun, FiMoon, FiSunrise } from 'react-icons/fi'

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return { text: 'Good Morning', icon: 'sunrise' }
  if (hour >= 12 && hour < 17) return { text: 'Good Afternoon', icon: 'sun' }
  return { text: 'Good Evening', icon: 'moon' }
}

// Always-visible welcome banner at the top of the owner page
const WelcomeBanner = ({ name }) => {
  const { text, icon } = getGreeting()
  const GreetIcon = icon === 'sunrise' ? FiSunrise : icon === 'sun' ? FiSun : FiMoon

  const gradients = {
    sunrise: { bg: 'linear-gradient(135deg, #f97316 0%, #f59e0b 50%, #fde68a 100%)', shadow: 'rgba(249,115,22,0.25)' },
    sun:     { bg: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #34d399 100%)', shadow: 'rgba(16,185,129,0.25)' },
    moon:    { bg: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)', shadow: 'rgba(99,102,241,0.25)' },
  }
  const { bg, shadow } = gradients[icon]

  return (
    <div style={{
      background: bg,
      padding: '0.85rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.85rem',
      boxShadow: `0 4px 20px ${shadow}`,
    }}>
      {/* Icon circle */}
      <div style={{
        width: '40px', height: '40px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        backdropFilter: 'blur(4px)',
        border: '1.5px solid rgba(255,255,255,0.4)',
      }}>
        <GreetIcon style={{ color: 'white', fontSize: '1.25rem' }} />
      </div>

      {/* Text */}
      <div>
        <p style={{ margin: 0, fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {text}
        </p>
        <p style={{ margin: '1px 0 0', fontSize: '1rem', fontWeight: 800, color: 'white' }}>
          Welcome back, {name}!{' '}
          <span style={{ display: 'inline-block', animation: 'wave 1.4s ease-in-out infinite' }}>👋</span>
          <span style={{ fontWeight: 400, fontSize: '0.85rem', marginLeft: '0.5rem', opacity: 0.85 }}>Ready to manage your shop?</span>
        </p>
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          30% { transform: rotate(22deg); }
          70% { transform: rotate(-10deg); }
        }
      `}</style>
    </div>
  )
}

const OwnerDashBoard = () => {
  const { userData } = useSelector((state) => state.auth)
  const { myShop } = useGetMyShop();
  const navigate = useNavigate()

  useEffect(() => {
    if (!userData || userData.role?.toLowerCase() !== 'owner') {
      navigate('/');
    }
  }, [userData, navigate])
  
  return (
    <div className='min-h-screen w-full bg-linear-to-br from-green-50 to-emerald-50 font-sans text-gray-800'>
      <Navbar />
      {userData && (
        <WelcomeBanner name={userData.name?.split(' ')[0] || 'Owner'} />
      )}

      <main className='max-w-7xl mx-auto p-4 md:p-6 lg:p-8 mt-4'>
        {!myShop ? (
          <div className='flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-16 text-center transform transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]'>
            <div className='w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-inner'>
              <IoStorefrontOutline className='text-5xl' />
            </div>
            <h2 className='text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight'>
              Welcome to Your Dashboard
            </h2>
            <p className='text-gray-500 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed'>
              It looks like you haven't set up your shop yet. Create your shop to start adding items and receiving orders from eager customers!
            </p>
            <button 
              className='group relative flex items-center gap-3 bg-linear-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-green-500/30 hover:scale-105 transition-all duration-300'
              onClick={() => navigate('/owner/create-edit-shop')}
            >
              <FiPlusCircle className='text-2xl group-hover:rotate-90 transition-transform duration-300' />
              <span>Create My Shop</span>
              <div className='absolute inset-0 rounded-full ring-2 ring-green-500 ring-offset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </button>
          </div>
        ) : (
          <div className='space-y-8 fade-in'>
            {/* Header Section (Banner Style) */}
            <div className='bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden relative'>
              
              {/* Banner Image */}
              <div className='w-full h-48 md:h-80 lg:h-96 bg-gray-900 relative group overflow-hidden'>
                {/* Blurred Background to fill empty space */}
                {myShop.image && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center blur-xl opacity-40 scale-110" 
                    style={{ backgroundImage: `url(${myShop.image})` }}
                  ></div>
                )}
                
                {myShop.image ? (
                  <img src={myShop.image} alt={myShop.name} className='w-full h-full object-contain relative z-10 drop-shadow-2xl' />
                ) : (
                  <div className='w-full h-full flex items-center justify-center text-gray-500 relative z-10'>
                    <IoStorefrontOutline className='text-6xl opacity-50' />
                  </div>
                )}
                {/* Gradient overlay for premium feel */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10'></div>
                
                {/* Floating Status Badge */}
                <div className='absolute bottom-4 left-6 md:bottom-6 md:left-8 z-20'>
                  <span className='bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider flex items-center gap-2 w-max'>
                    <span className='w-2 h-2 rounded-full bg-white animate-pulse'></span> Accepting Orders
                  </span>
                </div>
              </div>

              {/* Shop Details & Actions */}
              <div className='p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
                <div className='flex-1'>
                  <h1 className='text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight'>
                    {myShop.name || 'My Awesome Shop'}
                  </h1>
                  <p className='text-gray-500 mt-2 text-sm md:text-base flex items-center gap-2 font-medium'>
                    <IoStorefrontOutline className='text-gray-400 shrink-0 text-lg' />
                    {myShop.city && myShop.state ? `${myShop.city}, ${myShop.state}` : 'Location pending'}
                  </p>
                  {myShop.address && (
                    <p className='text-gray-400 mt-1 text-sm flex items-center gap-2'>
                      <IoLocationOutline className='text-gray-400 shrink-0 text-lg' />
                      <span className='truncate max-w-sm md:max-w-md'>{myShop.address} {myShop.pincode && `- ${myShop.pincode}`}</span>
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className='shrink-0 w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-3'>
                  <button 
                    onClick={() => navigate('/owner/add-item')}
                    className='w-full md:w-auto flex items-center justify-center gap-2 bg-linear-to-r from-gray-900 to-gray-800 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 hover:shadow-xl transition-all duration-300'
                  >
                    <FiPlusCircle className='text-xl' />
                    Add New Product
                  </button>
                  <button 
                    onClick={() => navigate('/owner/create-edit-shop')}
                    className='w-full md:w-auto flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-sm'
                  >
                    Edit Shop Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {/* Stat Card 1 */}
              <div className='bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300'>
                <div className='flex justify-between items-start'>
                  <div>
                    <p className='text-gray-500 font-medium mb-1'>Total Revenue</p>
                    <h3 className='text-3xl font-black text-gray-900'>₹0</h3>
                  </div>
                  <div className='w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center'>
                    <FiDollarSign className='text-2xl' />
                  </div>
                </div>
                <div className='mt-4 flex items-center gap-2 text-sm'>
                  <span className='flex items-center gap-1 text-green-500 font-medium bg-green-50 px-2 py-1 rounded-md'>
                    <FiTrendingUp /> +0%
                  </span>
                  <span className='text-gray-400'>from last week</span>
                </div>
              </div>

              {/* Stat Card 2 */}
              <div className='bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300'>
                <div className='flex justify-between items-start'>
                  <div>
                    <p className='text-gray-500 font-medium mb-1'>Active Orders</p>
                    <h3 className='text-3xl font-black text-gray-900'>0</h3>
                  </div>
                  <div className='w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center'>
                    <FiShoppingBag className='text-2xl' />
                  </div>
                </div>
                <div className='mt-4 flex items-center gap-2 text-sm'>
                  <span className='flex items-center gap-1 text-orange-500 font-medium bg-orange-50 px-2 py-1 rounded-md'>
                    <FiActivity /> Live
                  </span>
                  <span className='text-gray-400'>Needs attention</span>
                </div>
              </div>

              {/* Stat Card 3 */}
              <div className='bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300'>
                <div className='flex justify-between items-start'>
                  <div>
                    <p className='text-gray-500 font-medium mb-1'>Products</p>
                    <h3 className='text-3xl font-black text-gray-900'>{myShop.items?.length || 0}</h3>
                  </div>
                  <div className='w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center'>
                    <FiBox className='text-2xl' />
                  </div>
                </div>
                <div className='mt-4 flex items-center gap-2 text-sm'>
                  <span className='text-gray-500'>Available in store</span>
                </div>
              </div>

              {/* Stat Card 4 */}
              <div className='bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-center items-center text-center group cursor-pointer' onClick={() => navigate('/owner/create-edit-shop')}>
                <div className='w-14 h-14 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center group-hover:bg-gray-100 group-hover:text-gray-800 transition-colors duration-300 mb-3'>
                  <IoStorefrontOutline className='text-2xl' />
                </div>
                <h4 className='font-bold text-gray-800 group-hover:text-gray-900'>Manage Shop Details</h4>
                <p className='text-sm text-gray-500 mt-1'>Update timings & address</p>
              </div>
            </div>

            {/* Quick Actions or Recent Activity Placeholder */}
            <div className='bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl md:text-2xl font-bold text-gray-900'>Recent Orders</h2>
                <button 
                  onClick={() => navigate('/orders')}
                  className='text-green-600 font-semibold hover:text-green-700 transition-colors'
                >
                  View All
                </button>
              </div>
              <div className='py-12 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200'>
                <FiShoppingBag className='text-4xl text-gray-300 mb-3' />
                <p className='text-gray-500 font-medium'>No recent orders to show</p>
                <p className='text-gray-400 text-sm mt-1'>When customers order, they'll appear here.</p>
              </div>
            </div>

            {/* My Catalog Section */}
            <div className='bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mt-8'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl md:text-2xl font-bold text-gray-900'>My Catalog</h2>
              </div>
              
              {!myShop.items || myShop.items.length === 0 ? (
                <div className='py-12 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200'>
                  <FiBox className='text-4xl text-gray-300 mb-3' />
                  <p className='text-gray-500 font-medium'>No products in your catalog yet</p>
                  <p className='text-gray-400 text-sm mt-1'>Add items to start selling to customers.</p>
                </div>
              ) : (
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
                  {myShop.items.map((item, index) => (
                    <div 
                      key={item._id || index} 
                      className={`bg-white border ${item.inStock === false ? 'border-red-100' : 'border-gray-100'} rounded-2xl overflow-hidden transition-all duration-500 group relative hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(34,197,94,0.2)] z-10`}
                    >
                      
                      <div className='h-48 bg-gray-100 relative overflow-hidden'>
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className={`w-full h-full object-cover transition-all duration-700 origin-center ${item.inStock !== false ? 'group-hover:scale-110 group-hover:rotate-2' : 'grayscale'}`} 
                          />
                        ) : (
                          <div className='w-full h-full flex items-center justify-center'>
                            <FiBox className='text-3xl text-gray-300' />
                          </div>
                        )}
                        {/* Price Badge */}
                        <div className='absolute top-2 right-2 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-sm font-black text-gray-900 shadow-sm flex items-center gap-2 z-20'>
                          {item.discountPrice > 0 ? (
                            <>
                              <span className='text-xs text-gray-400 line-through font-medium'>₹{item.price}</span>
                              <span className='text-green-600'>₹{item.discountPrice}</span>
                            </>
                          ) : (
                            <span>₹{item.price}</span>
                          )}
                        </div>
                        {/* Out of Stock Badge */}
                        {item.inStock === false && (
                          <div className='absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center z-10'>
                            <span className='bg-red-500 text-white font-bold px-4 py-1.5 rounded-full shadow-lg text-sm tracking-wide'>OUT OF STOCK</span>
                          </div>
                        )}
                      </div>
                      <div className='p-4'>
                        <div className='flex justify-between items-start mb-2'>
                          <span className='text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md uppercase tracking-wider'>{item.category}</span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/owner/edit-item/${item._id}`);
                            }}
                            className='text-gray-500 hover:text-green-600 transition-colors p-1.5 z-20 relative bg-gray-50 hover:bg-green-100 rounded-full'
                            title='Edit Product'
                          >
                            <FiEdit3 className='text-lg' />
                          </button>
                        </div>
                        <h3 className={`font-bold truncate text-lg mt-1 ${item.inStock === false ? 'text-gray-400' : 'text-gray-900'}`}>{item.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}
      </main>
    </div>
  )
}

export default OwnerDashBoard