import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Server,
  Database,
  BarChart3,
  Cloud,
  Code2,
  Sparkles,
} from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const NodeIcon = ({ id }) => {
  const common = "h-5 w-5";
  switch (id) {
    case "source":
      return <Server className={common} />;
    case "adf":
      return <Cloud className={common} />;
    case "adls":
      return <Database className={common} />;
    case "dbx":
      return <Sparkles className={common} />;
    case "sqldw":
      return <Database className={common} />;
    case "bi":
      return <BarChart3 className={common} />;
    default:
      return <Code2 className={common} />;
  }
};

const recruiterSummary = {
  source: {
    title: "Sources",
    subtitle: "Apps, APIs, files, streams",
    highlights: [
      "Defined ingestion contracts",
      "Added schema validation",
      "Early data quality checks",
    ],
  },
  adf: {
    title: "Azure Data Factory",
    subtitle: "Orchestration",
    highlights: [
      "Parameterized pipelines",
      "Retry + alerting system",
      "Idempotent runs",
    ],
  },
  adls: {
    title: "ADLS",
    subtitle: "Data Lake",
    highlights: [
      "Raw → Bronze → Silver → Gold",
      "Partitioning strategy",
      "Access control + lifecycle rules",
    ],
  },
  dbx: {
    title: "Databricks",
    subtitle: "Transformations",
    highlights: [
      "Spark transformations",
      "Incremental processing",
      "Job monitoring",
    ],
  },
  sqldw: {
    title: "SQL Warehouse",
    subtitle: "Serving layer",
    highlights: [
      "Star schema modeling",
      "Query tuning",
      "Freshness monitoring",
    ],
  },
  bi: {
    title: "BI",
    subtitle: "Dashboards",
    highlights: [
      "Executive KPIs",
      "Metric standardization",
      "Self-serve analytics",
    ],
  },
};

const engineerDeep = {
  source: {
    what: [
      "Designed ingestion contracts (schema + SLAs).",
      "Handled schema drift with quarantine layer.",
    ],
    tech: ["REST APIs", "Batch Files"],
    reliability: ["Validation gates", "Anomaly detection"],
  },
  adf: {
    what: [
      "Modular ADF pipelines with run IDs.",
      "Correlation IDs for lineage.",
    ],
    tech: ["ADF", "Managed Identity"],
    reliability: ["Retries", "Alert routing"],
  },
  adls: {
    what: [
      "Layered lake design.",
      "Optimized partitions.",
    ],
    tech: ["ADLS Gen2", "Delta"],
    reliability: ["Immutable raw zone", "Checksum validation"],
  },
  dbx: {
    what: [
      "Spark joins, dedupe, SCD handling.",
      "MERGE for incremental loads.",
    ],
    tech: ["Databricks", "Spark"],
    reliability: ["Adaptive query execution", "Quality gates"],
  },
  sqldw: {
    what: [
      "Star schema modeling.",
      "Aggregate tables for performance.",
    ],
    tech: ["SQL", "Synapse"],
    reliability: ["Freshness SLA checks"],
  },
  bi: {
    what: [
      "Metric layer definition.",
      "Decision-focused dashboards.",
    ],
    tech: ["Power BI"],
    reliability: ["Metric validation tests"],
  },
};

const pipeline = [
  { id: "source", label: "Source" },
  { id: "adf", label: "ADF" },
  { id: "adls", label: "ADLS" },
  { id: "dbx", label: "Databricks" },
  { id: "sqldw", label: "SQL DW" },
  { id: "bi", label: "BI" },
];

export default function App() {
  const [recruiterMode, setRecruiterMode] = useState(true);
  const [selected, setSelected] = useState("adf");

  const headline = useMemo(() => {
    return recruiterMode
      ? "Recruiter Mode: Impact-first summary"
      : "Engineer Mode: Deep technical breakdown";
  }, [recruiterMode]);

  return (
    <div style={{ background: "#0d1117", color: "white", minHeight: "100vh", padding: "40px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "32px" }}>
        Guna Durga Prashanth Thota
      </h1>

      <p>{headline}</p>

      <div style={{ margin: "20px 0" }}>
        <button onClick={() => setRecruiterMode(true)}>Recruiter View</button>
        <button onClick={() => setRecruiterMode(false)} style={{ marginLeft: "10px" }}>
          Engineer View
        </button>
      </div>

      <h2>Interactive Data Pipeline</h2>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "30px" }}>
        {pipeline.map((node) => (
          <button
            key={node.id}
            onClick={() => setSelected(node.id)}
            style={{
              padding: "10px 15px",
              background: selected === node.id ? "#238636" : "#21262d",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {node.label}
          </button>
        ))}
      </div>

      <div style={{ background: "#161b22", padding: "20px", borderRadius: "8px" }}>
        <h3>{recruiterSummary[selected].title}</h3>
        <p>{recruiterSummary[selected].subtitle}</p>

        {recruiterMode ? (
          <ul>
            {recruiterSummary[selected].highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <>
            <h4>What I Did</h4>
            <ul>
              {engineerDeep[selected].what.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h4>Tech</h4>
            <p>{engineerDeep[selected].tech.join(", ")}</p>

            <h4>Reliability Tricks</h4>
            <ul>
              {engineerDeep[selected].reliability.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      <hr style={{ margin: "40px 0" }} />

      <h2>Featured Projects</h2>
      <ul>
        <li><a href="https://github.com/guna-thota/lakehouse-blueprint" target="_blank">lakehouse-blueprint</a></li>
        <li><a href="https://github.com/guna-thota/spark-quality-gates" target="_blank">spark-quality-gates</a></li>
        <li><a href="https://github.com/guna-thota/pipeline-observability" target="_blank">pipeline-observability</a></li>
        <li><a href="https://github.com/guna-thota/sql-warehouse-playbook" target="_blank">sql-warehouse-playbook</a></li>
      </ul>

      <p style={{ marginTop: "40px", fontSize: "12px", opacity: 0.6 }}>
        © {new Date().getFullYear()} Guna Thota
      </p>
    </div>
  );
}
