import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('')
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/user/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setUser(response.data.user)
                setError('')
            } catch (error) {
                setError(error.response.data.message)
                toast.error(error.response.data.message);
                navigate('/login')
            }
        }
        fetchUser()
    }, [navigate])

    const logoutUser = async () => {
        try {
            const response = await axios.get('/api/user/logout')
            console.log(response)
            setError('')
            localStorage.removeItem('token')
            navigate('/login')
            toast.success(response.data.message);
        } catch (error) {
            setError(error.response.data.message)
            toast.error(error.response.data.message);
        }

    }

    return (
        <div className='space-y-5 w-full p-5'>
            <h1 className='text-center text-3xl'>Profile</h1>
            {user && Object.keys(user).length > 0 && (
                <div>
                    <div>
                        <p>ID: {user._id}</p>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                    </div>



                    <button className='bg-red-600 p-2 rounded-md '
                        onClick={logoutUser}
                    >Logout</button>
                </div>
            )}

            {error && <span>{error}</span>}
        </div>
    )
}

export default Profile