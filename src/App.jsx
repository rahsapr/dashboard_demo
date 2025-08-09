import React, {useEffect, useState} from 'react'
import Topbar from './components/Topbar'
import UploadHub from './components/UploadHub'
import PortfolioView from './components/PortfolioView'
import { fetchPortfolioSummary } from './services/api'

export default function App(){
  const [summary, setSummary] = useState(null)

  useEffect(()=>{
    load();
  },[]);

  async function load(){
    const data = await fetchPortfolioSummary();
    setSummary(data);
  }

  return (
    <div className="min-h-screen">
      <Topbar />
      <div className="p-6 max-w-7xl mx-auto">
        <UploadHub onUploadComplete={load} />

        <div className="mt-6">
          <PortfolioView summary={summary} />
        </div>
      </div>
    </div>
  )
}
