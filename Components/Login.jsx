import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [email, setemail] = useState('')
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/Users`,
        {
          username,
          email,
        },
      )
      setUser(response.data)
      navigate('/dashboard')
    } catch (error) {
      console.error('Error logging in:', error)
      alert('Failed to log in. Please check your credentials and try again.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Login
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block font-bold mb-2 text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white border border-gray-600"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block font-bold mb-2 text-white">
              email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white border border-gray-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-white">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
