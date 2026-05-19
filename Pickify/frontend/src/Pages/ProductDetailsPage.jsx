import React, { useEffect, useState } from 'react'
import Navbar from '../../component/Nav'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../config'
import { addToCart } from '../redux/cartSlice'
import { IoShieldCheckmarkOutline, IoTimeOutline, IoBagAddOutline, IoArrowBack, IoCheckmarkCircle } from 'react-icons/io5'
import { FiLoader, FiMinus, FiPlus, FiCheck } from 'react-icons/fi'

const ProductDetailsPage = () => {
    const { itemId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { items: cartItems } = useSelector(state => state.cart)
    
    const [item, setItem] = useState(null)
    const [shop, setShop] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const [added, setAdded] = useState(false)
    const [selectedVariant, setSelectedVariant] = useState(null)

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await axios.get(`${serverUrl}/api/item/${itemId}`)
                setItem(response.data.item)
                setShop(response.data.shop)
                // If the item has variants, default to the first one or the main item
                if (response.data.item.variants && response.data.item.variants.length > 0) {
                    // We don't necessarily select one by default, or we can select the "Main" item
                    // Let's default to the main item (which has the base price/weight)
                }
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchItemDetails()
    }, [itemId])

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            dispatch(addToCart({ 
                item, 
                shopId: item.shop,
                selectedVariant: selectedVariant
            }))
        }
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    if (loading) return (
        <div className='min-h-screen bg-white flex flex-col'>
            <Navbar />
            <div className='flex-1 flex items-center justify-center'>
                <FiLoader className='text-green-500 text-4xl animate-spin' />
            </div>
        </div>
    )

    if (!item) return (
        <div className='min-h-screen bg-white flex flex-col text-center pt-20'>
            <Navbar />
            <h2 className='text-2xl font-bold'>Product not found</h2>
            <button onClick={() => navigate(-1)} className='text-green-600 mt-4 font-bold'>Go Back</button>
        </div>
    )

    const currentPrice = selectedVariant 
        ? (selectedVariant.discountPrice > 0 ? selectedVariant.discountPrice : selectedVariant.price)
        : (item.discountPrice > 0 ? item.discountPrice : item.price);

    const originalPrice = selectedVariant ? selectedVariant.price : item.price;
    const currentWeight = selectedVariant ? selectedVariant.weight : item.weight;

    return (
        <div className='min-h-screen bg-white font-sans text-gray-800 pb-20'>
            <Navbar />
            
            <div className='max-w-6xl mx-auto p-6 md:p-12'>
                <button 
                    onClick={() => navigate(-1)} 
                    className='mb-8 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-bold group'
                >
                    <IoArrowBack className='group-hover:-translate-x-1 transition-transform' /> Back
                </button>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start'>
                    {/* Image Section */}
                    <div className='relative group'>
                        <div className='aspect-square rounded-3xl bg-gray-50 overflow-hidden shadow-2xl border border-gray-100 flex items-center justify-center p-8 group-hover:shadow-[0_40px_80px_-15px_rgba(34,197,94,0.2)] transition-all duration-500'>
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className='w-full h-full object-contain transition-transform duration-700 group-hover:scale-110' 
                            />
                        </div>
                        {(item.discountPrice > 0 || (selectedVariant && selectedVariant.discountPrice > 0)) && (
                            <div className='absolute top-6 left-6 bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-black shadow-lg'>
                                SAVE ₹{originalPrice - currentPrice}
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className='space-y-8'>
                        <div>
                            <div className='flex items-center gap-3 mb-4'>
                                <span className='px-3 py-1 bg-green-50 text-green-600 text-xs font-black uppercase tracking-widest rounded-lg border border-green-100'>
                                    {item.category}
                                </span>
                                {(selectedVariant ? selectedVariant.inStock : item.inStock) ? (
                                    <span className='text-xs font-bold text-green-500 flex items-center gap-1'>
                                        <FiCheck /> In Stock
                                    </span>
                                ) : (
                                    <span className='text-xs font-bold text-red-500'>Out of Stock</span>
                                )}
                            </div>
                            <h1 className='text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-2'>
                                {item.name}
                            </h1>
                            {currentWeight && (
                                <p className='text-xl font-bold text-gray-400'>{currentWeight}</p>
                            )}
                        </div>

                        <div className='flex items-center gap-4'>
                            <span className='text-4xl font-black text-gray-900'>₹{currentPrice}</span>
                            {originalPrice > currentPrice && (
                                <>
                                    <span className='text-xl text-gray-300 line-through font-bold'>₹{originalPrice}</span>
                                    <span className='text-green-600 font-black bg-green-50 px-2 py-1 rounded-lg text-sm uppercase'>
                                        {Math.round(((originalPrice - currentPrice) / originalPrice) * 100)}% OFF
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Variant Selection */}
                        {item.variants && item.variants.length > 0 && (
                            <div className='space-y-4'>
                                <h3 className='text-sm font-black uppercase tracking-widest text-gray-400'>Select Option</h3>
                                <div className='grid grid-cols-2 gap-3'>
                                    <button 
                                        onClick={() => setSelectedVariant(null)}
                                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-start gap-1 relative overflow-hidden ${!selectedVariant ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-gray-200'}`}
                                    >
                                        <span className='font-black text-gray-900'>{item.weight || 'Default'}</span>
                                        <span className='text-sm font-bold text-gray-500'>₹{item.discountPrice || item.price}</span>
                                        {!selectedVariant && <IoCheckmarkCircle className='absolute top-2 right-2 text-green-500 text-xl' />}
                                    </button>
                                    {item.variants.map((v, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => setSelectedVariant(v)}
                                            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-start gap-1 relative overflow-hidden ${selectedVariant === v ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-gray-200'}`}
                                        >
                                            <span className='font-black text-gray-900'>{v.weight}</span>
                                            <span className='text-sm font-bold text-gray-500'>₹{v.discountPrice || v.price}</span>
                                            {selectedVariant === v && <IoCheckmarkCircle className='absolute top-2 right-2 text-green-500 text-xl' />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className='h-px bg-gray-100'></div>

                        <div className='space-y-4'>
                            <h3 className='text-sm font-black uppercase tracking-widest text-gray-400'>About this product</h3>
                            <p className='text-gray-600 leading-relaxed text-lg'>
                                {item.description}
                            </p>
                        </div>

                        {/* Quantity and Add to Cart */}
                        <div className='pt-8 space-y-6'>
                            <div className='flex items-center gap-8'>
                                <div className='flex items-center gap-1 bg-gray-50 border border-gray-100 p-1.5 rounded-2xl shadow-sm'>
                                    <button 
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className='w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-gray-500 hover:text-gray-900'
                                    >
                                        <FiMinus />
                                    </button>
                                    <span className='w-12 text-center font-black text-xl'>{quantity}</span>
                                    <button 
                                        onClick={() => setQuantity(quantity + 1)}
                                        className='w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-gray-500 hover:text-gray-900'
                                    >
                                        <FiPlus />
                                    </button>
                                </div>
                                <div className='text-gray-400 font-bold'>
                                    Total: <span className='text-gray-900'>₹{currentPrice * quantity}</span>
                                </div>
                            </div>

                            <button 
                                onClick={handleAddToCart}
                                disabled={!(selectedVariant ? selectedVariant.inStock : item.inStock)}
                                className={`w-full py-5 rounded-3xl font-black text-xl flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl ${
                                    added 
                                    ? 'bg-green-100 text-green-600 border-2 border-green-200' 
                                    : 'bg-linear-to-r from-green-500 to-emerald-600 text-white hover:shadow-green-200 hover:-translate-y-1'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {added ? <><FiCheck className='text-2xl' /> Added to Cart</> : <><IoBagAddOutline className='text-2xl' /> Add to Cart</>}
                            </button>
                        </div>

                        {/* Benefits Icons */}
                        <div className='grid grid-cols-2 gap-6 pt-10'>
                            <div className='flex items-center gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-100'>
                                <IoShieldCheckmarkOutline className='text-3xl text-blue-500' />
                                <div>
                                    <p className='text-[10px] font-black text-blue-400 uppercase tracking-widest'>Quality</p>
                                    <p className='font-bold text-blue-900 text-sm'>100% Original</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-3 p-4 rounded-2xl bg-orange-50 border border-orange-100'>
                                <IoTimeOutline className='text-3xl text-orange-500' />
                                <div>
                                    <p className='text-[10px] font-black text-orange-400 uppercase tracking-widest'>Delivery</p>
                                    <p className='font-bold text-orange-900 text-sm'>Instant Pickup</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailsPage
