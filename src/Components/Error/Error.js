import React from 'react'
import './Error.scss'

export const Error = () => {
    return (
        <div className="error">
            <h2>Error 404  Page Not Found</h2>
            <img src='http://pixelartmaker.com/art/e98ded70b9e92e4.png' alt='dumpster fire' className='dumpster'/>
        </div>
    )
}

export default Error