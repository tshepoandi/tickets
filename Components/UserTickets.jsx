import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UserTickets = ({ userId }) => {
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    fetchUserTickets()
  }, [userId])

  const fetchUserTickets = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/tickets/user/${userId}`,
      )
      setTickets(response.data)
    } catch (error) {
      console.error('Error fetching user tickets:', error)
    }
  }

  return (
    <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your Tickets</h2>
      {tickets.length === 0 ? (
        <p>You haven't purchased any tickets yet.</p>
      ) : (
        <ul className="space-y-4">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="bg-gray-700 p-4 rounded">
              <p className="font-medium">Route: {ticket.routeName}</p>
              <p>Departure: {ticket.departureTime}</p>
              <p>
                Purchase Date: {new Date(ticket.purchaseDate).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UserTickets
