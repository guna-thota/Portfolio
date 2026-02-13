import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Server,
  Database,
  BarChart3,
  Cloud,
  Sparkles,
  Mail,
  Linkedin,
  BadgeCheck,
  Gauge,
  Clock,
  Layers,
  X,
  LineChart,
  Brain,
  Cpu,
} from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

/* =========================
   PIPELINE CONFIG
   ========================= */

const PATH_D = "M 40 70 C 220 20, 360 120, 540 70 S 860 20, 1080 70";

const pipeline = [
  { id: "source", label: "Source Systems", hint: "APIs • files • operational DBs" },
  { id: "adf", label: "Azure Data Factory", hint: "orchestration • scheduling • retries" },
  { id: "adls", label: "ADLS Gen2", hint: "raw → bronze → silver → gold" },
  { id: "dbx", label: "Databricks (Spark)", hint: "transformations • incremental" },
  { id: "sqldw", label: "Azure SQL DW", hint: "modeling • performance" },
  { id: "bi", label: "BI Layer", hint: "KPIs • semantic layer" },
];

const summaryByStage = {
  source: {
    title: "Source Systems",
    bullets: [
      "Defined ingestion contracts (schema + SLAs)",
      "Validated early to prevent bad data entering the pipeline",
      "Captured metadata for traceability and auditability",
    ],
  },
  adf: {
    title: "Azure Data Factory",
    bullets: [
      "Parameterized pipelines for dev/stage/prod",
      "Retries + alerting for stable operations",
      "Idempotent loads using watermark strategy",
    ],
  },
  adls: {
    title: "ADLS Gen2",
    bullets: [
      "Layered lake design (raw/bronze/silver/gold)",
      "Partitioning aligned to reporting access patterns",
      "RBAC + lifecycle policies for governance and cost control",
    ],
  },
  dbx: {
    title: "Databricks (Spark)",
    bullets: [
      "PySpark transformations (cleanse, join, dedupe, enrich)",
      "Incremental processing (MERGE) to reduce compute and runtime",
      "Quality gates before publish to serving layer",
    ],
  },
  sqldw: {
    title: "Azure SQL DW",
    bullets: [
      "Star schema / dimensional modeling for analytics",
      "Index + execution plan tuning for faster queries",
      "Freshness monitoring for reporting SLAs",
    ],
  },
  bi: {
    title: "BI Layer",
    bullets: [
      "Standardized KPI definitions (single source of truth)",
      "Dashboards designed around decision workflows",
      "Controlled access to ensure trusted metrics",
    ],
  },
};

const technicalByStage = {
  source: {
    tech: ["REST APIs", "Batch ingestion", "Schema checks"],
    reliability: ["Schema drift detection", "Null/format validation", "Volume anomaly alerts"],
  },
  adf: {
    tech: ["ADF", "Managed Identity", "Key Vault"],
    reliability: ["Exponential retry", "Watermark incremental loads", "Alert routing by severity"],
  },
  adls: {
    tech: ["ADLS Gen2", "Parquet/Delta", "ACLs/RBAC"],
    reliability: ["Immutable raw zone", "Checksum/duplicate detection", "Partition strategy for performance"],
  },
  dbx: {
    tech: ["Databricks", "PySpark", "Delta Lake"],
    reliability: ["Skew handling + repartition", "AQE / caching where needed", "Pre-publish validation gates"],
  },
  sqldw: {
    tech: ["Azure SQL DW", "T-SQL", "Modeling"],
    reliability: ["Row-count reconciliation", "Index/statistics management", "Late-arrival handling"],
  },
  bi: {
    tech: ["Power BI / Tableau", "Semantic modeling"],
    reliability: ["Metric consistency checks", "Staleness indicators", "Governed access"],
  },
};

/* =========================
   PROJECTS (your 3 repos)
   Site titles avoid “AI” wording
   ========================= */

