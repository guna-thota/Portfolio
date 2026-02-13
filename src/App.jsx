import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Server,
  Database,
  BarChart3,
  Cloud,
  Code2,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const pipeline = [
  { id: "source", label: "Source", hint: "Contracts • validation • drift" },
  { id: "adf", label: "ADF", hint: "Orchestrate • retries • idempotency" },
  { id: "adls", label: "ADLS", hint: "Zones • partitions • governance" },
  { id: "dbx", label: "Databricks", hint: "Spark • incremental • quality gates" },
  { id: "sqldw", label: "SQL DW", hint: "Modeling • tuning • freshness" },
  { id: "bi", label: "BI", hint: "KPIs • semantic layer • trust" },
];

const NodeIcon = ({ id }) => {
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
      return <Code2 className={cls} />;
  }
};

const recruiterSummary = {
  source: {
    title: "Sources",
    subtitle: "Apps, APIs, files, streams",
    highlights: [
      "Defined ingestion contracts (schema + SLAs)",
      "Validated formats early to reduce downstream failures",
      "Added lightweight data quality checks",
    ],
  },
  adf: {
    title: "Azure Data Factory",
    subtitle: "Orchestration & scheduling",
    highlights: [
      "Built parameterized pipelines (dev/stage/prod)",
      "Retries + alerting for safe operations",
      "Idempotent runs to avoid duplicates",
    ],
  },
  adls: {
    title: "ADLS",
    subtitle: "Landing + curated storage",
    highlights: [
      "Layered zones (raw/bronze/silver/gold)",
      "Partitioning tuned for BI filters",
      "Access controls + lifecycle management",
    ],
  },
  dbx: {
    title: "Databricks",
    subtitle: "Transformations at scale",
    highlights: [
      "Spark jobs for cleansing + enrichment",
      "Incremental processing to cut costs",
      "Job monitoring + guardrails",
    ],
  },
  sqldw: {
    title: "SQL DW",
    subtitle: "Serving layer",
    highlights: [
      "Dimensional modeling for analytics",
      "Indexing + query tuning",
      "Data freshness monitoring",
    ],
  },
  bi: {
    title: "BI",
    subtitle: "Dashboards & decisioning",
    highlights: [
      "Executive dashboards with clear KPIs",
      "Metric logic standardized (single source of truth)",
      "Enabled self-serve insights",
    ],
  },
};

const engineerDeep = {
  source: {
    what: [
      "Negotiated source contracts: schema, required fields, and change management.",
      "Implemented early validation (type checks, null thresholds, sanity constraints).",
    ],
    tech: ["REST APIs", "Batch files", "Event logs"],
    reliability: [
      "Schema drift detection + quarantine lane",
      "Sampling-based anomaly checks (volume, null%, distinct counts)",
      "Backpressure limits on bursts",
    ],
  },
  adf: {
    what: [
      "Built modular ADF pipelines (copy → transform → notify) with parameters.",
      "Added run IDs + correlation IDs to trace lineage end-to-end.",
    ],
    tech: ["ADF", "Managed Identity", "Key Vault"],
    reliability: [
      "Exponential retry + circuit breaker for flaky sources",
      "Idempotency keys + watermarking",
      "Alert routing by severity (on-call vs FYI)",
    ],
  },
  adls: {
    what: [
      "Designed lake zones with consistent folder conventions and naming.",
      "Optimized partitioning for typical BI usage (date, region, product).",
    ],
    tech: ["ADLS Gen2", "Delta/Parquet", "RBAC/ACLs"],
    reliability: [
      "Immutable raw + append-only patterns",
      "Lifecycle rules + cost controls",
      "Checksum validation + duplicate detection",
    ],
  },
  dbx: {
    what: [
      "Spark transformations: cleansing, joins, dedupe, SCD handling, enrichment.",
      "Incremental processing using watermarks and MERGE patterns.",
    ],
    tech: ["Databricks", "Apache Spark", "Delta Lake"],
    reliability: [
      "Job SLOs (duration/failure rate) + auto-remediation hooks",
      "Skew handling (salting, repartition) + AQE",
      "Data quality gates before publish",
    ],
  },
  sqldw: {
    what: [
      "Modeled serving tables (star schema) and aggregation tables.",
      "Query optimization: indexing strategy + materialized summaries.",
    ],
    tech: ["SQL DW/Synapse", "T-SQL", "Dimensional modeling"],
    reliability: [
      "Freshness SLAs + late-arrival handling",
      "Row-count reconciliation across layers",
      "Governed access + audit-friendly logging",
    ],
  },
  bi: {
    what: [
      "Defined a metric layer: consistent KPI definitions and filters.",
      "Built dashboards focused on decision loops (not vanity charts).",
    ],
    tech: ["Power BI/Tableau", "Semantic layer", "KPIs"],
    reliability: [
      "Metric tests (same query, same answer) + versioning",
      "Staleness warnings + confidence indicators",
      "Cache strategy tuned for peak usage",
    ],
  },
};

function CopyButton({ value }) {
  const [ok, setOk] = useState(false);

  return (
    <button
      className="btn"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setOk(true);
          setTimeout(() => setOk(false), 1200);
        } catch {}
      }}
      type="button"
    >
      {ok ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span style={{ marginLeft: 8 }}>{ok ? "Copied" : "Copy"}</span>
    </button>
  );
}

