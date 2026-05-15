import React, { useState, useEffect } from 'react'
import Navbar from '../../component/Nav'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../config'
import { setMyShopData } from '../redux/OwnerSlice'
import { IoImageOutline, IoLocationOutline, IoBusinessOutline } from 'react-icons/io5'
import { FiLoader, FiCheck } from 'react-icons/fi'
import useCurrentLocation from '../hooks/useCurrentLocation'

const CreateEditShopPage = () => {
    const { userData } = useSelector(state => state.auth)
    const { myShop } = useSelector(state => state.owner)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { fetchLocation } = useCurrentLocation()

    const [formData, setFormData] = useState({
        name: '',
        pincode: '',
        city: '',
        state: '',
        address: ''
    })
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!userData || userData.role?.toLowerCase() !== 'owner') {
            navigate('/')
        }
        if (myShop) {
            // Edit mode — pre-fill with existing shop data
            setFormData({
                name: myShop.name || '',
                pincode: myShop.pincode || '',
                city: myShop.city || '',
                state: myShop.state || '',
                address: myShop.address || ''
            })
            if (myShop.image) {
                setImagePreview(myShop.image)
            }
        } else {
            // Create mode — auto-fill from GPS
            fetchLocation().then(locationData => {
                setFormData(prev => ({
                    ...prev,
                    address: locationData.address,
                    pincode: locationData.pincode,
                    city:    locationData.city,
                    state:   locationData.state,
                }))
            }).catch(() => {
                // user denied location — leave fields empty
            })
        }
    }, [userData, myShop, navigate])

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Auto-fetch city and state if pincode is 6 digits
        if (name === 'pincode' && value.length === 6) {
            try {
                const response = await axios.get(`https://api.postalpincode.in/pincode/${value}`);
                if (response.data && response.data[0].Status === 'Success') {
                    const locationData = response.data[0].PostOffice[0];
                    setFormData(prev => ({
                        ...prev,
                        city: locationData.District,
                        state: locationData.State
                    }));
                }
            } catch (error) {
                console.log("Error fetching pincode details", error);
            }
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const data = new FormData()
        data.append('name', formData.name)
        data.append('pincode', formData.pincode)
        data.append('city', formData.city)
        data.append('state', formData.state)
        data.append('address', formData.address)
        if (image) {
            data.append('image', image)
        }

        try {
            const response = await axios.post(`${serverUrl}/api/shop/create-and-update`, data, {
                withCredentials: true
            })
            
            if (response.data.shop) {
                dispatch(setMyShopData(response.data.shop))
                navigate('/owner')
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-linear-to-br from-green-50 to-emerald-50 font-sans text-gray-800'>
            <Navbar />
            
            <main className='max-w-4xl mx-auto p-4 md:p-8 mt-4'>
                <div className='bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden'>
                    {/* Header */}
                    <div className='bg-linear-to-r from-gray-900 to-gray-800 p-8 md:p-10 text-white'>
                        <h2 className='text-3xl font-extrabold tracking-tight'>
                            {myShop ? 'Edit Shop Details' : 'Set Up Your Shop'}
                        </h2>
                        <p className='text-gray-300 mt-2 text-lg'>
                            Provide your shop details so customers can find you easily.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className='p-8 md:p-10 space-y-8'>
                        {error && (
                            <div className='bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 font-medium'>
                                {error}
                            </div>
                        )}

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                            {/* Image Upload Area */}
                            <div className='col-span-1 md:col-span-2 flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group relative overflow-hidden'>
                                <input 
                                    type='file' 
                                    accept='image/*' 
                                    onChange={handleImageChange}
                                    className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10'
                                />
                                {imagePreview ? (
                                    <div className='relative w-full max-w-sm h-48 rounded-xl overflow-hidden shadow-sm'>
                                        <img src={imagePreview} alt='Shop preview' className='w-full h-full object-cover' />
                                        <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                                            <span className='text-white font-semibold flex items-center gap-2'><IoImageOutline className='text-xl'/> Change Image</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='text-center'>
                                        <div className='w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto mb-4 text-green-500'>
                                            <IoImageOutline className='text-3xl' />
                                        </div>
                                        <h3 className='font-bold text-gray-700 text-lg'>Upload Shop Image</h3>
                                        <p className='text-gray-400 text-sm mt-1'>High-quality images attract more customers</p>
                                    </div>
                                )}
                            </div>

                            {/* Form Fields */}
                            <div className='col-span-1 md:col-span-2'>
                                <label className='block text-sm font-bold text-gray-700 mb-2'>Shop Name</label>
                                <div className='relative'>
                                    <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                                        <IoBusinessOutline className='text-gray-400 text-lg' />
                                    </div>
                                    <input 
                                        type='text' 
                                        name='name'
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder='e.g., The Daily Mart'
                                        className='block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all outline-none text-gray-800' 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className='block text-sm font-bold text-gray-700 mb-2'>Pincode</label>
                                <input 
                                    type='text' 
                                    name='pincode'
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    maxLength="6"
                                    required
                                    placeholder='e.g., 400001 (Auto-fills City/State)'
                                    className='block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all outline-none text-gray-800' 
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-bold text-gray-700 mb-2'>City</label>
                                <input 
                                    type='text' 
                                    name='city'
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    placeholder='e.g., Mumbai'
                                    className='block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all outline-none text-gray-800' 
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-bold text-gray-700 mb-2'>State</label>
                                <input 
                                    type='text' 
                                    name='state'
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                    placeholder='e.g., Maharashtra'
                                    className='block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all outline-none text-gray-800' 
                                />
                            </div>

                            <div className='col-span-1 md:col-span-2'>
                                <label className='block text-sm font-bold text-gray-700 mb-2'>Complete Address</label>
                                <div className='relative'>
                                    <div className='absolute top-3.5 left-0 pl-4 flex items-start pointer-events-none'>
                                        <IoLocationOutline className='text-gray-400 text-lg' />
                                    </div>
                                    <textarea 
                                        name='address'
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        rows='3'
                                        placeholder='Full street address, landmark, pin code...'
                                        className='block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all outline-none text-gray-800 resize-none' 
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className='pt-4 flex justify-end gap-4 border-t border-gray-100'>
                            <button 
                                type='button'
                                onClick={() => navigate('/owner')}
                                className='px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors'
                            >
                                Cancel
                            </button>
                            <button 
                                type='submit' 
                                disabled={loading || (!image && !myShop)}
                                className='flex items-center gap-2 bg-linear-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                            >
                                {loading ? (
                                    <><FiLoader className='animate-spin text-xl' /> Saving...</>
                                ) : (
                                    <><FiCheck className='text-xl' /> Save Shop</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default CreateEditShopPage