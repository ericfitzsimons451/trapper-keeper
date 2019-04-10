import React from 'react'
import { NavLink } from 'react-router-dom'
import './Loader.scss'

export  const Loader = () => {
    return (
        <div className="loader">
            <h2 className="welcome">Welcome to Trapper Keeper!</h2>
            <p className="description">Trapper Keeper is a wonderful way to take notes and store ideas.</p>
            <h4 className="suggestion">Start by creating a new note now!</h4>
            <NavLink to='/new-note'>Create New note</NavLink>
        </div>
    )
}

export default Loader