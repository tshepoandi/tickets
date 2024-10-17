import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'

const PurchaseTicket = () => {
  const { scheduleId } = useParams()
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [schedule, setSchedule] = useState(null)
  const [availableSeats, setAvailableSeats] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (scheduleId) {
      fetchScheduleDetails()
      fetchAvailableSeats()
    }
  }, [scheduleId])

  const fetchScheduleDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/Schedules`,
      )
      const selectedSchedule = response.data.find(
        (s) => s.id === parseInt(scheduleId),
      )
      if (selectedSchedule) {
        setSchedule(selectedSchedule)
      } else {
        setError('Schedule not found.')
      }
    } catch (error) {
      console.error('Error fetching schedule details:', error)
      setError('Unable to fetch schedule details. Please try again.')
    }
  }

  const fetchAvailableSeats = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/Schedules/${scheduleId}/available-seats`,
      )
      setAvailableSeats(response.data.availableSeats)
    } catch (error) {
      console.error('Error fetching available seats:', error)
      setError('Unable to fetch available seats. Please try again.')
    }
  }

  const handlePurchaseTicket = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/Tickets`,
        {
          userId: user.id,
          scheduleId: parseInt(scheduleId),
        },
      )
      console.log('Purchase response:', response.data)
      alert('Ticket purchased successfully!')
      navigate('/dashboard')
    } catch (error) {
      console.error(
        'Error purchasing ticket:',
        error.response ? error.response.data : error.message,
      )
      setError('Failed to purchase ticket. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!schedule) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Purchase Ticket
        </h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Schedule Details</h2>
          <p>Route: {schedule.routeName}</p>
          <p>Departure Time: {schedule.departureTime}</p>
          <p>Bus Number: {schedule.busNumber}</p>
          <p>
            Available Seats:{' '}
            {availableSeats !== null ? availableSeats.toString() : 'Loading...'}
          </p>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handlePurchaseTicket}
          disabled={isLoading || availableSeats <= 0}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          {isLoading ? 'Loading...' : 'Purchase Ticket'}
        </button>
      </div>
    </div>
  )
}

export default PurchaseTicket
