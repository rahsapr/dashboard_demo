import React from 'react'

export default function TimelineGanttMock({project}){
  // This is a simplified mock gantt bar. Replace with full-featured gantt lib or custom SVG.
  const progress = project.progress;
  return (
    <div>
      <div className="text-sm text-gray-600">{project.start} → {project.end}</div>
      <div className="mt-3 h-6 bg-gray-100 rounded-full overflow-hidden">
        <div style={{width:`${progress}%`}} className="h-6 bg-gradient-to-r from-green-400 to-green-600" />
      </div>
      <div className="mt-2 text-xs text-gray-500">Progress: {progress}% • Risk: {project.risk}</div>
    </div>
  )
}