const projects = [
  {
    id: "proj1",
    icon: LineChart,
    title: "Farming Yield Prediction (Time-Series)",
    repo: "AI-Assisted-Farming-for-Crop-Recommendation-Farm-Yield-Prediction-Application",
    url: "https://github.com/guna-thota/AI-Assisted-Farming-for-Crop-Recommendation-Farm-Yield-Prediction-Application",
    oneLiner: "Multivariate seasonal modeling with an interpretable sequence approach for yield forecasting.",
    metrics: [
      "10+ years historical seasonal data (weather + outcomes)",
      "100K+ structured time-series records (engineering-scale)",
      "Benchmarked vs regression baselines (experimental comparison)",
      "Preprocessing pipeline optimized for retraining iterations",
    ],
    architectureTitle: "Architecture – Time-Series Modeling Flow",
    architectureSvg: (
      <svg viewBox="0 0 920 260" width="100%" height="220">
        <defs>
          <linearGradient id="azg1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(78,168,222,0.35)" />
            <stop offset="100%" stopColor="rgba(30,129,176,0.35)" />
          </linearGradient>
        </defs>

        <rect x="35" y="95" width="200" height="70" rx="14" fill="rgba(15,36,58,0.55)" stroke="rgba(78,168,222,0.35)" />
        <text x="135" y="130" fill="white" fontSize="14" textAnchor="middle">Historical Data</text>
        <text x="135" y="150" fill="rgba(255,255,255,0.65)" fontSize="12" textAnchor="middle">weather + yield</text>

        <rect x="285" y="95" width="200" height="70" rx="14" fill="rgba(15,36,58,0.55)" stroke="rgba(78,168,222,0.35)" />
        <text x="385" y="130" fill="white" fontSize="14" textAnchor="middle">Feature Engineering</text>
        <text x="385" y="150" fill="rgba(255,255,255,0.65)" fontSize="12" textAnchor="middle">weekly windows</text>

        <rect x="535" y="95" width="200" height="70" rx="14" fill="rgba(15,36,58,0.55)" stroke="rgba(78,168,222,0.35)" />
        <text x="635" y="130" fill="white" fontSize="14" textAnchor="middle">Sequence Model</text>
        <text x="635" y="150" fill="rgba(255,255,255,0.65)" fontSize="12" textAnchor="middle">attention + temporal</text>

        <rect x="785" y="95" width="100" height="70" rx="14" fill="rgba(15,36,58,0.55)" stroke="rgba(78,168,222,0.35)" />
        <text x="835" y="130" fill="white" fontSize="14" textAnchor="middle">Output</text>
        <text x="835" y="150" fill="rgba(255,255,255,0.65)" fontSize="12" textAnchor="middle">forecast</text>

        <line x1="235" y1="130" x2="285" y2="130" stroke="url(#azg1)" strokeWidth="2" />
        <line x1="485" y1="130" x2="535" y2="130" stroke="url(#azg1)" strokeWidth="2" />
        <line x1="735" y1="130" x2="785" y2="130" stroke="url(#azg1)" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "proj2",
    icon: Brain,
    title: "Gait Recognition (Video → Embeddings)",
    repo: "DNN-for-person-recognition-using-physiological-parameters",
    url: "https://github.com/guna-thota/DNN-for-person-recognition-using-physiological-parameters",
    oneLiner: "Two-stage pipeline transforming raw video frames into temporal embeddings for identification.",
    metrics: [
      "300+ subjects referenced in benchmark-style evaluation",
      "Thousands of frames processed per run (engineering-scale)",
      "Designed for robustness across covariate conditions",
      "Modular pipeline: pose extraction → temporal modeling → embedding",
    ],
    architectureTitle: "Architecture – Video Feature Pipeline",
    architectureSvg: (
      <svg viewBox="0 0 920 260" width="100%" height="220">
        <defs>
          <linearGradient id="azg2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(78,168,222,0.35)" />
            <stop offset="100%" stopColor="rgba(30,129,176,0.35)" />
          </linearGradient>
        </defs>

        <rect x="35" y="95" width="180" height="70" rx="14" fill="rgba(15,36,58,0.55)" stroke="rgba(78,168,222,0.35)" />
        <text x="125" y="130" fill="white" fontSize="14" textAnchor="middle">Video Frames</text>

        <rect x="255" y="95" width="220" height="70" rx="14" fill="rgba(15,36,58,0.55)" stroke="rgba(78,168,222,0.35)" />
        <text x="365" y="130" fill="white" fontSize="14" textAnchor="middle">Pose Extraction</text>
        <text x="365" y="150" fill="rgba(255,255,255,0.65)" fontSize="12" textAnchor="middle">spatial features</text>

        <rect x="515" y="95" width="220" height="70" rx="14" fill="rgba(15,36,58,0.55)" stroke="rgba(78,168,222,0.35)" />
        <text x="625" y="130" fill="white" fontSize="14" textAnchor="middle">Temporal Modeling</text>
        <text x="625" y="150" fill="rgba(255,255,255,0.65)" fontSize="12" textAnchor="middle">GRU/LSTM-style</text>

        <rect x="775" y="95" width="110" height="70" rx="14" fill="rgba(15,36,58,0.55)" stroke="rgba(78,168,222,0.35)" />
        <text x="830" y="130" fill="white" fontSize="14" textAnchor="middle">Embedding</text>

        <line x1="215" y1="130" x2="255" y2="130" stroke="url(#azg2)" strokeWidth="2" />
        <line x1="475" y1="130" x2="515" y2="130" stroke="url(#azg2)" strokeWidth="2" />
        <line x1="735" y1="130" x2="775" y2="130" stroke="url(#azg2)" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "proj3",
    icon: Cpu,
    title: "Natural Language → SQL Analysis Tool",
    repo: "Ai-dataanalysis-agent",
    url: "https://github.com/guna-thota/Ai-dataanalysis-agent",
    oneLiner: "A query interface that converts natural language questions into SQL and executes them on local tabular data.",
    metrics: [
      "CSV/Excel ingestion (tested locally up to ~100MB)",
      "Schema-aware SQL generation + query execution",
      "In-memory analytics via DuckDB (OLAP-style)",
      "Designed as a lightweight analyst workflow tool",
    ],
    architectureTitle: "Architecture – Query Translation & Execution",
    architectureSvg: (
      <svg viewBox="0 0 920 260" width="100%" height="220">
        <defs>
          <linearGradient id="azg3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(78,168,222,0.35)" />
            <stop offset="100%" stopColor="rgba(30,129,176,0.35)" />
          </linearGradient>
        </defs>

        <rect x="35" y="95" width="180" height="70" rx="14" fill="rgba(15,36,58,0.55)" stroke="rgba(78,168,222,0.35)" />
        <text x="125" y="130" fill="white" fontSize="14" textAnchor="middle">User Question</text>

        <rect x="255" y="95" width="220" height="70" rx="14" fill="rgba(15,36,58,0.55)" stroke="rgba(78,168,222,0.35)" />
        <text x="365" y="130" fill="white" fontSize="14" textAnchor="middle">SQL Translation</text>
        <text x="365" y="150" fill="rgba(255,255,255,0.65)" fontSize="12" textAnchor="middle">schema-aware</text>

        <rect x="515" y="95" width="220" height="70" rx="14" fill="rgba(15,36,58,0.55)" stroke="rgba(78,168,222,0.35)" />
        <text x="625" y="130" fill="white" fontSize="14" textAnchor="middle">Execution Engine</text>
        <text x="625" y="150" fill="rgba(255,255,255,0.65)" fontSize="12" textAnchor="middle">DuckDB</text>

        <rect x="775" y="95" width="110" height="70" rx="14" fill="rgba(15,36,58,0.55)" stroke="rgba(78,168,222,0.35)" />
        <text x="830" y="130" fill="white" fontSize="14" textAnchor="middle">Results</text>

        <line x1="215" y1="130" x2="255" y2="130" stroke="url(#azg3)" strokeWidth="2" />
        <line x1="475" y1="130" x2="515" y2="130" stroke="url(#azg3)" strokeWidth="2" />
        <line x1="735" y1="130" x2="775" y2="130" stroke="url(#azg3)" strokeWidth="2" />
      </svg>
    ),
  },
];

function NodeIcon({ id }) {
  const cls = "h-5 w-5";
  switch (id) {
    case "source":
      return <Server className={cls} />;
    case "adf":
      return <Cloud className={cls} />;
    case "adls":
      return <Database className={cls} />;
    case "dbx":
      return <Sparkles className={cls} />;
    case "sqldw":
      return <Database className={cls} />;
    case "bi":
      return <BarChart3 className={cls} />;
    default:
      return <Server className={cls} />;
  }
}

function Stat({ icon: Icon, label, value, note }) {
  return (
    <div className="panel" style={{ padding: 14 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div>
          <div className="smallTitle">{label}</div>
          <div style={{ fontSize: 18, fontWeight: 800, marginTop: 2 }}>{value}</div>
        </div>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.05)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {note ? <div style={{ marginTop: 8, fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{note}</div> : null}
    </div>
  );
}

/* =========================
   MODAL
   ========================= */

function Modal({ open, title, children, onClose }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
            display: "grid",
            placeItems: "center",
            zIndex: 9999,
            padding: 16,
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 10, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(920px, 96vw)",
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "linear-gradient(180deg, rgba(15,25,40,0.92), rgba(10,18,30,0.92))",
              boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <div style={{ fontWeight: 800 }}>{title}</div>
              <button className="btn" style={{ padding: "8px 10px" }} onClick={onClose} aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div style={{ padding: 16 }}>{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function App() {
  const [summaryMode, setSummaryMode] = useState(true);
  const [selected, setSelected] = useState("adf");
  const [activeProject, setActiveProject] = useState(null);

  const headline = useMemo(() => (summaryMode ? "Overview" : "Implementation"), [summaryMode]);

  const summary = summaryByStage[selected];
  const tech = technicalByStage[selected];

  return (
    <div style={{ position: "relative" }}>
      <div className="noise" />
      <div className="grid" />

      <div className="shell">
        {/* HEADER */}
        <div className="topbar">
          <div className="brand">
            <div className="logo" />
            <div>
              <h1>Guna Durga Prashanth Thota</h1>
              <p>Data Engineer (Azure + Spark)</p>
            </div>
          </div>

          <div className="actions">
            <div className="toggle" title="Toggle high-level vs technical detail">
              <span>Overview</span>
              <div className="switch" onClick={() => setSummaryMode((v) => !v)}>
                <motion.div
                  className="knob"
                  animate={{ x: summaryMode ? 0 : 18 }}
                  transition={{ type: "spring", stiffness: 520, damping: 30 }}
                />
              </div>
              <span>Implementation</span>
            </div>

            <a className="btn" href="mailto:gunaprashant@gmail.com">
              <Mail className="h-4 w-4" />
              <span style={{ marginLeft: 8 }}>Email</span>
            </a>

            <a className="btn" href="https://www.linkedin.com/in/gthota27/" target="_blank" rel="noreferrer">
              <Linkedin className="h-4 w-4" />
              <span style={{ marginLeft: 8 }}>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* HERO */}
        <div className="hero">
          <motion.div className="card" whileHover={{ y: -2 }}>
            <div className="cardInner">
              <h2 className="title">
                Azure Data Engineering
                <br />
                <span style={{ color: "rgba(255,255,255,0.65)" }}>
                  Production pipelines • reliability • performance
                </span>
              </h2>

              {/* Option B subtitle */}
              <div className="subtitle">
                {headline}. I like pipelines that don’t need babysitting. My focus is building Azure data systems that
                stay stable under real-world conditions—bad data, late arrivals, retries, and changing schemas. Below is
                the way I structure a typical end-to-end pipeline and what I optimize at each layer.
              </div>

              {/* 3-line professional summary */}
              <div className="panel" style={{ marginTop: 12 }}>
                <div className="smallTitle">Professional summary</div>
                <div style={{ marginTop: 8, color: "rgba(255,255,255,0.82)", lineHeight: 1.55 }}>
                  <div>Data Engineer building Azure-native pipelines that support analytics and ML workloads.</div>
                  <div>Focused on reliability (quality gates, reconciliation, monitoring) and predictable operations.</div>
                  <div>Hands-on with Spark transformations, modeling, and query performance tuning.</div>
                </div>
              </div>

              <div className="pills" style={{ marginTop: 12 }}>
                <span className="pill">
                  <ShieldCheck className="h-4 w-4" /> Production reliability
                </span>
                <span className="pill">ADF</span>
                <span className="pill">ADLS</span>
                <span className="pill">Databricks</span>
                <span className="pill">PySpark</span>
                <span className="pill">SQL DW</span>
              </div>

              {/* Updated stat copy (same positioning/layout) */}
              <div style={{ marginTop: 14, display: "grid", gap: 10, gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
                <Stat icon={BadgeCheck} label="Focus" value="Production Delivery" note="quality gates • SLAs • ownership" />
                <Stat icon={Gauge} label="Performance" value="Query & Cost" note="partitions • caching • tuning" />
                <Stat icon={Clock} label="Ops" value="Stable Runs" note="retries • alerts • recoveries" />
              </div>
            </div>
          </motion.div>

          <motion.div className="card" whileHover={{ y: -2 }}>
            <div className="cardInner">
              <div className="sectionTitle" style={{ marginTop: 0 }}>
                <h2>Projects</h2>
                <p>Selected work + how it’s built</p>
              </div>

              {/* PROJECT CARDS */}
              <div className="panel">
                <div className="smallTitle">Selected repositories</div>

                <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
                  {projects.map((p) => (
                    <motion.div
                      key={p.id}
                      className="panel"
                      style={{
                        padding: 12,
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))",
                      }}
                      whileHover={{ y: -2 }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                          <div className="badgeIcon" style={{ width: 34, height: 34 }}>
                            <p.icon className="h-5 w-5" />
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 800, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {p.title}
                            </div>
                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>
                              {p.oneLiner}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                          <a className="btn" href={p.url} target="_blank" rel="noreferrer">
                            Repo
                          </a>
                          <button className="btn" onClick={() => setActiveProject(p)}>
                            Architecture
                          </button>
                        </div>
                      </div>

                      {/* Metrics block */}
                      <div style={{ marginTop: 10 }}>
                        <div className="smallTitle">Scale & scope</div>
                        <ul className="list" style={{ marginTop: 8 }}>
                          {p.metrics.map((m) => (
                            <li key={m}>
                              <span className="dot" />
                              <span>{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div style={{ height: 12 }} />

              {/* Option A (replaces the AI-sounding panel) */}
              <div className="panel">
                <div className="smallTitle">What I optimize for</div>
                <ul className="list" style={{ marginTop: 10 }}>
                  <li>
                    <span className="dot" />
                    <span>I build pipelines with <b>clear contracts</b> (schema + SLAs) and enforce validation early.</span>
                  </li>
                  <li>
                    <span className="dot" />
                    <span>I design for <b>recovery</b>: retries, idempotency, and backfills without duplicate data.</span>
                  </li>
                  <li>
                    <span className="dot" />
                    <span>I tune for <b>cost and speed</b>: incremental loads, partitions, and query performance.</span>
                  </li>
                </ul>
              </div>

              <div style={{ height: 12 }} />

              <div className="panel">
                <div className="smallTitle">Contact</div>
                <div className="stack">
                  <a className="stackChip" href="mailto:gunaprashant@gmail.com">
                    gunaprashant@gmail.com
                  </a>
                  <a className="stackChip" href="https://www.linkedin.com/in/gthota27/" target="_blank" rel="noreferrer">
                    linkedin.com/in/gthota27
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* PIPELINE */}
        <div className="pipelineWrap">
          <div className="sectionTitle">
            <h2>End-to-End Data Pipeline Architecture</h2>
            <p>Click a stage to drill down • subtle packet animation indicates flow</p>
          </div>

          <motion.div className={cx("card", "pipelineCard")} whileHover={{ y: -2 }}>
            {/* Subtle flow line + data packets */}
            <svg
              width="100%"
              height="130"
              viewBox="0 0 1120 130"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                opacity: 0.55,
                pointerEvents: "none",
              }}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(78,168,222,0.26)" />
                  <stop offset="55%" stopColor="rgba(30,129,176,0.24)" />
                  <stop offset="100%" stopColor="rgba(20,93,160,0.22)" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path d={PATH_D} fill="none" stroke="url(#g)" strokeWidth="2" strokeDasharray="7 10" />

              {[0, 1, 2].map((i) => (
                <circle
                  key={i}
                  r={3}
                  cx={40}
                  cy={70}
                  fill="rgba(255,255,255,0.55)"
                  filter="url(#glow)"
                  opacity={0.38}
                >
                  <animateMotion dur="7s" repeatCount="indefinite" begin={`${i * 2}s`} path={PATH_D} />
                  <animate attributeName="opacity" values="0.10;0.45;0.10" dur="2.8s" repeatCount="indefinite" />
                </circle>
              ))}
            </svg>

            <div className="pipelineRow">
              {pipeline.map((n) => (
                <div key={n.id} className={cx("node", selected === n.id && "nodeActive")} onClick={() => setSelected(n.id)}>
                  <div className="nodeTop">
                    <div className="nodeLeft">
                      <div className="badgeIcon">
                        <NodeIcon id={n.id} />
                      </div>
                      <div>
                        <div className="nodeLabel">{n.label}</div>
                        <div className="nodeHint">{n.hint}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="detailGrid">
              <div className="panel">
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <h3 style={{ margin: 0 }}>{summary.title}</h3>
                    <div style={{ marginTop: 6, fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
                      {summaryMode ? "Summary" : "Details"}
                    </div>
                  </div>
                  <div className="stackChip" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <Layers className="h-4 w-4" /> {summaryMode ? "Overview" : "Implementation"}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {summaryMode ? (
                    <motion.ul
                      key="summary"
                      className="list"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.16 }}
                      style={{ marginTop: 12 }}
                    >
                      {summary.bullets.map((b) => (
                        <li key={b}>
                          <span className="dot" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </motion.ul>
                  ) : (
                    <motion.div
                      key="technical"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.16 }}
                      style={{ marginTop: 12 }}
                    >
                      <div className="smallTitle">Tech</div>
                      <div className="stack">
                        {tech.tech.map((t) => (
                          <span key={t} className="stackChip">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div style={{ height: 12 }} />

                      <div className="smallTitle">Reliability controls</div>
                      <ul className="list" style={{ marginTop: 10 }}>
                        {tech.reliability.map((r) => (
                          <li key={r}>
                            <span className="dot" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="panel">
                <div className="smallTitle">Production principles</div>
                <ul className="list" style={{ marginTop: 10 }}>
                  <li><span className="dot" /><span><b>Observability:</b> freshness, failures, volume anomalies, drift.</span></li>
                  <li><span className="dot" /><span><b>Data quality:</b> validation gates + reconciliation before publish.</span></li>
                  <li><span className="dot" /><span><b>Cost & performance:</b> incremental loads, partitions, query tuning.</span></li>
                  <li><span className="dot" /><span><b>Governance:</b> access control, audit-friendly logging, clear ownership.</span></li>
                </ul>

                <div style={{ height: 12 }} />

                {/* Option A project notes */}
                <div className="smallTitle">Project notes</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.55 }}>
                  Every project includes a short architecture view and the engineering choices that mattered: data shape,
                  validation, scaling, and execution.
                </div>
              </div>
            </div>
          </motion.div>

          <div className="footer">© {new Date().getFullYear()} • guna-thota</div>
        </div>
      </div>

      {/* Architecture Modal */}
      <Modal open={!!activeProject} title={activeProject?.architectureTitle || "Architecture"} onClose={() => setActiveProject(null)}>
        {activeProject ? (
          <div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, marginBottom: 10 }}>
              Repository:{" "}
              <a href={activeProject.url} target="_blank" rel="noreferrer" style={{ color: "rgba(120,200,255,0.95)" }}>
                {activeProject.repo}
              </a>
            </div>
            <div
              style={{
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.10)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                padding: 12,
              }}
            >
              {activeProject.architectureSvg}
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
