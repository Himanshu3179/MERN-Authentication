import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/user/signup', {
                name,
                email,
                password
            })
            toast.success(response.data.message);
            localStorage.setItem('token', response.data.token)
            navigate('/profile')
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
    return (
        <div className='xl:w-1/3 lg:w-1/2 md:w-2/3 sm:w-3/4 w-[90%] mx-auto mt-5'>
            <form className='flex flex-col gap-4  p-2 border border-neutral-500 rounded-md ' onSubmit={registerUser}>
                <input className='p-2 rounded-md bg-transparent border border-neutral-500 outline-none' type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email"
                    className='p-2 rounded-md bg-transparent border border-neutral-500 outline-none'
                    placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password"
                    className='p-2 rounded-md bg-transparent border border-neutral-500 outline-none'
                    placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit"
                    className='bg-slate-500 rounded-md p-2'
                >Signup</button>
            </form>
            {/* {error && <span>!! {  error}</span>} */}
        </div>

    )
}

export default Signup