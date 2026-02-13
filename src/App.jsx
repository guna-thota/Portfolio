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
    reliability: [
      "Schema drift detection",
      "Null/format validation",
      "Volume anomaly alerts",
    ],
  },
  adf: {
    tech: ["ADF", "Managed Identity", "Key Vault"],
    reliability: [
      "Exponential retry",
      "Watermark incremental loads",
      "Alert routing by severity",
    ],
  },
  adls: {
    tech: ["ADLS Gen2", "Parquet/Delta", "ACLs/RBAC"],
    reliability: [
      "Immutable raw zone",
      "Checksum/duplicate detection",
      "Partition strategy for performance",
    ],
  },
  dbx: {
    tech: ["Databricks", "PySpark", "Delta Lake"],
    reliability: [
      "Skew handling + repartition",
      "AQE / caching where needed",
      "Pre-publish validation gates",
    ],
  },
  sqldw: {
    tech: ["Azure SQL DW", "T-SQL", "Modeling"],
    reliability: [
      "Row-count reconciliation",
      "Index/statistics management",
      "Late-arrival handling",
    ],
  },
  bi: {
    tech: ["Power BI / Tableau", "Semantic modeling"],
    reliability: [
      "Metric consistency checks",
      "Staleness indicators",
      "Governed access",
    ],
  },
};

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

