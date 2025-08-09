module.exports = (FILES) => {
  // generate some mock projects and compute aggregates from FILES when present
  const projects = Array.from({length:9}).map((_,i)=>({
    id: `proj-${i+1}`,
    name: `Strategic Initiative ${i+1}`,
    owner: `owner${i+1}@company.com`,
    businessUnit: i%2===0? 'Digital':'Operations',
    start: `2025-0${(i%9)+1}-01`,
    end: `2025-1${(i%9)+1}-15`,
    progress: Math.round(30 + Math.random()*60),
    budget: Math.round(5 + Math.random()*50) * 100000,
    impact: Math.round(500 + Math.random()*5000)*100,
    risk: ['Low','Medium','High'][Math.floor(Math.random()*3)]
  }));

  return {
    getPortfolioSummary: () => {
      const totalBudget = projects.reduce((s,p)=>s+p.budget,0);
      const totalImpact = projects.reduce((s,p)=>s+p.impact,0);
      const kpis = {
        totalProjects: projects.length,
        totalBudget,
        totalImpact,
        aggregatedROI: `${Math.round((totalImpact/totalBudget)*100) || 0}%`
      };
      return { projects, kpis };
    },
    getProject: (id) => projects.find(p=>p.id===id) || null
  }
}
