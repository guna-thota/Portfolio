import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, LineChart, Brain, Cpu, X } from "lucide-react";

/* =====================================================
   DARK AZURE ENTERPRISE PORTFOLIO
   Glass • Depth • Subtle Motion • Recruiter Credible
===================================================== */

const azureGradient = "linear-gradient(135deg, rgba(30,129,176,0.25), rgba(20,93,160,0.25))";

const projects = [
  {
    id: "farming",
    title: "Yield Prediction – Time Series Modeling",
    icon: LineChart,
    repo: "AI-Assisted-Farming-for-Crop-Recommendation-Farm-Yield-Prediction-Application",
    overview:
      "End-to-end time-series workflow built on multivariate seasonal datasets for predictive modeling.",
    metrics: [
      "10+ years historical seasonal data",
      "100K+ structured time-series records",
      "Evaluated against regression baselines",
      "Optimized preprocessing for retraining cycles",
    ],
    architecture: (
      <svg viewBox="0 0 650 260" width="100%" height="260">
        <rect x="40" y="100" width="160" height="60" rx="10" fill="#0e2a47" />
        <text x="120" y="135" fill="white" fontSize="12" textAnchor="middle">Data Sources</text>
        <rect x="245" y="100" width="160" height="60" rx="10" fill="#134074" />
        <text x="325" y="135" fill="white" fontSize="12" textAnchor="middle">Feature Engineering</text>
        <rect x="450" y="100" width="160" height="60" rx="10" fill="#1e6091" />
        <text x="530" y="135" fill="white" fontSize="12" textAnchor="middle">Sequence Model</text>
        <line x1="200" y1="130" x2="245" y2="130" stroke="#4ea8de" />
        <line x1="405" y1="130" x2="450" y2="130" stroke="#4ea8de" />
      </svg>
    ),
  },
  {
    id: "gait",
    title: "Video-Based Feature Extraction Pipeline",
    icon: Brain,
    repo: "DNN-for-person-recognition-using-physiological-parameters",
    overview:
      "Multi-stage pipeline transforming raw video into structured temporal embeddings.",
    metrics: [
      "300+ validation subjects",
      "Thousands of frames processed",
      "Robust across covariate conditions",
      "Modular CNN → RNN design",
    ],
    architecture: (
      <svg viewBox="0 0 650 260" width="100%" height="260">
        <rect x="40" y="100" width="160" height="60" rx="10" fill="#0e2a47" />
        <text x="120" y="135" fill="white" fontSize="12" textAnchor="middle">Video Frames</text>
        <rect x="245" y="100" width="160" height="60" rx="10" fill="#134074" />
        <text x="325" y="135" fill="white" fontSize="12" textAnchor="middle">Pose Extraction</text>
        <rect x="450" y="100" width="160" height="60" rx="10" fill="#1e6091" />
        <text x="530" y="135" fill="white" fontSize="12" textAnchor="middle">Temporal Encoding</text>
        <line x1="200" y1="130" x2="245" y2="130" stroke="#4ea8de" />
        <line x1="405" y1="130" x2="450" y2="130" stroke="#4ea8de" />
      </svg>
    ),
  },
  {
    id: "agent",
    title: "Natural Language Data Query Engine",
    icon: Cpu,
    repo: "Ai-dataanalysis-agent",
    overview:
      "Structured analytics interface translating user queries into executable SQL.",
    metrics: [
      "CSV & Excel ingestion (~100MB tested)",
      "Schema-aware SQL generation",
      "In-memory processing (DuckDB)",
      "Reduces manual query effort",
    ],
    architecture: (
      <svg viewBox="0 0 650 260" width="100%" height="260">
        <rect x="40" y="100" width="160" height="60" rx="10" fill="#0e2a47" />
        <text x="120" y="135" fill="white" fontSize="12" textAnchor="middle">User Query</text>
        <rect x="245" y="100" width="160" height="60" rx="10" fill="#134074" />
        <text x="325" y="135" fill="white" fontSize="12" textAnchor="middle">Query Translation</text>
        <rect x="450" y="100" width="160" height="60" rx="10" fill="#1e6091" />
        <text x="530" y="135" fill="white" fontSize="12" textAnchor="middle">Execution Engine</text>
        <line x1="200" y1="130" x2="245" y2="130" stroke="#4ea8de" />
        <line x1="405" y1="130" x2="450" y2="130" stroke="#4ea8de" />
      </svg>
    ),
  },
];

