import React, {useRef, useState} from 'react'
import axios from 'axios'
import Papa from 'papaparse'

export default function UploadHub({onUploadComplete}){
  const inputRef = useRef();
  const [files, setFiles] = useState([]);

  async function handleFiles(selectedFiles, sourceType){
    const arr = Array.from(selectedFiles);
    setFiles(f=>[...f,...arr.map(f=>({name:f.name,status:'queued'}))]);
    for(const f of arr){
      const fd = new FormData();
      fd.append('file', f);
      fd.append('sourceType', sourceType);
      // optionally attach projectId
      try{
        await axios.post('http://localhost:4001/api/upload', fd, { headers: {'Content-Type':'multipart/form-data'} });
      }catch(e){ console.error(e) }
    }
    if(onUploadComplete) onUploadComplete();
  }

  function onSelect(e, type){
    handleFiles(e.target.files, type);
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold">Upload Hub</div>
          <div className="text-sm text-gray-500">Drag & drop CSVs or click to upload. Files are parsed server-side for preview and stored as versions.</div>
        </div>
        <div className="flex gap-2">
          <label className="btn-primary cursor-pointer">
            Asana
            <input type="file" accept=".csv" className="hidden" onChange={(e)=>onSelect(e,'asana')} />
          </label>
          <label className="btn-primary cursor-pointer">
            Qualtrics
            <input type="file" accept=".csv" className="hidden" onChange={(e)=>onSelect(e,'qualtrics')} />
          </label>
          <label className="btn-primary cursor-pointer">
            Financial
            <input type="file" accept=".csv" className="hidden" onChange={(e)=>onSelect(e,'financial')} />
          </label>
        </div>
      </div>
    </div>
  )
}
