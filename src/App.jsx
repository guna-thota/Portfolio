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
  Mail,
  Linkedin,
} from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const pipeline = [
  { id: "source", label: "Source", hint: "contracts • validation • drift" },
  { id: "adf", label: "ADF", hint: "orchestration • retries • idempotency" },
  { id: "adls", label: "ADLS", hint: "zones • partitions • governance" },
  { id: "dbx", label: "Databricks", hint: "spark • incremental • quality gates" },
  { id: "sqldw", label: "SQL DW", hint: "modeling • tuning • freshness" },
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
      "Defined source contracts: schema, required fields, and change management.",
      "Early validation: type checks, null thresholds, sanity constraints.",
    ],
    tech: ["REST APIs", "Batch files", "Event logs"],
    reliability: [
      "Schema drift detection + quarantine lane",
      "Sampling anomaly checks (volume, null%, distinct counts)",
      "Backpressure limits on bursts",
    ],
  },
  adf: {
    what: [
      "Built modular ADF pipelines (copy → transform → notify) with parameters.",
      "Run IDs + correlation IDs to trace lineage end-to-end.",
    ],
    tech: ["ADF", "Managed Identity", "Key Vault"],
    reliability: [
      "Exponential retry + circuit breaker for flaky sources",
      "Idempotency keys + watermarking",
      "Alert routing by severity",
    ],
  },
  adls: {
    what: [
      "Designed lake zones with consistent naming and folder conventions.",
      "Partitioning strategy aligned to BI access patterns.",
    ],
    tech: ["ADLS Gen2", "Delta/Parquet", "RBAC/ACLs"],
    reliability: [
      "Immutable raw + append-only patterns",
      "Lifecycle rules + cost controls",
      "Checksum + duplicate detection",
    ],
  },
  dbx: {
    what: [
      "Spark transformations: cleansing, joins, dedupe, SCD handling.",
      "Incremental processing using watermarks + MERGE patterns.",
    ],
    tech: ["Databricks", "Apache Spark", "Delta Lake"],
    reliability: [
      "Job SLOs (duration/failure rate) + monitoring",
      "Skew handling + AQE",
      "Quality gates before publish",
    ],
  },
  sqldw: {
    what: [
      "Serving models: star schema + aggregation tables.",
      "Query optimization: indexing + materialized summaries.",
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
      "Defined metric layer: consistent KPI definitions and filters.",
      "Dashboards focused on decision loops and trust in metrics.",
    ],
    tech: ["Power BI/Tableau", "Semantic layer", "KPIs"],
    reliability: [
      "Metric tests + versioning",
      "Staleness warnings + confidence indicators",
      "Cache strategy for peak usage",
    ],
  },
};

export default function App() {
  const [summaryMode, setSummaryMode] = useState(true);
  const [selected, setSelected] = useState("adf");

  const headline = useMemo(
    () =>
      summaryMode
        ? "Summary view: outcomes, scope, and what shipped."
        : "Technical view: implementation detail + reliability guardrails.",
    [summaryMode]
  );

  const summary = recruiterSummary[selected];
  const deep = engineerDeep[selected];

  return (
    <div style={{ position: "relative" }}>
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
              <span>Summary</span>
              <div
                className="switch"
                onClick={() => setSummaryMode((v) => !v)}
                role="switch"
                aria-checked={!summaryMode}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSummaryMode((v) => !v);
                }}
              >
                <motion.div
                  className="knob"
                  animate={{ x: summaryMode ? 0 : 18 }}
                  transition={{ type: "spring", stiffness: 520, damping: 30 }}
                />
              </div>
              <span>Technical</span>
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
                Data Engineering Portfolio
                <br />
                <span style={{ color: "rgba(255,255,255,0.65)" }}>
                  Pipeline architecture • reliability • system thinking
                </span>
              </motion.h2>

              <div className="subtitle">
                {headline} Click a pipeline stage to drill into scope, tooling, and reliability
                decisions (idempotency, drift handling, monitoring, SLAs).
              </div>

              <div className="pills">
                <span className="pill">
                  <ShieldCheck className="h-4 w-4" /> Reliability-first
                </span>
                <span className="pill">
                  <Code2 className="h-4 w-4" /> System design mindset
                </span>
                <span className="pill">
                  <Sparkles className="h-4 w-4" /> Production guardrails
                </span>
                <span className="pill">Python</span>
                <span className="pill">SQL</span>
                <span className="pill">Cloud</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="cardInner">
              <div className="sectionTitle" style={{ marginTop: 0 }}>
                <h2>About</h2>
                <p>What I work on</p>
              </div>

              <div className="panel">
                <div className="smallTitle">Scope</div>
                <ul className="list">
                  <li><span className="dot" />End-to-end pipelines: ingestion → lake → transforms → warehouse → BI</li>
                  <li><span className="dot" />Reliability: idempotency, retries, drift handling, monitoring, SLAs</li>
                  <li><span className="dot" />Performance + cost: partitioning, incremental loads, query tuning</li>
                </ul>
              </div>

              <div style={{ height: 12 }} />

              <div className="panel">
                <div className="smallTitle">Projects</div>
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
                <div className="stack">
                  <a className="stackChip" href="https://github.com/guna-thota" target="_blank" rel="noreferrer">
                    github.com/guna-thota
                  </a>
                  <a className="stackChip" href="mailto:gunaprashant@gmail.com">
                    gunaprashant@gmail.com
                  </a>
                  <a className="stackChip" href="https://www.linkedin.com/in/gthota27/" target="_blank" rel="noreferrer">
                    linkedin.com/in/gthota27
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pipeline */}
        <div className="pipelineWrap">
          <div className="sectionTitle">
            <h2>End-to-End Data Pipeline</h2>
            <p>Source → ADF → ADLS → Databricks → SQL DW → BI • click a stage</p>
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
                      {/* intentionally blank: no “Selected” text */}
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
                  {summaryMode ? (
                    <motion.div
                      key="sum"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.16 }}
                    >
                      <div className="smallTitle" style={{ marginTop: 12 }}>
                        Summary
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
                      key="tech"
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
                    <span key={t} className="stackChip">
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ height: 12 }} />

                <div className="smallTitle">Reliability</div>
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

          <div className="footer">© {new Date().getFullYear()} • guna-thota</div>
        </div>
      </div>
    </div>
  );
}
