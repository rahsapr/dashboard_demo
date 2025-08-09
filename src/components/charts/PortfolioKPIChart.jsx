import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#8884d8','#82ca9d','#ffc658','#ff7f7f']

export default function PortfolioKPIChart({projects}){
  const byBU = projects.reduce((acc,p)=>{ acc[p.businessUnit] = (acc[p.businessUnit]||0)+p.budget; return acc },{})
  const data = Object.entries(byBU).map(([k,v])=>({name:k,value:v}))
  return (
    <div style={{height:200}}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={60} fill="#8884d8">
            {data.map((entry, idx) => <Cell key={`c-${idx}`} fill={COLORS[idx % COLORS.length]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
