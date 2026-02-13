import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Linkedin,
  ShieldCheck,
  Database,
  Brain,
  LineChart,
  Cpu,
  X,
} from "lucide-react";

/* =====================================================
   AZURE ENTERPRISE-STYLE DATA ENGINEERING PORTFOLIO
   Recruiter-first • Clean • Structured • Credible
===================================================== */

const projects = [
  {
    id: "farming",
    title: "AI-Assisted Farming – Yield Prediction",
    icon: LineChart,
    repo:
      "AI-Assisted-Farming-for-Crop-Recommendation-Farm-Yield-Prediction-Application",
    overview:
      "Time-series ML pipeline leveraging LSTM + attention to model crop yield under varying climatic conditions.",
    metrics: [
      "~10+ years of historical multivariate weather + genotype data",
      "100K+ structured time-series records processed",
      "Outperformed linear & SVR baselines in experimental evaluation",
      "Vectorized preprocessing reduced model preparation latency",
    ],
    architecture: (
      <svg viewBox="0 0 600 260" width="100%" height="260">
        <rect x="20" y="100" width="130" height="60" rx="10" fill="#0e3a5f" />
        <text x="85" y="135" fill="white" fontSize="12" textAnchor="middle">
          Weather + Genotype Data
        </text>

        <rect x="200" y="100" width="130" height="60" rx="10" fill="#125e8a" />
        <text x="265" y="135" fill="white" fontSize="12" textAnchor="middle">
          Feature Engineering
        </text>

        <rect x="380" y="100" width="130" height="60" rx="10" fill="#1976d2" />
        <text x="445" y="135" fill="white" fontSize="12" textAnchor="middle">
          LSTM + Attention
        </text>

        <line x1="150" y1="130" x2="200" y2="130" stroke="#90caf9" />
        <line x1="330" y1="130" x2="380" y2="130" stroke="#90caf9" />
      </svg>
    ),
  },
  {
    id: "gait",
    title: "Gait-Based Person Recognition (DNN)",
    icon: Brain,
    repo: "DNN-for-person-recognition-using-physiological-parameters",
    overview:
      "Multi-stage deep learning pipeline transforming video → pose → temporal embeddings → identification vectors.",
    metrics: [
      "300+ subjects across multiple covariate conditions",
      "Thousands of video frames processed per experiment",
      "Improved robustness across clothing & time variations",
      "Modular CNN → RNN architecture for scalable inference",
    ],
    architecture: (
      <svg viewBox="0 0 600 260" width="100%" height="260">
        <rect x="20" y="100" width="120" height="60" rx="10" fill="#0e3a5f" />
        <text x="80" y="135" fill="white" fontSize="12" textAnchor="middle">
          Video Frames
        </text>

        <rect x="180" y="100" width="140" height="60" rx="10" fill="#125e8a" />
        <text x="250" y="135" fill="white" fontSize="12" textAnchor="middle">
          Pose Extraction (CNN)
        </text>

        <rect x="370" y="100" width="150" height="60" rx="10" fill="#1976d2" />
        <text x="445" y="135" fill="white" fontSize="12" textAnchor="middle">
          RNN + Embedding
        </text>

        <line x1="140" y1="130" x2="180" y2="130" stroke="#90caf9" />
        <line x1="320" y1="130" x2="370" y2="130" stroke="#90caf9" />
      </svg>
    ),
  },
  {
    id: "agent",
    title: "AI Data Analysis Agent",
    icon: Cpu,
    repo: "Ai-dataanalysis-agent",
    overview:
      "Natural language → SQL analytics engine using GPT-4o + DuckDB for tabular data processing.",
    metrics: [
      "Supports CSV/Excel ingestion up to ~100MB locally",
      "Natural language → SQL translation layer",
      "In-memory analytics using DuckDB (OLAP-style queries)",
      "Reduces manual query writing time significantly",
    ],
    architecture: (
      <svg viewBox="0 0 600 260" width="100%" height="260">
        <rect x="20" y="100" width="120" height="60" rx="10" fill="#0e3a5f" />
        <text x="80" y="135" fill="white" fontSize="12" textAnchor="middle">
          User Query
        </text>

        <rect x="180" y="100" width="140" height="60" rx="10" fill="#125e8a" />
        <text x="250" y="135" fill="white" fontSize="12" textAnchor="middle">
          GPT → SQL
        </text>

        <rect x="370" y="100" width="150" height="60" rx="10" fill="#1976d2" />
        <text x="445" y="135" fill="white" fontSize="12" textAnchor="middle">
          DuckDB Engine
        </text>

        <line x1="140" y1="130" x2="180" y2="130" stroke="#90caf9" />
        <line x1="320" y1="130" x2="370" y2="130" stroke="#90caf9" />
      </svg>
    ),
  },
];

export default function App() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <div style={{ padding: 40, background: "#0b1622", minHeight: "100vh", color: "white" }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 40 }}>
        <div>
          <h1 style={{ margin: 0 }}>Guna Durga Prashanth Thota</h1>
          <div style={{ opacity: 0.7 }}>Data Engineer (Azure + Spark)</div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <a href="mailto:gunaprashant@gmail.com" style={btnStyle}>
            <Mail size={16} /> Email
          </a>
          <a
            href="https://www.linkedin.com/in/gthota27/"
            target="_blank"
            rel="noreferrer"
            style={btnStyle}
          >
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>
      </div>

      {/* SUMMARY BLOCK */}
      <div style={cardStyle}>
        <h2>Enterprise Data Engineering Focus</h2>
        <ul>
          <li>Production-ready Azure-native pipelines</li>
          <li>ML-ready structured datasets</li>
          <li>Reliability: validation, reconciliation, monitoring</li>
          <li>Performance tuning + cost-aware design</li>
        </ul>
      </div>

      {/* PROJECTS */}
      <h2 style={{ marginTop: 50 }}>Selected Projects</h2>
      <div style={{ display: "grid", gap: 24 }}>
        {projects.map((proj) => (
          <div key={proj.id} style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <proj.icon />
              <h3 style={{ margin: 0 }}>{proj.title}</h3>
            </div>

            <p style={{ opacity: 0.8 }}>{proj.overview}</p>

            <div>
              <strong>Project Metrics & Scale</strong>
              <ul>
                {proj.metrics.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <a
                href={`https://github.com/guna-thota/${proj.repo}`}
                target="_blank"
                rel="noreferrer"
                style={chipStyle}
              >
                View Repository
              </a>
              <button style={chipStyle} onClick={() => setActiveProject(proj)}>
                View Architecture
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={modalOverlay}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              style={modalStyle}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>{activeProject.title} – Architecture</h3>
                <X onClick={() => setActiveProject(null)} style={{ cursor: "pointer" }} />
              </div>
              {activeProject.architecture}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ========================= STYLES ========================= */

const cardStyle = {
  background: "#132235",
  padding: 24,
  borderRadius: 12,
  border: "1px solid #1f3b57",
};

const btnStyle = {
  background: "#1976d2",
  padding: "8px 14px",
  borderRadius: 6,
  color: "white",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: 6,
};

const chipStyle = {
  background: "#0e3a5f",
  padding: "6px 12px",
  borderRadius: 6,
  border: "1px solid #1976d2",
  color: "white",
  cursor: "pointer",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#0b1622",
  padding: 30,
  borderRadius: 12,
  width: "700px",
  maxWidth: "95%",
  border: "1px solid #1f3b57",
};