import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'
import RouteList from './RouteList'
import ScheduleList from './ScheduleList'
import TicketPurchase from './TicketPurchase'
import UserTickets from './UserTickets'

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext)
  const [routes, setRoutes] = useState([])
  const [schedules, setSchedules] = useState([])
  const [selectedSchedule, setSelectedSchedule] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    } else {
      fetchRoutes()
      fetchSchedules()
    }
  }, [user, navigate])

  const fetchRoutes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/Routes`,
      )
      setRoutes(response.data)
    } catch (error) {
      console.error('Error fetching routes:', error)
    }
  }

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/Schedules`,
      )
      setSchedules(response.data)
    } catch (error) {
      console.error('Error fetching schedules:', error)
    }
  }

  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Bus Ticketing System
          </h1>
          <div>
            <span className="mr-4 text-white">Welcome, {user.username}!</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
            >
              Log Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RouteList routes={routes} />
          <ScheduleList
            schedules={schedules}
            onSelectSchedule={setSelectedSchedule}
            selectedSchedule={selectedSchedule}
          />
        </div>

        {selectedSchedule && (
          <TicketPurchase
            schedule={selectedSchedule}
            userId={user.id}
            onPurchase={fetchSchedules}
          />
        )}

        <UserTickets userId={user.id} />
      </div>
    </div>
  )
}

export default Dashboard
