import React, {useEffect, useState} from 'react'
import {getFiles} from '../services/api'

export default function FileQueue(){
  const [files, setFiles] = useState([]);
  useEffect(()=>{ load() },[]);
  async function load(){ const res = await getFiles(); setFiles(res.files) }
  return (
    <div className="mt-4 bg-white p-4 rounded-xl shadow-sm">
      <div className="font-semibold mb-2">Files</div>
      {files.map(f=> (
        <div key={f.id} className="flex items-center justify-between border-b py-2">
          <div>
            <div className="font-medium">{f.name}</div>
            <div className="text-xs text-gray-500">{f.sourceType} • v{f.version} • {f.rowCount} rows</div>
          </div>
          <div className="text-xs text-gray-400">{new Date(f.uploadedAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
  )
}
