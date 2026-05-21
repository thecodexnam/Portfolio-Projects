import React, { useState, useEffect } from 'react'
import Navbar from '../../component/Nav'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../config'
import { masterItems } from '../data/masterItems'
import { IoImageOutline, IoCubeOutline, IoPricetagOutline, IoDocumentTextOutline, IoListOutline, IoSearchOutline, IoSparklesOutline, IoTrashOutline } from 'react-icons/io5'
import { FiLoader, FiCheck, FiPlusCircle, FiEdit3, FiArrowRight, FiPlus } from 'react-icons/fi'

const categories = [
    "Snacks", "Biscuits", "Chips", "Noodles", "Chocolate", "Candies", "Cookies", "Namkeen", "Other Snacks", 
    "Beverages", "Dairy", "Bakery", "Cold Drinks", "Juices", "Other Beverages", "Ice Creams", "Other Dairy", 
    "Other Bakery", "Grains", "Pulses", "Spices", "Oils", "Vegetables", "Other"
];

const AddItemPage = () => {
    const { userData } = useSelector(state => state.auth)
    const { myShop } = useSelector(state => state.owner)
    const navigate = useNavigate()
    const { itemId } = useParams()
    const isEditMode = !!itemId

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        discountPrice: '',
        description: '',
        weight: '',
        foodType: 'veg',
        inStock: true
    })
    const [variants, setVariants] = useState([])
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [catalogUrl, setCatalogUrl] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    
    // Catalog Search State
    const [searchTerm, setSearchTerm] = useState('')
    const [showCatalog, setShowCatalog] = useState(false)

    useEffect(() => {
        if (!userData || userData.role?.toLowerCase() !== 'owner') {
            navigate('/')
        }

        if (isEditMode && myShop?.items) {
            const itemToEdit = myShop.items.find(item => item._id === itemId)
            if (itemToEdit) {
                setFormData({
                    name: itemToEdit.name || '',
                    category: itemToEdit.category || '',
                    price: itemToEdit.price || '',
                    discountPrice: itemToEdit.discountPrice || '',
                    description: itemToEdit.description || '',
                    weight: itemToEdit.weight || '',
                    foodType: itemToEdit.foodType || 'veg',
                    inStock: itemToEdit.inStock !== false
                })
                setVariants(itemToEdit.variants || [])
                setImagePreview(itemToEdit.image)
            }
        }
    }, [userData, navigate, isEditMode, itemId, myShop])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ 
            ...formData, 
            [name]: type === 'checkbox' ? checked : value 
        })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            setCatalogUrl(null)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const handleCatalogSelect = (item) => {
        setFormData({
            ...formData,
            name: item.name,
            price: item.defaultPrice,
            category: item.category,
            description: item.description,
            weight: item.weight
        })
        setImage(null)
        setCatalogUrl(item.imageUrl)
        setImagePreview(item.imageUrl)
        setSearchTerm('')
        setShowCatalog(false)
    }

    const addVariant = () => {
        setVariants([...variants, { weight: '', price: '', discountPrice: '', inStock: true }])
    }

    const removeVariant = (index) => {
        setVariants(variants.filter((_, i) => i !== index))
    }

    const handleVariantChange = (index, field, value) => {
        const updatedVariants = [...variants]
        updatedVariants[index][field] = value
        setVariants(updatedVariants)
    }

    const handleSubmit = async (e) => {
    e.preventDefault();

    const isImageMissing = !isEditMode && !image && !catalogUrl;

    if (isImageMissing) {
        setError("Product image is required.");
        return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
        const form = new FormData();

        // Add normal form fields
        Object.entries(formData).forEach(([key, value]) => {
            const finalValue = key === "discountPrice" && !value ? 0 : value;
            form.append(key, finalValue);
        });

        // Add variants
        form.append("variants", JSON.stringify(variants));

        // Add image or image URL
        if (image) {
            form.append("image", image);
        } else if (catalogUrl) {
            form.append("imageUrl", catalogUrl);
        }

        const apiMethod = isEditMode ? "put" : "post";

        const apiUrl = isEditMode
            ? `${serverUrl}/api/item/edit-item/${itemId}`
            : `${serverUrl}/api/item/add-item`;

        const response = await axios[apiMethod](apiUrl, form, {
            withCredentials: true,
        });

        if (response.data.item) {
            setSuccess(true);

            if (!isEditMode) {
                resetForm();
            }
        }
    } catch (error) {
        const message =
            error.response?.data?.message ||
            `Failed to ${isEditMode ? "edit" : "add"} product`;

        setError(message);
    } finally {
        setLoading(false);
    }
};

    const filteredCatalog = masterItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className='min-h-screen bg-linear-to-br from-green-50 to-emerald-50 font-sans text-gray-800'>
            <Navbar />
            
            <main className='max-w-4xl mx-auto p-4 md:p-8 mt-4'>
                <div className='bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden'>
                    {/* Header */}
                    <div className='bg-linear-to-r from-gray-900 to-gray-800 p-8 md:p-10 text-white'>
                        <h2 className='text-3xl font-extrabold tracking-tight flex items-center gap-3'>
                            {isEditMode ? <><FiEdit3 /> Edit Product</> : <><FiPlusCircle /> Add New Product</>}
                        </h2>
                        <p className='text-gray-300 mt-2 text-lg'>
                            {isEditMode ? 'Update the details, price, or stock status of this product.' : 'Expand your catalog. Use our Smart Search for instant product entry!'}
                        </p>
                    </div>

                    <div className='p-8 md:p-10 pb-0'>
                        {/* Smart Search Bar */}
                        {!isEditMode && (
                            <div className='relative mb-10'>
                                <label className='block text-sm font-black text-green-600 mb-3 uppercase tracking-widest flex items-center gap-2'>
                                    <IoSparklesOutline /> Smart Search from Catalog
                                </label>
                                <div className='relative group'>
                                    <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                                        <IoSearchOutline className='text-gray-400 text-xl group-focus-within:text-green-500 transition-colors' />
                                    </div>
                                    <input 
                                        type='text'
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value)
                                            setShowCatalog(true)
                                        }}
                                        onFocus={() => setShowCatalog(true)}
                                        placeholder='Search common items like "Milk", "Rice", "Sugar"...'
                                        className='block w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all outline-none text-lg font-medium shadow-sm'
                                    />
                                    {searchTerm && (
                                        <button 
                                            onClick={() => setSearchTerm('')}
                                            className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600'
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>

                                {showCatalog && searchTerm && (
                                    <div className='absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 max-h-[400px] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300'>
                                        {filteredCatalog.length > 0 ? (
                                            filteredCatalog.map((item, idx) => (
                                                <div 
                                                    key={idx}
                                                    onClick={() => handleCatalogSelect(item)}
                                                    className='p-4 hover:bg-green-50 cursor-pointer flex items-center gap-4 border-b border-gray-50 last:border-0 transition-colors'
                                                >
                                                    <img src={item.imageUrl} className='w-14 h-14 rounded-xl object-cover shadow-sm' alt={item.name} />
                                                    <div className='flex-1'>
                                                        <h4 className='font-bold text-gray-900'>{item.name}</h4>
                                                        <p className='text-xs text-gray-400 font-bold uppercase tracking-tighter'>{item.category}</p>
                                                    </div>
                                                    <div className='text-right'>
                                                        <p className='text-green-600 font-black'>₹{item.defaultPrice}</p>
                                                        <p className='text-[10px] text-gray-400 font-bold flex items-center gap-1 justify-end'>Auto-fill <FiArrowRight /></p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className='p-8 text-center text-gray-400'>
                                                <p>No matches in catalog. You can still enter manually below!</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                        <div className='h-px bg-linear-to-r from-transparent via-gray-100 to-transparent mb-4'></div>
                    </div>

                    <form onSubmit={handleSubmit} className='p-8 md:p-10 pt-4 space-y-8'>
                        {error && (
                            <div className='bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 font-medium'>
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className='bg-green-50 text-green-700 p-4 rounded-xl border border-green-100 font-medium flex items-center gap-2'>
                                <FiCheck className="text-xl" /> Product successfully {isEditMode ? 'updated' : 'added'}!
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
                                    <div 
                                        className='relative w-full max-w-sm h-64 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_30px_60px_-15px_rgba(34,197,94,0.4)]'
                                        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                                    >
                                        <img 
                                            src={imagePreview} 
                                            alt='Product preview' 
                                            className='w-full h-full object-cover transition-all duration-700 origin-center group-hover:scale-110 group-hover:rotate-1' 
                                        />
                                        <div className='absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none'></div>
                                        <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20'>
                                            <span className='text-white font-semibold flex items-center gap-2'><IoImageOutline className='text-xl'/> Change Image</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='text-center'>
                                        <div className='w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto mb-4 text-green-500'>
                                            <IoImageOutline className='text-3xl' />
                                        </div>
                                        <h3 className='font-bold text-gray-700 text-lg'>Upload Product Image</h3>
                                        <p className='text-gray-400 text-sm mt-1'>A great image increases sales!</p>
                                    </div>
                                )}
                            </div>

                            {/* Form Fields */}
                            <div className='col-span-1 md:col-span-2 flex flex-col md:flex-row gap-8 items-center justify-between'>
                                <div className='w-full'>
                                    <label className='block text-sm font-bold text-gray-700 mb-2'>Product Name</label>
                                    <div className='relative'>
                                        <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                                            <IoCubeOutline className='text-gray-400 text-lg' />
                                        </div>
                                        <input 
                                            type='text' 
                                            name='name'
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder='e.g., Farm Fresh Milk'
                                            className='block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all outline-none text-gray-800' 
                                        />
                                    </div>
                                </div>

                                <div className='w-full max-w-[200px]'>
                                    <label className='block text-sm font-bold text-gray-700 mb-2'>Weight/Unit</label>
                                    <div className='relative'>
                                        <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                                            <IoCubeOutline className='text-gray-400 text-lg opacity-50' />
                                        </div>
                                        <input 
                                            type='text' 
                                            name='weight'
                                            value={formData.weight}
                                            onChange={handleChange}
                                            placeholder='e.g., 1kg, 500g, 1L'
                                            className='block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all outline-none text-gray-800' 
                                        />
                                    </div>
                                </div>

                                <div className='w-full md:w-auto shrink-0 flex items-center justify-start md:justify-end mt-7'>
                                    <label className='flex items-center gap-3 cursor-pointer p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors'>
                                        <div className='relative'>
                                            <input 
                                                type='checkbox' 
                                                name='inStock'
                                                checked={formData.inStock}
                                                onChange={handleChange}
                                                className='sr-only peer' 
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                        </div>
                                        <span className='font-bold text-gray-700'>{formData.inStock ? 'In Stock' : 'Out of Stock'}</span>
                                    </label>
                                </div>
                            </div>

                            <div className='col-span-1 md:col-span-2'>
                                <label className='block text-sm font-bold text-gray-700 mb-2'>Category</label>
                                <div className='relative'>
                                    <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                                        <IoListOutline className='text-gray-400 text-lg' />
                                    </div>
                                    <select 
                                        name='category'
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className='block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all outline-none text-gray-800 appearance-none' 
                                    >
                                        <option value="" disabled>Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Food Type - Veg / Non-Veg selector */}
                            <div className='col-span-1 md:col-span-2'>
                                <label className='block text-sm font-bold text-gray-700 mb-3'>Food Type</label>
                                <div className='flex items-center gap-4'>

                                    {/* Veg button — uses classic green square symbol */}
                                    <button
                                        type='button'
                                        onClick={() => setFormData(prev => ({ ...prev, foodType: 'veg' }))}
                                        className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border-2 font-bold text-sm transition-all duration-200 ${
                                            formData.foodType !== 'nonveg'
                                                ? 'border-green-500 bg-green-50 text-green-700 shadow-sm'
                                                : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-green-300 hover:bg-green-50/50'
                                        }`}
                                    >
                                        <span style={{
                                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                            width: '20px', height: '20px',
                                            border: '2px solid #16a34a', borderRadius: '4px', flexShrink: 0
                                        }}>
                                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#16a34a' }} />
                                        </span>
                                        Veg
                                    </button>

                                    {/* Non-Veg button — uses classic red square symbol */}
                                    <button
                                        type='button'
                                        onClick={() => setFormData(prev => ({ ...prev, foodType: 'nonveg' }))}
                                        className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border-2 font-bold text-sm transition-all duration-200 ${
                                            formData.foodType === 'nonveg'
                                                ? 'border-red-500 bg-red-50 text-red-700 shadow-sm'
                                                : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-red-300 hover:bg-red-50/50'
                                        }`}
                                    >
                                        <span style={{
                                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                            width: '20px', height: '20px',
                                            border: '2px solid #dc2626', borderRadius: '4px', flexShrink: 0
                                        }}>
                                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#dc2626' }} />
                                        </span>
                                        Non-Veg
                                    </button>

                                </div>
                            </div>

                            <div>
                                <label className='block text-sm font-bold text-gray-700 mb-2'>Default Price (₹)</label>
                                <div className='relative'>
                                    <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                                        <IoPricetagOutline className='text-gray-400 text-lg' />
                                    </div>
                                    <input 
                                        type='number' 
                                        name='price'
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        step="1"
                                        placeholder='e.g., 65'
                                        className='block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all outline-none text-gray-800' 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className='block text-sm font-bold text-gray-700 mb-2'>Default Discount Price (₹)</label>
                                <div className='relative'>
                                    <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                                        <IoPricetagOutline className='text-gray-400 text-lg' />
                                    </div>
                                    <input 
                                        type='number' 
                                        name='discountPrice'
                                        value={formData.discountPrice}
                                        onChange={handleChange}
                                        min="0"
                                        step="1"
                                        placeholder='e.g., 55'
                                        className='block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all outline-none text-gray-800' 
                                    />
                                </div>
                            </div>

                            {/* Variants Section */}
                            <div className='col-span-1 md:col-span-2 border-t border-gray-100 pt-8'>
                                <div className='flex items-center justify-between mb-6'>
                                    <div>
                                        <h3 className='text-lg font-black text-gray-900'>Price & Weight Options</h3>
                                        <p className='text-sm text-gray-400 font-bold'>Add different sizes (e.g., 500g, 1kg, 5kg) for this product.</p>
                                    </div>
                                    <button 
                                        type='button' 
                                        onClick={addVariant}
                                        className='flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl font-black text-sm hover:bg-green-100 transition-colors'
                                    >
                                        <FiPlus /> Add Option
                                    </button>
                                </div>

                                <div className='space-y-4'>
                                    {variants.map((variant, idx) => (
                                        <div key={idx} className='grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 items-end animate-in fade-in slide-in-from-top-2 duration-300'>
                                            <div>
                                                <label className='block text-[10px] font-black text-gray-400 uppercase mb-1'>Weight</label>
                                                <input 
                                                    type='text' 
                                                    value={variant.weight}
                                                    onChange={(e) => handleVariantChange(idx, 'weight', e.target.value)}
                                                    placeholder='e.g., 500g'
                                                    className='w-full p-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500'
                                                />
                                            </div>
                                            <div>
                                                <label className='block text-[10px] font-black text-gray-400 uppercase mb-1'>Price</label>
                                                <input 
                                                    type='number' 
                                                    value={variant.price}
                                                    onChange={(e) => handleVariantChange(idx, 'price', e.target.value)}
                                                    placeholder='₹'
                                                    className='w-full p-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500'
                                                />
                                            </div>
                                            <div>
                                                <label className='block text-[10px] font-black text-gray-400 uppercase mb-1'>Discount Price</label>
                                                <input 
                                                    type='number' 
                                                    value={variant.discountPrice}
                                                    onChange={(e) => handleVariantChange(idx, 'discountPrice', e.target.value)}
                                                    placeholder='₹'
                                                    className='w-full p-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500'
                                                />
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <button 
                                                    type='button' 
                                                    onClick={() => removeVariant(idx)}
                                                    className='p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors flex-1 flex items-center justify-center gap-2 font-bold'
                                                >
                                                    <IoTrashOutline /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='col-span-1 md:col-span-2'>
                                <label className='block text-sm font-bold text-gray-700 mb-2'>Description</label>
                                <div className='relative'>
                                    <div className='absolute top-3.5 left-0 pl-4 flex items-start pointer-events-none'>
                                        <IoDocumentTextOutline className='text-gray-400 text-lg' />
                                    </div>
                                    <textarea 
                                        name='description'
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        rows='3'
                                        placeholder='Highlight key details...'
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
                                Back to Dashboard
                            </button>
                            <button 
                                type='submit' 
                                disabled={loading}
                                className='flex items-center gap-2 bg-linear-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                            >
                                {loading ? (
                                    <><FiLoader className='animate-spin text-xl' /> {isEditMode ? 'Saving...' : 'Adding...'}</>
                                ) : (
                                    <>{isEditMode ? <FiEdit3 className='text-xl' /> : <FiPlusCircle className='text-xl' />} {isEditMode ? 'Save Changes' : 'Add Product'}</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default AddItemPage
