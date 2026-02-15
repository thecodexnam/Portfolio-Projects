import React from 'react'
import { Link } from 'react-router-dom'
import "../style/navbar.css"

const NavBar = () => {
    return (
        <>
            <div className="navbar">
                <h1 className="logo">TODO APP</h1>
                <ul className="nav-links">
                    <li className="nav-item">
                        <Link to="/add">Add Task</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/view">View Tasks</Link>
                    </li>
                </ul>
            </div>


        </>
    )
}

export default NavBar