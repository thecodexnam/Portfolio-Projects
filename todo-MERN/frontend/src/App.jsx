import React from 'react'
import NavBar from './component/NavBar'
import { Routes, Route } from 'react-router-dom'
import AddTask from './component/AddTask'
import ViewTask from './component/ViewTask' 

const App = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/add' element={<AddTask/>}></Route>
        <Route path='/view' element={<ViewTask/>}></Route>    
      </Routes>
    </div>
  )
}

export default App