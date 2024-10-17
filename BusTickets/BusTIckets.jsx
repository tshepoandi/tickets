import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:5146/api'

const BusTicketingSystem = () => {
  const [routes, setRoutes] = useState([])
  const [schedules, setSchedules] = useState([])
  const [selectedSchedule, setSelectedSchedule] = useState(null)
  const [availableSeats, setAvailableSeats] = useState(null)
  const [userTickets, setUserTickets] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    fetchRoutes()
    fetchSchedules()
  }, [])

  useEffect(() => {
    if (user) {
      fetchUserTickets(user.id)
    }
  }, [user])

  const fetchRoutes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/routes`)
      setRoutes(response.data)
    } catch (error) {
      console.error('Error fetching routes:', error)
    }
  }

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/schedules`)
      setSchedules(response.data)
    } catch (error) {
      console.error('Error fetching schedules:', error)
    }
  }

  const fetchAvailableSeats = async (scheduleId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/Schedules/${scheduleId}/available-seats`,
      )
      setAvailableSeats(response.data.availableSeats)
    } catch (error) {
      console.error('Error fetching available seats:', error)
      setAvailableSeats(null)
    }
  }

  const fetchUserTickets = async (userId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/tickets/user/${userId}`,
      )
      setUserTickets(response.data)
    } catch (error) {
      console.error('Error fetching user tickets:', error)
    }
  }

  const handleScheduleSelect = (schedule) => {
    setSelectedSchedule(schedule)
    setAvailableSeats(null) // Reset before fetching
    fetchAvailableSeats(schedule.id)
  }

  const handlePurchaseTicket = async () => {
    if (!selectedSchedule || !user) return

    try {
      await axios.post(`${API_BASE_URL}/tickets`, {
        userId: user.id,
        scheduleId: selectedSchedule.id,
      })
      alert('Ticket purchased successfully!')
      fetchUserTickets(user.id)
      fetchAvailableSeats(selectedSchedule.id)
    } catch (error) {
      console.error('Error purchasing ticket:', error)
      alert('Failed to purchase ticket. Please try again.')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, {
        username,
        password,
      })
      setUser(response.data)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error('Error logging in:', error)
      alert('Failed to log in. Please check your credentials and try again.')
    }
  }

  const handleLogout = () => {
    setUser(null)
    setUserTickets([])
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-bold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
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
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Bus Ticketing System</h1>
          <div>
            <span className="mr-4">Welcome, {user.username}!</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
            >
              Log Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Available Routes</h2>
            <ul className="space-y-2">
              {routes.map((route) => (
                <li key={route.id} className="bg-gray-100 p-3 rounded">
                  <span className="font-medium">{route.name}</span>
                  <ul className="mt-2 pl-4">
                    {route.stops.map((stop) => (
                      <li key={stop.id} className="text-sm text-gray-600">
                        {stop.name}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Schedules</h2>
            <ul className="space-y-2">
              {schedules.map((schedule) => (
                <li
                  key={schedule.id}
                  className={`bg-gray-100 p-3 rounded cursor-pointer transition-colors ${
                    selectedSchedule?.id === schedule.id
                      ? 'bg-blue-200'
                      : 'hover:bg-gray-200'
                  }`}
                  onClick={() => handleScheduleSelect(schedule)}
                >
                  <div className="font-medium">{schedule.routeName}</div>
                  <div className="text-sm text-gray-600">
                    Bus: {schedule.busNumber} | Departure:{' '}
                    {schedule.departureTime}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {selectedSchedule && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Selected Schedule</h2>
            <p>Route: {selectedSchedule.routeName}</p>
            <p>Departure Time: {selectedSchedule.departureTime}</p>
            <p>
              Available Seats:{' '}
              {availableSeats !== null ? availableSeats : 'Loading...'}
            </p>
            <button
              className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-green-600"
              onClick={handlePurchaseTicket}
            >
              Purchase Ticket
            </button>
          </div>
        )}

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Tickets</h2>
          {userTickets.length === 0 ? (
            <p>You haven't purchased any tickets yet.</p>
          ) : (
            <ul className="space-y-2">
              {userTickets.map((ticket) => (
                <li key={ticket.id} className="bg-gray-100 p-3 rounded">
                  <div className="font-medium">{ticket.routeName}</div>
                  <div className="text-sm text-gray-600">
                    Departure: {ticket.departureTime} | Purchased:{' '}
                    {new Date(ticket.purchaseDate).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default BusTicketingSystem
