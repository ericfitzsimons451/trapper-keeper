import React from 'react'
import './Loader.scss'

export  const Loader = () => {
    return (
        <div className="loader">
            <h2 className="welcome">Welcome to Trapper Keeper!</h2>
            <p className="description">Trapper Keeper is a wonderful way to take notes and store ideas.</p>
            <h4 className="suggestion">Start by creating a new note now!</h4>
        </div>
    )
}

export default Loader