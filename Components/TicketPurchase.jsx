import { useState, useEffect } from 'react'
import axios from 'axios'

const TicketPurchase = ({ schedule, userId, onPurchase }) => {
  const [availableSeats, setAvailableSeats] = useState(null)

  useEffect(() => {
    fetchAvailableSeats()
  }, [schedule])

  const fetchAvailableSeats = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/schedules/${
          schedule.id
        }/available-seats`,
      )
      setAvailableSeats(response.data)
    } catch (error) {
      console.error('Error fetching available seats:', error)
    }
  }

  const handlePurchaseTicket = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/tickets`, {
        userId,
        scheduleId: schedule.id,
      })
      alert('Ticket purchased successfully!')
      onPurchase()
      fetchAvailableSeats()
    } catch (error) {
      console.error('Error purchasing ticket:', error)
      alert('Failed to purchase ticket. Please try again.')
    }
  }

  return (
    <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Selected Schedule</h2>
      <p>Route: {schedule.route.name}</p>
      <p>Departure Time: {schedule.departureTime}</p>
      <p>
        Available Seats:{' '}
        {availableSeats !== null ? availableSeats : 'Loading...'}
      </p>
      <button
        className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-green-600"
        onClick={handlePurchaseTicket}
        disabled={availableSeats === 0}
      >
        Purchase Ticket
      </button>
    </div>
  )
}

export default TicketPurchase