export default function App() {
  const [recruiterMode, setRecruiterMode] = useState(true);
  const [selected, setSelected] = useState("adf");

  const headline = useMemo(
    () =>
      recruiterMode
        ? "Recruiter Mode: crisp highlights, impact-first."
        : "Engineer Mode: deep technical detail + reliability guardrails.",
    [recruiterMode]
  );

  const summary = recruiterSummary[selected];
  const deep = engineerDeep[selected];

  return (
    <>
      <div className="noise" />
      <div className="grid" />

      <div className="shell">
        {/* Topbar */}
        <div className="topbar">
          <div className="brand">
            <div className="logo" />
            <div style={{ minWidth: 0 }}>
              <h1>Guna Durga Prashanth Thota</h1>
              <p>Data Engineering • Systems • Reliability • Cloud</p>
            </div>
          </div>

          <div className="actions">
            <div className="toggle">
              <span>Recruiter</span>
              <div
                className="switch"
                onClick={() => setRecruiterMode((v) => !v)}
                role="switch"
                aria-checked={!recruiterMode}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setRecruiterMode((v) => !v);
                }}
              >
                <motion.div
                  className="knob"
                  animate={{ x: recruiterMode ? 0 : 18 }}
                  transition={{ type: "spring", stiffness: 520, damping: 30 }}
                />
              </div>
              <span>Engineer</span>
            </div>

            <CopyButton value="Guna Durga Prashanth Thota" />
          </div>
        </div>

        {/* Hero */}
        <div className="hero">
          <div className="card">
            <div className="cardInner">
              <motion.h2
                className="title"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
              >
                Premium portfolio.
                <br />
                <span style={{ color: "rgba(255,255,255,0.65)" }}>
                  Two brains: recruiter + engineer.
                </span>
              </motion.h2>

              <div className="subtitle">
                {headline} Click each pipeline node to reveal what I built, the tech behind it, and the
                reliability tricks that keep it stable in production.
              </div>

              <div className="pills">
                <span className="pill"><ShieldCheck className="h-4 w-4" /> Reliability-first</span>
                <span className="pill"><Code2 className="h-4 w-4" /> Systems thinking</span>
                <span className="pill"><Sparkles className="h-4 w-4" /> Pipeline craftsmanship</span>
                <span className="pill">Python</span>
                <span className="pill">SQL</span>
                <span className="pill">Cloud</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="cardInner">
              <div className="sectionTitle" style={{ marginTop: 0 }}>
                <h2>Featured Repos</h2>
                <p>(placeholders — swap later)</p>
              </div>

              <div className="panel">
                <div className="smallTitle">Quick links</div>
                <div className="stack">
                  {[
                    "lakehouse-blueprint",
                    "spark-quality-gates",
                    "pipeline-observability",
                    "sql-warehouse-playbook",
                  ].map((r) => (
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
                <div className="smallTitle">Contact</div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.6 }}>
                  Add your LinkedIn + email here after you’re happy with the layout.
                  <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
                    <a className="stackChip" href="https://github.com/guna-thota" target="_blank" rel="noreferrer">
                      github.com/guna-thota
                    </a>
                    <a className="stackChip" href="mailto:you@example.com">you@example.com</a>
                    <a className="stackChip" href="https://www.linkedin.com/in/" target="_blank" rel="noreferrer">
                      linkedin.com/in/your-handle
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Pipeline */}
        <div className="pipelineWrap">
          <div className="sectionTitle">
            <h2>Interactive Data Pipeline</h2>
            <p>Source → ADF → ADLS → Databricks → SQL DW → BI</p>
          </div>

          <div className={cx("card", "pipelineCard")}>
            {/* animated connector line */}
            <svg
              width="100%"
              height="130"
              viewBox="0 0 1120 130"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                opacity: 0.40,
                pointerEvents: "none",
              }}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(139,92,246,0.35)" />
                  <stop offset="45%" stopColor="rgba(6,182,212,0.35)" />
                  <stop offset="100%" stopColor="rgba(34,197,94,0.35)" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 40 70 C 220 20, 360 120, 540 70 S 860 20, 1080 70"
                fill="none"
                stroke="url(#g)"
                strokeWidth="2"
                strokeDasharray="6 10"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>

            <div className="pipelineRow">
              {pipeline.map((n) => {
                const active = selected === n.id;
                return (
                  <motion.div
                    key={n.id}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={cx("node", active && "nodeActive")}
                    onClick={() => setSelected(n.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setSelected(n.id);
                    }}
                  >
                    <div className="nodeTop">
                      <div className="nodeLeft">
                        <div className="badgeIcon">
                          <NodeIcon id={n.id} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div className="nodeLabel">{n.label}</div>
                          <div className="nodeHint">{n.hint}</div>
                        </div>
                      </div>

                      <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 12 }}>
                        {active ? "Selected" : ""}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="detailGrid">
              <div className="panel">
                <h3>{summary.title}</h3>
                <p>{summary.subtitle}</p>

                <AnimatePresence mode="wait">
                  {recruiterMode ? (
                    <motion.div
                      key="rec"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.16 }}
                    >
                      <div className="smallTitle" style={{ marginTop: 12 }}>
                        Recruiter highlights
                      </div>
                      <ul className="list">
                        {summary.highlights.map((h) => (
                          <li key={h}>
                            <span className="dot" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="eng"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.16 }}
                    >
                      <div className="smallTitle" style={{ marginTop: 12 }}>
                        What I did
                      </div>
                      <ul className="list">
                        {deep.what.map((w) => (
                          <li key={w}>
                            <span className="dot" />
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="panel">
                <div className="smallTitle">Tech</div>
                <div className="stack">
                  {deep.tech.map((t) => (
                    <span key={t} className="stackChip">{t}</span>
                  ))}
                </div>

                <div style={{ height: 12 }} />

                <div className="smallTitle">Reliability tricks</div>
                <ul className="list">
                  {deep.reliability.map((r) => (
                    <li key={r}>
                      <span className="dot" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="footer">
            © {new Date().getFullYear()} • guna-thota • Built to feel premium, not basic
          </div>
        </div>
      </div>
    </>
  );
}
