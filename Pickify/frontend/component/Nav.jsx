import React, { useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch, IoIosAdd, IoIosList } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { MdCurrencyRupee } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../src/config';
import { setUser, setSearchTerm } from '../src/redux/userSlice';

const Navbar = () => {
    const { userData, city } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [showInfo, setShowInfo] = useState(false)
    const { totalQuantity } = useSelector(state => state.cart)
    const { searchTerm } = useSelector(state => state.auth)
    const displayCity = city || "Select Location"
    const dispatch = useDispatch()
    const isOwner = userData?.role?.toLowerCase() === 'owner'
    const orderCount = 0

    const handleLogout = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true })
            dispatch(setUser(null))
            navigate("/signin")
        } catch (error) {
            console.log(error)
        }
    }

    /* ── Avatar / Profile dropdown (shared) ── */
    const ProfileAvatar = () => (
        <div className='relative'>
            <div
                onClick={() => setShowInfo(!showInfo)}
                className='w-9 h-9 md:w-10 md:h-10 rounded-full bg-linear-to-tr from-green-500 to-emerald-400 text-white flex items-center justify-center font-bold shadow-sm cursor-pointer hover:scale-105 transition-transform border-2 border-white ring-1 ring-green-100 text-sm md:text-base'
            >
                {userData?.fullName ? userData.fullName.slice(0, 2).toUpperCase() : "U"}
            </div>

            {showInfo && (
                <div className='absolute top-full right-0 mt-3 bg-white shadow-xl border border-gray-100 rounded-xl py-3 px-1 w-48 flex flex-col z-50 overflow-hidden'>
                    <div className='px-4 pb-2 mb-2 border-b border-gray-100 flex flex-col'>
                        <span className='font-bold text-gray-800 truncate'>{userData?.fullName || 'My Account'}</span>
                        <span className='text-xs text-gray-400 capitalize'>{userData?.role || 'User'}</span>
                    </div>
                    <button
                        className='w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer'
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    )

    return (
        <nav className='w-full bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] sticky top-0 z-50'>
            <div className='flex px-4 py-4 md:px-6 items-center justify-between gap-4'>

                {/* ── Logo ── */}
                <h1
                    onClick={() => navigate('/')}
                    className='text-3xl font-black bg-linear-to-r from-green-600 to-green-500 bg-clip-text text-transparent tracking-tight cursor-pointer hover:opacity-90 transition-opacity shrink-0'
                >
                    Pickify
                </h1>

                {/* ── OWNER: center spacer so buttons push right ── */}
                {isOwner && <div className='flex-1' />}

                {/* ── USER: Desktop search bar ── */}
                {!isOwner && (
                    <div className='hidden md:flex flex-1 justify-center'>
                        <div className='flex w-full max-w-3xl items-center overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_2px_8px_rgb(0_0_0/8%)] transition-all duration-300 hover:shadow-[0_4px_16px_rgb(0_0_0/12%)]'>
                            <div className='flex w-[40%] min-w-35 items-center gap-2 px-3 py-3.5 cursor-pointer hover:bg-gray-50 md:px-4'>
                                <FaLocationDot className='text-xl text-[#ff5200] shrink-0' />
                                <span className='font-normal text-gray-600 text-sm md:text-base truncate pt-0.5 w-full'>{displayCity}</span>
                            </div>
                            <div className='h-6 w-px bg-gray-200 shrink-0'></div>
                            <div className='flex items-center gap-2 flex-1 bg-white px-3 py-3 focus-within:bg-gray-50 transition-colors min-w-0 md:gap-3 md:px-4'>
                                <IoIosSearch className='text-xl md:text-[22px] text-gray-400 shrink-0' />
                                <input
                                    type='text'
                                    value={searchTerm}
                                    onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                                    placeholder='Search products or stores...'
                                    className='w-full bg-transparent outline-none text-sm md:text-base text-gray-800 placeholder-gray-400 truncate'
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Right side icons ── */}
                <div className='flex items-center gap-3 md:gap-4'>

                    {/* OWNER: Add Item + My Orders buttons */}
                    {isOwner && (
                        <>
                            {/* My Orders with badge */}
                            <div className='relative hidden md:block'>
                                <button
                                    className='flex items-center justify-center gap-2 border border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-50 hover:scale-105 transition-all'
                                    onClick={() => navigate('/my-orders')}
                                >
                                    <MdCurrencyRupee className='text-xl md:text-[22px] text-gray-600 shrink-0' />
                                    <span>My Orders</span>
                                </button>
                                <span className='absolute -top-2 -right-2 bg-[#ff5200] text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-sm border-2 border-white z-10'>
                                        {orderCount > 99 ? '99+' : orderCount}
                                    </span>
                            </div>
                            <button
                                className='hidden md:flex items-center justify-center gap-2 bg-linear-to-r from-green-500 to-emerald-400 text-white px-4 py-2 rounded-xl font-bold hover:scale-105 transition-all shadow-sm'
                                onClick={() => navigate('/owner/add-item')}
                            >
                                <IoIosAdd className='text-xl md:text-[22px] text-white shrink-0' />
                                <span>Add Item</span>
                            </button>
                        </>
                    )}

                    {/* USER: My Orders button (desktop) */}
                    {!isOwner && (
                        <button
                            className='hidden md:flex items-center justify-center gap-2 border border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-50 hover:scale-105 transition-all'
                            onClick={() => navigate('/my-orders')}
                        >
                            <IoIosList className='text-xl md:text-[22px] text-gray-600 shrink-0' />
                            <span>My Orders</span>
                        </button>
                    )}

                    {/* USER: Cart (desktop + mobile) */}
                    {!isOwner && (
                        <div 
                            onClick={() => navigate('/checkout')}
                            className='relative mt-1 cursor-pointer transition-transform hover:scale-110'
                        >
                            <FiShoppingCart className='text-[24px] md:text-[26px] text-gray-700' />
                            {totalQuantity > 0 && (
                                <span className='absolute -top-1.5 -right-2 bg-[#ff5200] text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full shadow-sm border border-white animate-pulse'>
                                    {totalQuantity}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Avatar (all roles, always visible) */}
                    <ProfileAvatar />
                </div>
            </div>

            {/* ── USER: Mobile search bar + My Orders icon ── */}
            {!isOwner && (
                <div className='flex w-full items-center gap-3 px-4 pb-4 md:hidden'>
                    <div className='flex w-full items-center overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_2px_8px_rgb(0_0_0/8%)] transition-all duration-300 hover:shadow-[0_4px_16px_rgb(0_0_0/12%)]'>
                        <div className='flex w-[40%] min-w-30 items-center gap-2 px-3 py-3.5 cursor-pointer hover:bg-gray-50'>
                            <FaLocationDot className='text-xl text-[#ff5200] shrink-0' />
                            <span className='font-normal text-gray-600 text-sm truncate pt-0.5 w-full'>{displayCity}</span>
                        </div>
                        <div className='h-6 w-px bg-gray-200 shrink-0'></div>
                        <div className='flex items-center gap-2 flex-1 bg-white px-3 py-3 focus-within:bg-gray-50 transition-colors min-w-0'>
                            <IoIosSearch className='text-xl text-gray-400 shrink-0' />
                            <input
                                type='text'
                                value={searchTerm}
                                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                                placeholder='Search products or stores...'
                                className='w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400 truncate'
                            />
                        </div>
                    </div>
                    {/* My Orders icon-only button on mobile */}
                    <button
                        className='flex items-center justify-center shrink-0 border border-gray-200 text-gray-700 px-3 py-3.5 rounded-xl hover:bg-gray-50 transition-all'
                        onClick={() => navigate('/my-orders')}
                    >
                        <IoIosList className='text-xl text-gray-600' />
                    </button>
                </div>
            )}

            {/* ── OWNER: Mobile My Orders + Add Item buttons ── */}
            {isOwner && (
                <div className='flex w-full gap-3 px-4 pb-4 md:hidden'>
                        <div className='relative flex-1'>
                            <button
                                className='flex w-full items-center justify-center gap-2 border border-gray-200 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all'
                                onClick={() => navigate('/my-orders')}
                            >
                                <MdCurrencyRupee className='text-xl text-gray-600 shrink-0' />
                                <span>My Orders</span>
                            </button>
                            <span className='absolute -top-2 -right-2 bg-[#ff5200] text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-sm border-2 border-white z-10'>
                                    {orderCount > 99 ? '99+' : orderCount}
                                </span>
                        </div>
                    <button
                        className='flex flex-1 items-center justify-center gap-2 bg-linear-to-r from-green-500 to-emerald-400 text-white px-4 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-sm'
                        onClick={() => navigate('/owner/add-item')}
                    >
                        <IoIosAdd className='text-xl text-white shrink-0' />
                        <span>Add Item</span>
                    </button>
                </div>
            )}
        </nav>
    )
}

export default Navbar