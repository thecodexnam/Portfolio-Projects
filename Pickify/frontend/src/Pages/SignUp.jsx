import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState('Customer')
  const navigate = useNavigate();
  const[fullName,setFullName] = useState("")
  const[email,setEmail] = useState("")
  const[phone,setPhone] = useState("")
  const[password,setPassword] = useState("")
  const[error,setError] = useState("")

  const handleGoogleSignIn = async () =>{
    if(!phone){
      setError("Mobile no is required before Google Sign-In");
      return;
    }
    
    const roleMap = {
      "Customer": "user",
      "Delivery Partner": "deliveryBoy",
      "Shop Owner": "owner"
    };

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth,provider)
      
      const {data} = await axios.post(`${serverUrl}/api/auth/google-auth`,{
        fullName: result.user.displayName,
        email: result.user.email,
        role: roleMap[selectedRole] || "user",
        mobile: phone
      },{withCredentials:true})
      
      console.log("Google Sign-In Success:", data);
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setError(error.response?.data?.message || "Google Sign-In failed");
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Map UI names to backend enum values
      const roleMap = {
        "Customer": "user",
        "Delivery Partner": "deliveryBoy",
        "Shop Owner": "owner"
      };

      const res = await axios.post(`${serverUrl}/api/auth/signup`, {
        fullName,
        email,
        password,
        mobile: phone,
        role: roleMap[selectedRole] || "user"
      }, {
        withCredentials: true
      })
      console.log(res.data)
      navigate("/signin")
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong. Please try again.');
      console.log(error)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-orange-50 via-white to-green-50'>
      {/* Decorative elements */}
      <div className='absolute top-0 left-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob'></div>
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>

      {/* Main card */}
      <div className='relative z-10 bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-100 backdrop-blur-sm'>

        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-black text-center bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent mb-2'>Pickify</h1>
          <p className='text-center text-gray-500 text-sm font-medium tracking-wide'>Create your account to get started with Pickify</p>
        </div>

        {/* Form */}
        <form className='space-y-5' onSubmit={handleSignUp}>
          {error && (
            <div className='bg-red-50 border-l-4 border-red-500 p-4 rounded-lg'>
              <p className='text-sm text-red-700 font-medium'>{error}</p>
            </div>
          )}

          {/* Name Input */}
          <div className='group'>
            <label htmlFor="name" className='block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-green-600 transition-colors'>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e)=>setFullName(e.target.value)}
              placeholder='John Doe'
              className='w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-50 transition-all duration-200 text-gray-900 placeholder-gray-400'
            />
          </div>

          {/* Email Input */}
          <div className='group'>
            <label htmlFor="email" className='block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-green-600 transition-colors'>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e)=>setEmail(e.target.value)}
              placeholder='you@example.com'
              className='w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-50 transition-all duration-200 text-gray-900 placeholder-gray-400'
            />
          </div>

          {/* Phone Number Input */}
          <div className='group'>
            <label htmlFor="phone" className='block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-green-600 transition-colors'>
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              onChange={(e)=>setPhone(e.target.value)}
              placeholder='1234567890'
              className='w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-50 transition-all duration-200 text-gray-900 placeholder-gray-400'
            />
          </div>

          {/* Password Input */}
          <div className="group">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-green-600 mb-2"
            >
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-12 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:outline-none transition-all"
              />

              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* Role Select */}
          <div className='group'>
            <label htmlFor="role" className='block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-green-600 transition-colors'>
              Account Type
            </label>
            <div className='flex gap-2'>
              {["Customer", "Delivery Partner", "Shop Owner"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRole(r)}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${r === selectedRole ? 'bg-green-600 text-white shadow-md transform scale-105' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className='w-full mt-4 px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-600 active:scale-95 transition-all duration-200 text-base tracking-wide'
          >
            Create Account
          </button>

          {/* Google SignUp */}
          <button
          onClick={handleGoogleSignIn}
            type="button"
            className='w-full px-4 py-3 bg-white text-green-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-600 active:scale-95 transition-all duration-200 text-base tracking-wide'
          >
            <FcGoogle className='inline-block mr-2' />
            Sign Up with Google
          </button>

        </form>

        {/* Footer */}
        <p className='text-center text-gray-600 text-md mt-2' >
          Already have an account?
          <a href="#" className='font-semibold text-green-600 hover:text-green-700 ml-1 transition-colors' onClick={() => navigate("/signin")}>Sign In</a>
        </p>
      </div>
    </div>
  )
}

export default SignUp;