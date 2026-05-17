import React, { useEffect, useState } from 'react'
import Navbar from '../../component/Nav'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../config'
import { addToCart } from '../redux/cartSlice'
import { IoLocationOutline, IoStorefrontOutline, IoStar } from 'react-icons/io5'
import { FiLoader, FiArrowLeft, FiShoppingCart, FiCheck, FiShoppingBag, FiArrowRight } from 'react-icons/fi'

const ShopCatalogPage = () => {
  const { shopId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { items: cartItems, totalAmount, totalQuantity } = useSelector(state => state.cart)
  
  const [shop, setShop] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [addedItem, setAddedItem] = useState(null)

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/shop/${shopId}`, {
          withCredentials: true
        })
        setShop(response.data.shop)
      } catch (err) {
        setError('Failed to load shop details. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    
    if (shopId) fetchShop()
  }, [shopId])

  const handleAddToCart = (item) => {
    dispatch(addToCart({ item, shopId }))
    setAddedItem(item._id)
    setTimeout(() => setAddedItem(null), 1500)
  }
  
  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex flex-col'>
        <Navbar />
        <div className='flex-1 flex flex-col items-center justify-center py-20'>
          <FiLoader className='text-green-500 text-4xl animate-spin mb-4' />
          <p className='text-gray-500 font-medium'>Loading catalog...</p>
        </div>
      </div>
    )
  }

  if (error || !shop) {
    return (
      <div className='min-h-screen bg-gray-50 flex flex-col'>
        <Navbar />
        <div className='flex-1 p-6 md:p-8 max-w-4xl mx-auto w-full'>
          <button onClick={() => navigate('/')} className='flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 font-medium transition-colors'>
            <FiArrowLeft /> Back to Shops
          </button>
          <div className='bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 text-center font-medium shadow-sm'>
            {error || 'Shop not found'}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800 pb-24 md:pb-0'>
      <Navbar />
      
      {/* Shop Banner */}
      <div className='bg-white shadow-sm border-b border-gray-100 relative'>
        <div className='h-48 md:h-64 lg:h-80 w-full bg-gray-900 relative overflow-hidden'>
            {shop.image && (
                <div 
                    className="absolute inset-0 bg-cover bg-center blur-xl opacity-50 scale-110" 
                    style={{ backgroundImage: `url(${shop.image})` }}
                ></div>
            )}
            {shop.image ? (
                <img src={shop.image} alt={shop.name} className='w-full h-full object-contain relative z-10' />
            ) : (
                <div className='w-full h-full flex items-center justify-center text-gray-500 relative z-10'>
                    <IoStorefrontOutline className='text-6xl opacity-50' />
                </div>
            )}
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10'></div>
            
            <div className='absolute bottom-6 left-6 md:bottom-8 md:left-10 z-20'>
                <h1 className='text-3xl md:text-5xl font-black text-white tracking-tight mb-2'>{shop.name}</h1>
                <p className='text-gray-300 text-sm md:text-base flex items-center gap-2 font-medium max-w-2xl'>
                    <IoLocationOutline className='text-green-400 text-lg shrink-0' />
                    {shop.address}, {shop.city}, {shop.state} - {shop.pincode}
                </p>
            </div>
            <div className='absolute top-6 left-6 z-20'>
                <button 
                    onClick={() => navigate('/')} 
                    className='flex items-center justify-center w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-colors'
                >
                    <FiArrowLeft className='text-xl' />
                </button>
            </div>
        </div>
      </div>

      <main className='flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full'>
        <div className='mb-8 flex justify-between items-end'>
            <div>
                <h2 className='text-2xl font-bold text-gray-900'>Menu</h2>
                <p className='text-gray-500 mt-1'>{shop.items?.length || 0} items available</p>
            </div>
        </div>

        {!shop.items || shop.items.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm'>
            <IoStorefrontOutline className='text-6xl text-gray-300 mb-4' />
            <h3 className='text-2xl font-bold text-gray-800 mb-2'>Menu is Empty</h3>
            <p className='text-gray-500 text-center max-w-md'>This shop hasn't added any products yet.</p>
          </div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6'>
            {shop.items.map((item) => (
              <div 
                key={item._id} 
                className={`bg-white border ${item.inStock === false ? 'border-red-100 opacity-75' : 'border-gray-100'} rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full relative group`}
              >
                <div className='h-32 md:h-48 bg-gray-100 relative overflow-hidden'>
                  {item.image ? (
                    <img 
                        src={item.image} 
                        alt={item.name} 
                        className={`w-full h-full object-cover transition-transform duration-700 ${item.inStock !== false ? 'group-hover:scale-110' : 'grayscale'}`} 
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center bg-gray-50'>
                        <IoStorefrontOutline className='text-4xl text-gray-300' />
                    </div>
                  )}
                  
                  {item.discountPrice > 0 && item.inStock !== false && (
                    <div className='absolute top-3 left-3 bg-red-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-md'>
                        SALE
                    </div>
                  )}

                  {item.inStock === false && (
                    <div className='absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center z-10'>
                      <span className='bg-red-500 text-white font-bold px-4 py-1.5 rounded-full shadow-lg text-sm tracking-wide'>OUT OF STOCK</span>
                    </div>
                  )}
                </div>

                <div className='p-3 md:p-5 flex-1 flex flex-col cursor-pointer' onClick={() => navigate(`/product/${item._id}`)}>
                  <div className='flex justify-between items-start mb-2'>
                    <span className='text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md uppercase tracking-wider'>
                        {item.category}
                    </span>
                  </div>
                  <div className='flex flex-wrap items-center gap-1.5 md:gap-2 mb-1'>
                    <h3 className={`font-bold text-sm md:text-lg line-clamp-1 ${item.inStock === false ? 'text-gray-500' : 'text-gray-900'}`}>{item.name}</h3>
                    {item.weight && (
                        <span className='text-[10px] font-black text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 uppercase'>
                            {item.weight}
                        </span>
                    )}
                  </div>
                  <p className='text-gray-500 text-sm line-clamp-2 mb-4 flex-1'>{item.description}</p>
                </div>
                  
                <div className='p-3 md:p-5 pt-0 mt-auto'>
                  <div className='flex items-center justify-between pt-3 md:pt-4 border-t border-gray-100'>
                    <div className='flex flex-col'>
                        {item.discountPrice > 0 ? (
                            <>
                                <span className='text-[10px] md:text-xs text-gray-400 line-through font-medium'>₹{item.price}</span>
                                <span className='text-sm md:text-lg font-black text-gray-900'>₹{item.discountPrice}</span>
                            </>
                        ) : (
                            <span className='text-sm md:text-lg font-black text-gray-900'>₹{item.price}</span>
                        )}
                    </div>
                    
                    {item.inStock !== false && (
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(item);
                            }}
                            className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl transition-all ${
                                addedItem === item._id 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-green-500 text-white hover:bg-green-600 hover:shadow-md'
                            }`}
                        >
                            {addedItem === item._id ? <FiCheck className='text-lg' /> : <FiShoppingCart className='text-base md:text-lg' />}
                        </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Floating Cart Bar */}
      {totalQuantity > 0 && (
        <div className='fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-linear-to-r from-green-600 to-emerald-700 text-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(34,197,94,0.3)] flex items-center justify-between z-50 animate-bounce-subtle'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center'>
              <FiShoppingBag className='text-2xl' />
            </div>
            <div>
              <p className='text-xs text-green-100 font-bold uppercase tracking-widest'>{totalQuantity} {totalQuantity === 1 ? 'Item' : 'Items'} Added</p>
              <p className='text-xl font-black'>₹{totalAmount}</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/checkout')}
            className='bg-white text-green-700 px-6 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-green-50 transition-colors shadow-sm'
          >
            View Cart <FiArrowRight />
          </button>
        </div>
      )}
    </div>
  )
}

export default ShopCatalogPage
