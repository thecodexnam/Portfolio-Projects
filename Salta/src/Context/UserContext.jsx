import React, { createContext } from 'react'
const DataContext = createContext()

const UserContext = ({children}) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default UserContext