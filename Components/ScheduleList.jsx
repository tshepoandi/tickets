const ScheduleList = ({ schedules, onSelectSchedule, selectedSchedule }) => {
  if (!schedules || schedules.length === 0) {
    return <div>No schedules available.</div>
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Schedules</h2>
      <ul className="space-y-2">
        {schedules.map((schedule) => (
          <li
            key={schedule.id}
            className={`bg-gray-700 p-3 rounded cursor-pointer transition-colors ${
              selectedSchedule?.id === schedule.id
                ? 'bg-blue-600'
                : 'hover:bg-gray-600'
            }`}
            onClick={() => onSelectSchedule(schedule)}
          >
            <div className="font-medium">
              {schedule.routeName || 'Unknown Route'}
            </div>
            <div className="text-sm text-gray-400">
              Bus: {schedule.busNumber || 'Unknown'} | Departure:{' '}
              {schedule.departureTime || 'Not specified'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ScheduleList
