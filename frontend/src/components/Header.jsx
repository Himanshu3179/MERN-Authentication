import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='w-full mx-auto flex justify-between p-4 px-10 bg-slate-500'>
            <Link to="/">
                <p>My App</p>
            </Link>
            <div className='flex gap-10'>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/profile">Profile</Link>
            </div>

        </div>
    )
}

export default Header