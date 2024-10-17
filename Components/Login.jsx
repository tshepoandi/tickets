import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
`

const LoginBox = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 100%;
  max-width: 400px;
  animation: ${fadeIn} 0.5s ease-out;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #4a4a4a;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const InputGroup = styled.div`
  margin-bottom: 1rem;
`

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a4a4a;
  margin-bottom: 0.25rem;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    outline: none;
    border-color: #6e8efb;
    box-shadow: 0 0 0 3px rgba(110, 142, 251, 0.3);
  }
`

const Button = styled.button`
  width: 100%;
  background-color: #6e8efb;
  color: white;
  font-weight: bold;
  padding: 0.75rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5d7ce0;
  }
`

const SignUpText = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: #4a4a4a;
`

const SignUpLink = styled(Link)`
  color: #6e8efb;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`

const Login = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/Users`,
        { username, email },
      )
      setUser(response.data) // Update user context
      navigate('/dashboard') // Navigate to dashboard
    } catch (error) {
      console.error('Error logging in:', error)
      alert('Failed to log in. Please check your credentials and try again.')
    }
  }

  return (
    <Container>
      <LoginBox>
        <Title>Login</Title>
        <Form onSubmit={handleLogin}>
          <InputGroup>
            <Label>Username</Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <Button type="submit">Log In</Button>
        </Form>
        <SignUpText>
          Don't have an account? <SignUpLink to="/register">Sign up</SignUpLink>
        </SignUpText>
      </LoginBox>
    </Container>
  )
}

export default Login
