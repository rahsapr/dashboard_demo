import axios from 'axios'

const BASE = 'http://localhost:4001'
export async function fetchPortfolioSummary(){
  const r = await axios.get(`${BASE}/api/portfolio/summary`);
  return r.data;
}
export async function getProject(id){
  const r = await axios.get(`${BASE}/api/projects/${id}`);
  return r.data;
}
export async function getFiles(){
  const r = await axios.get(`${BASE}/api/files`);
  return r.data;
}
