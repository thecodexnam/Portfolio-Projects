import React, { useState } from 'react'
import Navbar from '../../component/Nav'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../config'
import { clearCart, removeFromCart, updateQuantity } from '../redux/cartSlice'
import { FiLoader, FiCheck, FiShoppingBag, FiTruck, FiMapPin, FiPhone, FiMinus, FiPlus, FiTrash2, FiClock } from 'react-icons/fi'
import { IoReceiptOutline, IoLocationOutline, IoTrashOutline } from 'react-icons/io5'

const CheckoutPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { items, totalAmount, totalQuantity, shopId } = useSelector(state => state.cart)
  const { userData } = useSelector(state => state.auth)

  const [loading, setLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [deliveryType, setDeliveryType] = useState('Delivery') // 'Delivery' or 'Self-Pickup'
  const [isScheduled, setIsScheduled] = useState(false)
  const [scheduledDate, setScheduledDate] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState(userData?.phone || '')
  const [pincode, setPincode] = useState('')

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    if (items.length === 0) return

    setLoading(true)
    try {
      const orderData = {
        shopId,
        items: items.map(item => ({
          item: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          weight: item.weight
        })),
        totalAmount,
        address: deliveryType === 'Self-Pickup' ? 'Self-Pickup at Store' : address,
        phone,
        pincode,
        deliveryType,
        scheduledDate: isScheduled ? scheduledDate : null,
        scheduledTime: isScheduled ? scheduledTime : null
      }

      const response = await axios.post(`${serverUrl}/api/order/place`, orderData, {
        withCredentials: true
      })

      if (response.status === 201) {
        setOrderPlaced(true)
        dispatch(clearCart())
      }
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || "Failed to place order")
    } finally {
      setLoading(false)
    }
  }

  if (orderPlaced) {
    return (
      <div className='min-h-screen bg-gray-50 flex flex-col'>
        <Navbar />
        <div className='flex-1 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500'>
          <div className='w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-200'>
            <FiCheck className='text-5xl text-green-600' />
          </div>
          <h2 className='text-4xl font-black text-gray-900 mb-2'>Order Placed Successfully!</h2>
          <p className='text-gray-500 max-w-md mb-8 text-lg'>Your order has been received and is being prepared. You can track its status in your profile.</p>
          <div className='flex gap-4'>
            <button 
                onClick={() => navigate('/my-orders')}
                className='bg-gray-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-all hover:-translate-y-1'
            >
                View Orders
            </button>
            <button 
                onClick={() => navigate('/')}
                className='bg-white text-gray-900 border border-gray-200 px-8 py-3 rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-all hover:-translate-y-1'
            >
                Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 font-sans text-gray-800 pb-20'>
      <Navbar />
      
      <main className='max-w-7xl mx-auto p-4 md:p-8 lg:p-12'>
        <div className='flex flex-col lg:flex-row gap-12'>
          
          {/* Left Side: Order Summary */}
          <div className='flex-1 space-y-8'>
            <div className='bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 overflow-hidden'>
              <div className='p-6 border-b border-gray-50 flex items-center justify-between'>
                <h2 className='text-2xl font-black text-gray-900 flex items-center gap-2'>
                  <IoReceiptOutline className='text-green-500' /> Order Summary
                </h2>
                <span className='px-3 py-1 bg-gray-100 rounded-full text-xs font-black text-gray-500'>{totalQuantity} ITEMS</span>
              </div>
              
              <div className='divide-y divide-gray-50'>
                {items.map(item => (
                  <div key={item.cartKey} className='p-6 flex items-center gap-6 group'>
                    <div className='w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden shrink-0'>
                      <img src={item.image} alt={item.name} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        <h4 className='font-bold text-gray-900'>{item.name}</h4>
                        {item.weight && (
                          <span className='text-[10px] font-black text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 uppercase'>
                            {item.weight}
                          </span>
                        )}
                      </div>
                      <p className='text-green-600 font-black'>₹{item.price}</p>
                    </div>
                    <div className='flex items-center gap-4'>
                      <div className='flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-100'>
                        <button 
                          onClick={() => item.quantity > 1 ? dispatch(updateQuantity({ cartKey: item.cartKey, quantity: item.quantity - 1 })) : dispatch(removeFromCart(item.cartKey))}
                          className='w-8 h-8 flex items-center justify-center bg-white text-gray-600 rounded-lg hover:text-red-500 transition-colors shadow-xs'
                        >
                          {item.quantity === 1 ? <FiTrash2 size={16} /> : <FiMinus size={16} />}
                        </button>
                        <span className='w-8 text-center font-black text-lg'>{item.quantity}</span>
                        <button 
                          onClick={() => dispatch(updateQuantity({ cartKey: item.cartKey, quantity: item.quantity + 1 }))}
                          className='w-8 h-8 flex items-center justify-center bg-white text-gray-600 rounded-lg hover:text-green-600 transition-colors shadow-xs'
                        >
                          <FiPlus size={16} />
                        </button>
                      </div>
                      <p className='font-black text-gray-900 w-20 text-right'>₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {items.length === 0 && (
                <div className='p-12 text-center'>
                  <div className='w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <FiShoppingBag className='text-3xl text-gray-300' />
                  </div>
                  <p className='text-gray-400 font-medium'>Your cart is empty</p>
                  <button onClick={() => navigate('/')} className='mt-4 text-green-600 font-black'>Go Shopping</button>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Delivery Details & Payment */}
          <div className='w-full lg:w-[450px] space-y-6'>
            <div className='bg-white rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.05)] border border-gray-100 p-8'>
              <h2 className='text-2xl font-black text-gray-900 mb-6'>Delivery Details</h2>
              
              <form onSubmit={handlePlaceOrder} className='space-y-6'>
                {/* Delivery Type Toggle */}
                <div className='flex p-1 bg-gray-100 rounded-2xl mb-6'>
                    <button 
                        type='button'
                        onClick={() => setDeliveryType('Delivery')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black transition-all ${deliveryType === 'Delivery' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <FiTruck /> Delivery
                    </button>
                    <button 
                        type='button'
                        onClick={() => setDeliveryType('Self-Pickup')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black transition-all ${deliveryType === 'Self-Pickup' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <FiShoppingBag /> Self-Pickup
                    </button>
                </div>

                <div className='pt-2'>
                  <div className='flex items-center gap-3 mb-4'>
                      <input 
                          type='checkbox' 
                          id='schedule'
                          checked={isScheduled}
                          onChange={(e) => setIsScheduled(e.target.checked)}
                          className='w-5 h-5 accent-green-600'
                      />
                      <label htmlFor='schedule' className='text-sm font-black text-gray-700 cursor-pointer'>Schedule for later?</label>
                  </div>

                  {isScheduled && (
                      <div className='grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300 mb-6'>
                          <div>
                              <label className='block text-[10px] font-black text-gray-400 mb-1 uppercase tracking-widest'>Date</label>
                              <input 
                                  type='date'
                                  required={isScheduled}
                                  value={scheduledDate}
                                  onChange={(e) => setScheduledDate(e.target.value)}
                                  min={new Date().toISOString().split('T')[0]}
                                  className='w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 outline-none'
                              />
                          </div>
                          <div>
                              <label className='block text-[10px] font-black text-gray-400 mb-1 uppercase tracking-widest'>Time</label>
                              <input 
                                  type='time'
                                  required={isScheduled}
                                  value={scheduledTime}
                                  onChange={(e) => setScheduledTime(e.target.value)}
                                  className='w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 outline-none'
                              />
                          </div>
                      </div>
                  )}
                </div>

                <div className={`grid ${deliveryType === 'Delivery' ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
                  {deliveryType === 'Delivery' && (
                    <div className='col-span-2'>
                        <label className='block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest'>Full Delivery Address</label>
                        <div className='relative'>
                            <div className='absolute top-3 left-4 text-gray-400'><FiMapPin /></div>
                            <textarea 
                                required={deliveryType === 'Delivery'}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder='House No, Area, Landmark'
                                className='w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none text-sm h-24 resize-none'
                            />
                        </div>
                    </div>
                  )}
                  
                  <div>
                    <label className='block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest'>Phone Number</label>
                    <div className='relative'>
                        <div className='absolute top-3.5 left-4 text-gray-400'><FiPhone /></div>
                        <input 
                            type='tel'
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder='10-digit mobile'
                            className='w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none text-sm'
                        />
                    </div>
                  </div>

                  {deliveryType === 'Delivery' && (
                    <div>
                        <label className='block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest'>Pincode</label>
                        <div className='relative'>
                            <div className='absolute top-3.5 left-4 text-gray-400'><IoLocationOutline /></div>
                            <input 
                                type='text'
                                required={deliveryType === 'Delivery'}
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                placeholder='6-digit code'
                                className='w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none text-sm'
                            />
                        </div>
                    </div>
                  )}
                </div>

                <div className='pt-6 border-t border-gray-50 space-y-3'>
                  <div className='flex justify-between text-gray-500 font-medium'>
                    <span>Subtotal</span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div className='flex justify-between text-gray-500 font-medium'>
                    <span>Delivery Fee</span>
                    <span className='text-green-600 font-black'>{deliveryType === 'Self-Pickup' ? 'FREE' : '₹0 (Promo)'}</span>
                  </div>
                  <div className='flex justify-between text-2xl font-black text-gray-900 pt-2'>
                    <span>Total</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>

                <button 
                  type='submit'
                  disabled={loading || items.length === 0}
                  className='w-full bg-linear-to-r from-gray-900 to-gray-800 text-white py-5 rounded-3xl font-black text-xl shadow-2xl hover:shadow-gray-300 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-4'
                >
                  {loading ? <FiLoader className='animate-spin mx-auto' /> : `Place Order • ₹${totalAmount}`}
                </button>
                <p className='text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest'>Secure Checkout Powered by Pickify</p>
              </form>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default CheckoutPage
