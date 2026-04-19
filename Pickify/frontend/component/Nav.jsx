import React, { useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../src/config';
import { setUser } from '../src/redux/userSlice';

const Navbar = () => {
    const { userData, city } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [showInfo, setShowInfo] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const displayCity = city || "Select Location"
    const dispatch = useDispatch()
    const handleLogout = async()=>{
        try {
            const result = await axios.get(`${serverUrl}/api/auth/signout`,{
                withCredentials:true
            })
            dispatch(setUser(null))
            navigate("/signin")
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <nav className='w-full bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] px-4 md:px-6 py-4 flex flex-wrap justify-between items-center gap-y-4 sticky top-0 z-50'>

            {/* Logo */}
            <h1 className='text-3xl font-black bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent tracking-tight cursor-pointer hover:opacity-90 transition-opacity order-1'>
                Pickify
            </h1>

            {/* Search Bar */}
            <div className='flex items-center bg-white rounded-xl shadow-[0_2px_8px_rgb(0_0_0_/_8%)] border border-gray-100 overflow-hidden w-full md:w-auto md:flex-1 md:max-w-3xl md:mx-6 hover:shadow-[0_4px_16px_rgb(0_0_0_/_12%)] transition-all duration-300 order-3 md:order-2'>

                {/* Location Picker */}
                <div className='flex items-center gap-2 px-3 md:px-4 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors w-[40%] md:w-1/3 md:min-w-[150px]'>
                    <FaLocationDot className='text-xl text-[#ff5200] shrink-0' />
                    <span className='font-normal text-gray-600 text-sm md:text-base truncate pt-0.5 w-full'>{displayCity}</span>
                </div>

                {/* Divider Line */}
                <div className='h-6 w-[1.5px] bg-gray-200 shrink-0'></div>

                {/* Search Input */}
                <div className='flex items-center gap-2 md:gap-3 px-3 md:px-4 py-3 flex-1 bg-white focus-within:bg-gray-50 transition-colors min-w-0'>
                    <IoIosSearch className='text-xl md:text-[22px] text-gray-400 shrink-0' />
                    {showSearch && (
                        <div className='absolute top-full right-0 mt-3 bg-white shadow-xl border border-gray-100 rounded-xl py-3 px-1 w-[180px] flex flex-col z-50 overflow-hidden'>
                            {/* User Header */}
                            <div className='px-4 pb-2 mb-2 border-b border-gray-50 flex flex-col'>
                                <span className='font-bold text-gray-800 truncate'>{userData?.fullName || 'My Account'}</span>
                                <span className='text-xs text-gray-400 capitalize'>{userData?.role || 'User'}</span>
                            </div>

                            {/* Actions */}
                            <button className='w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer'>
                                Logout
                            </button>
                        </div>
                    )}
                    <input
                        type='text'
                        placeholder='Search products or stores...'
                        className='w-full bg-transparent outline-none text-sm md:text-base text-gray-800 placeholder-gray-400 truncate'
                    />
                </div>
            </div>

            {/* Right side tools (Cart & Profile) */}
            <div className='flex items-center justify-end gap-5 md:gap-6 order-2 md:order-3'>

                {/* Shopping Cart */}
                <div className='relative cursor-pointer hover:scale-110 transition-transform mt-1'>
                    <FiShoppingCart className='text-[24px] md:text-[26px] text-gray-700' />
                    {/* Cart Badge */}
                    <span className='absolute -top-1.5 -right-2 bg-[#ff5200] text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full shadow-sm border border-white'>
                        0
                    </span>
                </div>

                {/* Profile Controls */}
                <div className='relative'>
                    {/* Avatar Button */}
                    <div
                        onClick={() => setShowInfo(!showInfo)}
                        className='w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-green-500 to-emerald-400 text-white flex items-center justify-center font-bold shadow-sm cursor-pointer hover:scale-105 transition-transform border-2 border-white ring-1 ring-green-100 text-sm md:text-base'
                    >
                        {userData?.fullName ? userData.fullName.slice(0, 2).toUpperCase() : "U"}
                    </div>

                    {/* Profile Dropdown Popup */}
                    {showInfo && (
                        <div className='absolute top-full right-0 mt-3 bg-white shadow-xl border border-gray-100 rounded-xl py-3 px-1 w-[180px] flex flex-col z-50 overflow-hidden'>
                            {/* User Header */}
                            <div className='px-4 pb-2 mb-2 border-b border-gray-50 flex flex-col'>
                                <span className='font-bold text-gray-800 truncate'>{userData?.fullName || 'My Account'}</span>
                                <span className='text-xs text-gray-400 capitalize'>{userData?.role || 'User'}</span>
                            </div>

                            {/* Actions */}
                            <button className='w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer' onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </nav>
    )
}

export default Navbar