export default function App() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={{ margin: 0 }}>Guna Durga Prashanth Thota</h1>
          <div style={{ opacity: 0.7 }}>Data Engineer (Azure + Spark)</div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          <a href="mailto:gunaprashant@gmail.com" style={buttonStyle}><Mail size={16}/> Email</a>
          <a href="https://www.linkedin.com/in/gthota27/" target="_blank" rel="noreferrer" style={buttonStyle}><Linkedin size={16}/> LinkedIn</a>
        </div>
      </div>

      <div style={glassCard}>
        <h2>Professional Summary</h2>
        <p style={{ lineHeight: 1.7, opacity: 0.9 }}>
          Data Engineer experienced in building Azure-native data pipelines supporting analytics and ML workloads.
          Strong focus on structured data modeling, scalable transformations, and production reliability.
          Skilled in designing governed, performance-optimized data systems for enterprise environments.
        </p>
      </div>

      <h2 style={{ marginTop: 60 }}>Selected Engineering Work</h2>

      <div style={{ display: "grid", gap: 28 }}>
        {projects.map((proj) => (
          <motion.div
            key={proj.id}
            whileHover={{ translateY: -4 }}
            style={glassCard}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <proj.icon size={20}/>
              <h3 style={{ margin: 0 }}>{proj.title}</h3>
            </div>

            <p style={{ opacity: 0.85 }}>{proj.overview}</p>

            <strong>Scale & Scope</strong>
            <ul style={{ marginTop: 8 }}>
              {proj.metrics.map((m,i)=>(<li key={i}>{m}</li>))}
            </ul>

            <div style={{ display:"flex", gap:12, marginTop:12 }}>
              <a href={`https://github.com/guna-thota/${proj.repo}`} target="_blank" rel="noreferrer" style={chipStyle}>Repository</a>
              <button style={chipStyle} onClick={()=>setActiveProject(proj)}>Architecture</button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={modalOverlay} onClick={()=>setActiveProject(null)}>
            <motion.div initial={{scale:0.95}} animate={{scale:1}} exit={{scale:0.95}} style={modalStyle} onClick={(e)=>e.stopPropagation()}>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <h3>{activeProject.title} – Architecture</h3>
                <X onClick={()=>setActiveProject(null)} style={{cursor:"pointer"}}/>
              </div>
              {activeProject.architecture}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* STYLES */

const pageStyle = {
  background: "#071421",
  minHeight: "100vh",
  padding: 50,
  color: "white",
  fontFamily: "Segoe UI, system-ui, sans-serif",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 40,
};

const glassCard = {
  background: azureGradient,
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(78,168,222,0.3)",
  padding: 28,
  borderRadius: 14,
  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
};

const buttonStyle = {
  background: "#1e6091",
  padding: "8px 14px",
  borderRadius: 8,
  color: "white",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: 6,
};

const chipStyle = {
  background: "#0e2a47",
  padding: "6px 14px",
  borderRadius: 6,
  border: "1px solid #4ea8de",
  color: "white",
  cursor: "pointer",
};

const modalOverlay = {
  position:"fixed",
  top:0,
  left:0,
  width:"100vw",
  height:"100vh",
  background:"rgba(0,0,0,0.7)",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  zIndex:1000,
};

const modalStyle = {
  background:"#0b1d2c",
  padding:30,
  borderRadius:14,
  width:"750px",
  maxWidth:"95%",
  border:"1px solid rgba(78,168,222,0.4)",
};