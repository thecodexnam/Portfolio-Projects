import React from 'react'

const Home = () => {
  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center bg-linear-to-br from-green-50 to-orange-50'>
      <h1 className='text-6xl font-black text-green-600 mb-4 animate-bounce'>Pickify</h1>
      <p className='text-xl text-gray-600 font-medium'>Welcome to your Dashboard!</p>
      <div className='mt-8 p-6 bg-white rounded-2xl shadow-xl border border-gray-100'>
        <p className='text-gray-500'>This is just the beginning. Start exploring!</p>
      </div>
    </div>
  )
}

export default Home
