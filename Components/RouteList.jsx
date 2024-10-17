import React from 'react'

const RouteList = ({ routes }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Available Routes</h2>
      <ul className="space-y-2">
        {routes.map((route) => (
          <li key={route.id} className="bg-gray-700 p-3 rounded">
            <span className="font-medium">{route.name}</span>
            <ul className="mt-2 pl-4">
              {route.routeStops.map((stop, index) => (
                <li
                  key={`${route.id}-${stop.id || index}`}
                  className="text-sm text-gray-400"
                >
                  {stop.stop.name}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RouteList
