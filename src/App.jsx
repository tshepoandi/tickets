import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from '../contexts/UserContext'
import Login from '../Components/Login'
import Register from '../Components/Register'
import Dashboard from '../Components/Dashboard'
import PurchaseTicket from '../Pages/PurchaseTicket'

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/purchase-ticket/:scheduleId"
              element={<PurchaseTicket />}
            />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  )
}

export default App
