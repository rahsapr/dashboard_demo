import React from 'react'
import PortfolioKPIChart from './charts/PortfolioKPIChart'
import ProjectModal from './ProjectModal'

export default function PortfolioView({summary}){
  const [openProject,setOpenProject] = React.useState(null);
  if(!summary) return <div className="p-8 bg-white rounded-xl shadow-sm">Loading...</div>
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2 bg-white p-4 rounded-xl shadow-sm">
          <div className="font-semibold">Executive Summary</div>
          <div className="mt-2 grid grid-cols-3 gap-3">
            <div className="p-3 bg-gray-50 rounded">Total Projects<br/><strong>{summary.kpis.totalProjects}</strong></div>
            <div className="p-3 bg-gray-50 rounded">Total Budget<br/><strong>${(summary.kpis.totalBudget/1e6).toFixed(1)}M</strong></div>
            <div className="p-3 bg-gray-50 rounded">Aggregated ROI<br/><strong>{summary.kpis.aggregatedROI}</strong></div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <PortfolioKPIChart projects={summary.projects} />
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="font-semibold">Resource Allocation</div>
          <div className="mt-4 text-sm text-gray-500">Budget distribution & headcount (mock)</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        {summary.projects.map(p=> (
          <div key={p.id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-xs text-gray-500">{p.businessUnit} • Owner: {p.owner}</div>
              </div>
              <div className="text-sm text-gray-400">{p.risk}</div>
            </div>
            <div className="mt-3">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div style={{width:`${p.progress}%`}} className="h-2 bg-green-500" />
              </div>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <button className="text-indigo-600 text-sm" onClick={()=>setOpenProject(p)}>Open</button>
              <div className="text-xs text-gray-500">Impact: ${p.impact.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>

      {openProject && <ProjectModal project={openProject} onClose={()=>setOpenProject(null)} />}
    </div>
  )
}
