import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'
import RouteList from './RouteList'
import ScheduleList from './ScheduleList'
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

  const handleScheduleSelect = (schedule) => {
    setSelectedSchedule(schedule)
    navigate(`/purchase-ticket/${schedule.id}`)
  }

  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Bus Ticketing System
          </h1>
          <div className="flex items-center">
            <span className="mr-4 text-lg text-gray-600">
              Welcome, {user.username}!
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Log Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Available Routes</h2>
            <RouteList routes={routes} />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Schedules</h2>
            <ScheduleList
              schedules={schedules}
              onSelectSchedule={handleScheduleSelect}
              selectedSchedule={selectedSchedule}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Tickets</h2>
          <UserTickets userId={user.id} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
