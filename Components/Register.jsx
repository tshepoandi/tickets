import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'
import styled from 'styled-components'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #1a202c;
`

const FormContainer = styled.div`
  width: 100%;
  max-width: 28rem;
  padding: 1.5rem;
  background-color: #2d3748;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1.5rem;
  text-align: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const FormGroup = styled.div`
  margin-bottom: 1rem;
`

const Label = styled.label`
  display: block;
  color: white;
  margin-bottom: 0.5rem;
`

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  background-color: #4a5568;
  border-radius: 0.375rem;
  border: 1px solid #4b5563;
  color: white;

  &:focus {
    outline: none;
    border-color: #3182ce;
  }
`

const Button = styled.button`
  width: 100%;
  background-color: #2b6cb0;
  color: white;
  padding: 0.5rem;
  border-radius: 0.375rem;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2c5282;
  }
`

const LoginText = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: white;
`

const LoginLink = styled(Link)`
  color: #63b3ed;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/Users`,
        {
          username,
          email,
          password,
        },
      )
      setUser(response.data)
      navigate('/dashboard')
    } catch (error) {
      console.error('Error registering:', error)
      alert('Failed to register. Please try again.')
    }
  }

  return (
    <PageContainer>
      <FormContainer>
        <Title>Register</Title>
        <Form onSubmit={handleRegister}>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Username</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          <Button type="submit">Register</Button>
        </Form>
        <LoginText>
          Already a user? <LoginLink>Login</LoginLink>{' '}
        </LoginText>
      </FormContainer>
    </PageContainer>
  )
}

export default Register
