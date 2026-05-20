import React, { useEffect, useState } from 'react'
import Navbar from '../../component/Nav'
import axios from 'axios'
import { serverUrl } from '../config'
import { FiShoppingBag, FiClock, FiMapPin, FiBox, FiLoader, FiChevronRight } from 'react-icons/fi'
import { IoCheckmarkCircle, IoCloseCircle, IoTime } from 'react-icons/io5'

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/order/user-orders`, {
          withCredentials: true
        })
        setOrders(response.data.orders)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-50 border-green-100';
      case 'Cancelled': return 'text-red-600 bg-red-50 border-red-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-50 border-yellow-100';
      default: return 'text-blue-600 bg-blue-50 border-blue-100';
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <IoCheckmarkCircle />;
      case 'Cancelled': return <IoCloseCircle />;
      case 'Pending': return <IoTime />;
      default: return <FiClock />;
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex flex-col'>
        <Navbar />
        <div className='flex-1 flex flex-col items-center justify-center'>
          <FiLoader className='text-green-500 text-4xl animate-spin mb-4' />
          <p className='text-gray-500 font-medium'>Fetching your orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800'>
      <Navbar />
      <main className='flex-1 max-w-4xl mx-auto w-full p-6 md:p-8'>
        <div className='flex items-center justify-between mb-8'>
            <h1 className='text-3xl font-black text-gray-900 tracking-tight'>Your Orders</h1>
            <span className='bg-white px-4 py-2 rounded-full text-sm font-bold text-gray-500 shadow-sm border border-gray-100'>{orders.length} Total Orders</span>
        </div>

        {orders.length === 0 ? (
          <div className='bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100'>
            <FiShoppingBag className='text-gray-200 text-7xl mx-auto mb-4' />
            <h2 className='text-2xl font-bold text-gray-800 mb-2'>No orders yet</h2>
            <p className='text-gray-500 mb-6'>When you place an order, it will appear here!</p>
          </div>
        ) : (
          <div className='space-y-6'>
            {orders.map(order => (
              <div key={order._id} className='bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
                <div className='p-6 border-b border-gray-50 flex flex-wrap items-center justify-between gap-4'>
                  <div className='flex items-center gap-4'>
                    <div className='w-14 h-14 bg-gray-100 rounded-2xl overflow-hidden'>
                        <img src={order.shop?.image} alt={order.shop?.name} className='w-full h-full object-cover' />
                    </div>
                    <div>
                        <h3 className='font-black text-xl text-gray-900'>{order.shop?.name}</h3>
                        <p className='text-xs text-gray-400 font-bold uppercase tracking-widest'>{new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-black uppercase tracking-wider ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)} {order.status}
                  </div>
                </div>

                <div className='p-6'>
                    <div className='space-y-3 mb-6'>
                        {order.items.map((item, idx) => (
                            <div key={idx} className='flex justify-between items-center text-sm'>
                                <p className='text-gray-600 font-medium'><span className='font-black text-gray-900'>{item.quantity}x</span> {item.name}</p>
                                <p className='text-gray-900 font-bold'>₹{item.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>
                    
                    <div className='flex flex-wrap items-center justify-between pt-6 border-t border-gray-50 gap-4'>
                        <div className='flex items-center gap-6'>
                            <div className='flex items-center gap-2 text-gray-400 text-sm'>
                                <FiMapPin /> <span className='font-bold line-clamp-1 max-w-[200px]'>{order.address}</span>
                            </div>
                            <div className='px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold text-gray-500 uppercase tracking-tighter'>
                                {order.deliveryType || 'Delivery'}
                            </div>
                            {order.scheduledDate && (
                                <div className='flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-100 rounded-lg text-xs font-bold text-orange-600 uppercase tracking-tighter'>
                                    <FiClock /> Scheduled: {new Date(order.scheduledDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} at {order.scheduledTime}
                                </div>
                            )}
                        </div>
                        <div className='flex items-center gap-4'>
                            <p className='text-gray-400 font-bold uppercase tracking-widest text-xs'>Total Paid</p>
                            <p className='text-2xl font-black text-green-600'>₹{order.totalAmount}</p>
                        </div>
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

export default MyOrdersPage