export default function App() {
  const [summaryMode, setSummaryMode] = useState(true);
  const [selected, setSelected] = useState("adf");

  const headline = useMemo(
    () =>
      summaryMode
        ? "Recruiter view: scope, ownership, and outcomes."
        : "Engineer view: implementation details + reliability controls.",
    [summaryMode]
  );

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
            <div className="toggle" title="Toggle recruiter vs technical detail">
              <span>Recruiter</span>
              <div className="switch" onClick={() => setSummaryMode((v) => !v)}>
                <motion.div
                  className="knob"
                  animate={{ x: summaryMode ? 0 : 18 }}
                  transition={{ type: "spring", stiffness: 520, damping: 30 }}
                />
              </div>
              <span>Engineer</span>
            </div>

            <a className="btn" href="mailto:gunaprashant@gmail.com">
              <Mail className="h-4 w-4" />
              <span style={{ marginLeft: 8 }}>Email</span>
            </a>

            <a
              className="btn"
              href="https://www.linkedin.com/in/gthota27/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="h-4 w-4" />
              <span style={{ marginLeft: 8 }}>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* HERO */}
        <div className="hero">
          <div className="card">
            <div className="cardInner">
              <h2 className="title">
                Azure Data Engineering
                <br />
                <span style={{ color: "rgba(255,255,255,0.65)" }}>
                  Production pipelines • reliability • performance
                </span>
              </h2>

              <div className="subtitle">
                {headline} This site is designed to make it easy to evaluate fit: pipeline ownership,
                production readiness, and the thinking behind reliability and performance.
              </div>

              <div className="pills">
                <span className="pill"><ShieldCheck className="h-4 w-4" /> Production reliability</span>
                <span className="pill">ADF</span>
                <span className="pill">ADLS</span>
                <span className="pill">Databricks</span>
                <span className="pill">PySpark</span>
                <span className="pill">SQL DW</span>
              </div>

              <div style={{ marginTop: 14, display: "grid", gap: 10, gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
                <Stat icon={BadgeCheck} label="Focus" value="Production" note="quality • SLAs • monitoring" />
                <Stat icon={Gauge} label="Performance" value="Tuning" note="queries • indexes • partitions" />
                <Stat icon={Clock} label="Ops" value="Support" note="alerts • retries • recovery" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="cardInner">
              <div className="sectionTitle" style={{ marginTop: 0 }}>
                <h2>Projects</h2>
                <p>Repos (placeholders for now)</p>
              </div>

              <div className="panel">
                <div className="smallTitle">Repositories</div>
                <div className="stack">
                  {["repo-1", "repo-2", "repo-3"].map((r) => (
                    <a
                      key={r}
                      className="stackChip"
                      href={`https://github.com/guna-thota/${r}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {r}
                    </a>
                  ))}
                </div>
              </div>

              <div style={{ height: 12 }} />

              <div className="panel">
                <div className="smallTitle">What recruiters usually care about</div>
                <ul className="list" style={{ marginTop: 10 }}>
                  <li><span className="dot" /><span>Can you own production pipelines end-to-end?</span></li>
                  <li><span className="dot" /><span>Do you prevent bad data and detect issues fast?</span></li>
                  <li><span className="dot" /><span>Can you tune performance and manage cost?</span></li>
                </ul>
              </div>

              <div style={{ height: 12 }} />

              <div className="panel">
                <div className="smallTitle">Contact</div>
                <div className="stack">
                  <a className="stackChip" href="mailto:gunaprashant@gmail.com">gunaprashant@gmail.com</a>
                  <a className="stackChip" href="https://www.linkedin.com/in/gthota27/" target="_blank" rel="noreferrer">
                    linkedin.com/in/gthota27
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PIPELINE */}
        <div className="pipelineWrap">
          <div className="sectionTitle">
            <h2>End-to-End Data Pipeline Architecture</h2>
            <p>Click a stage to drill down • subtle packet animation indicates flow</p>
          </div>

          <div className={cx("card", "pipelineCard")}>
            {/* Subtle flow line + data packets (non-gimmicky) */}
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
                  <stop offset="0%" stopColor="rgba(139,92,246,0.28)" />
                  <stop offset="45%" stopColor="rgba(6,182,212,0.26)" />
                  <stop offset="100%" stopColor="rgba(34,197,94,0.26)" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                d={PATH_D}
                fill="none"
                stroke="url(#g)"
                strokeWidth="2"
                strokeDasharray="7 10"
              />

              {/* Data packets (subtle, slow, staggered) */}
              {[0, 1, 2].map((i) => (
                <circle
                  key={i}
                  r={3}
                  cx={40}
                  cy={70}
                  fill="rgba(255,255,255,0.55)"
                  filter="url(#glow)"
                  opacity={0.45}
                >
                  <animateMotion
                    dur="7s"
                    repeatCount="indefinite"
                    begin={`${i * 2}s`}
                    path={PATH_D}
                  />
                  <animate
                    attributeName="opacity"
                    values="0.12;0.55;0.12"
                    dur="2.8s"
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </svg>

            <div className="pipelineRow">
              {pipeline.map((n) => (
                <div
                  key={n.id}
                  className={cx("node", selected === n.id && "nodeActive")}
                  onClick={() => setSelected(n.id)}
                >
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
                      {summaryMode ? "Outcome-oriented summary" : "Implementation detail"}
                    </div>
                  </div>
                  <div className="stackChip" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <Layers className="h-4 w-4" /> {summaryMode ? "Recruiter" : "Engineer"}
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
                          <span key={t} className="stackChip">{t}</span>
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

              {/* Right panel: Recruiter-friendly “Proof” block */}
              <div className="panel">
                <div className="smallTitle">How I think about production (2026)</div>
                <ul className="list" style={{ marginTop: 10 }}>
                  <li><span className="dot" /><span><b>Observability:</b> freshness, failures, volume anomalies, drift.</span></li>
                  <li><span className="dot" /><span><b>Data quality:</b> validation gates + reconciliation before publish.</span></li>
                  <li><span className="dot" /><span><b>Cost & performance:</b> incremental loads, partitions, query tuning.</span></li>
                  <li><span className="dot" /><span><b>Governance:</b> access control, audit-friendly logging, clear ownership.</span></li>
                </ul>

                <div style={{ height: 12 }} />

                <div className="smallTitle">Next upgrades (as repos land)</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.55 }}>
                  I’ll publish short, real case studies for repo-1/2/3 showing architecture, tradeoffs, and measurable outcomes.
                </div>
              </div>
            </div>
          </div>

          <div className="footer">© {new Date().getFullYear()} • guna-thota</div>
        </div>
      </div>
    </div>
  );
}
