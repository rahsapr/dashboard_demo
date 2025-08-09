import React from 'react'
import TimelineGanttMock from './charts/TimelineGanttMock'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProjectModal({project,onClose}){
  return (
    <div className="fixed inset-0 bg-black/40 flex items-start justify-center p-6">
      <div className="bg-white w-11/12 max-w-5xl rounded-2xl p-6 shadow-2xl">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{project.name}</h3>
            <div className="text-sm text-gray-500">Owner: {project.owner} • BU: {project.businessUnit}</div>
          </div>
          <div>
            <button className="text-sm text-gray-500" onClick={onClose}>Close</button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-gray-50 p-4 rounded-xl">
            <div className="font-semibold">Timeline</div>
            <div className="mt-3"><TimelineGanttMock project={project} /></div>
          </div>
          <div className="bg-white p-4 rounded-xl">
            <div className="font-semibold">Stakeholder Sentiment</div>
            <div className="mt-3 text-sm text-gray-500">Qualtrics-connected sentiment and NPS (mock)</div>
            <div className="mt-4 font-mono">Budget: ${(project.budget).toLocaleString()}</div>
            <div className="mt-2 text-sm text-gray-500">Progress: {project.progress}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}
