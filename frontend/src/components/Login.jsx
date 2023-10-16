import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/user/login', {
                email,
                password
            })
            console.log(response)

            setError('')
            toast.success(response.data.message);
            localStorage.setItem('token', response.data.token)
            navigate('/profile')
        } catch (err) {
            setError(err.response.data.message)
            toast.error(err.response.data.message);
        }
    }

    return (
        <div className='xl:w-1/3 lg:w-1/2 md:w-2/3 sm:w-3/4 w-[90%] mx-auto mt-5'>
            <form className='flex flex-col gap-4  p-2 border border-neutral-500 rounded-md ' onSubmit={loginUser}>

                <input type="email"
                    className='p-2 rounded-md bg-transparent border border-neutral-500 outline-none'
                    placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password"
                    className='p-2 rounded-md bg-transparent border border-neutral-500 outline-none'
                    placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit"
                    className='bg-slate-500 rounded-md p-2'
                >Login</button>
            </form>
            {/* {error && <span>!! {error}</span>} */}
        </div>
    )
}

export default Login
