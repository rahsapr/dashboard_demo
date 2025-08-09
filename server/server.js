const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');
const bodyParser = require('body-parser');

const upload = multer({ dest: 'uploads/' });
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

const PORT = process.env.PORT || 4001;

// Simple in-memory store for normalized data and file metadata
const FILES = {};
const PROJECTS = require('./routes')(FILES);

app.get('/api/health', (req, res) => res.json({ ok: true, ts: new Date().toISOString() }));

app.post('/api/upload', upload.single('file'), (req, res) => {
  try{
    const file = req.file;
    const { sourceType = 'custom', projectId } = req.body;
    const raw = fs.readFileSync(file.path, 'utf8');
    const parsed = Papa.parse(raw, { header: true, skipEmptyLines: true });
    const id = `file-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    FILES[id] = {
      id,
      name: file.originalname,
      sourceType,
      projectId: projectId || null,
      uploadedAt: new Date().toISOString(),
      rows: parsed.data,
      rowCount: parsed.data.length,
      version: 1,
    };
    // cleanup
    fs.unlinkSync(file.path);
    res.json({ status: 'ok', fileId: id, meta: FILES[id] });
  }catch(e){
    console.error(e);
    res.status(500).json({ status:'error', message:e.message });
  }
});

app.get('/api/files', (req,res)=>{
  const list = Object.values(FILES).map(f=>({id:f.id,name:f.name,sourceType:f.sourceType,version:f.version,rowCount:f.rowCount,uploadedAt:f.uploadedAt,projectId:f.projectId}));
  res.json({ files: list });
});

app.get('/api/files/:id/preview', (req,res)=>{
  const id = req.params.id;
  const f = FILES[id];
  if(!f) return res.status(404).json({error:'not found'});
  res.json({ id:f.id, sample: f.rows.slice(0,5) });
});

app.get('/api/portfolio/summary', (req,res)=>{
  // Return synthetic KPIs and projects list
  res.json(PROJECTS.getPortfolioSummary());
});

app.get('/api/projects/:id', (req,res)=>{
  const id = req.params.id;
  const p = PROJECTS.getProject(id);
  if(!p) return res.status(404).json({ error: 'project not found' });
  res.json(p);
});

app.listen(PORT, ()=> console.log('Mock server listening on', PORT));
