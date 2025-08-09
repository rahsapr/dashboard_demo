import React from 'react'
import { PieChart } from 'lucide-react'

export default function Topbar(){
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-gradient-to-r from-sky-600 to-indigo-600 text-white"><PieChart size={18} /></div>
          <div>
            <div className="font-semibold">Strategic Portfolio — Executive Dashboard</div>
            <div className="text-sm text-gray-500">Multi-source CSV integration • Portfolio + Project views</div>
          </div>
        </div>
        <div className="text-sm text-gray-500">Mock Server: <strong>http://localhost:4001</strong></div>
      </div>
    </header>
  )
}
