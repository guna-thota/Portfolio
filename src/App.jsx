import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Server, Database, BarChart3, Cloud, Sparkles,
  Mail, Linkedin, BadgeCheck, Gauge, Clock, Layers, X,
  Github, Download, Briefcase, GraduationCap, Award, ExternalLink, Code2,
} from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

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
source: { title: "Source Systems", bullets: ["Defined ingestion contracts (schema + SLAs)", "Validated early to prevent bad data entering the pipeline", "Captured metadata for traceability and auditability"] },
adf: { title: "Azure Data Factory", bullets: ["Parameterized pipelines for dev/stage/prod", "Retries + alerting for stable operations", "Idempotent loads using watermark strategy"] },
adls: { title: "ADLS Gen2", bullets: ["Layered lake design (raw/bronze/silver/gold)", "Partitioning aligned to reporting access patterns", "RBAC + lifecycle policies for governance and cost control"] },
dbx: { title: "Databricks (Spark)", bullets: ["PySpark transformations (cleanse, join, dedupe, enrich)", "Incremental processing (MERGE) to reduce compute and runtime", "Quality gates before publish to serving layer"] },
sqldw: { title: "Azure SQL DW", bullets: ["Star schema / dimensional modeling for analytics", "Index + execution plan tuning for faster queries", "Freshness monitoring for reporting SLAs"] },
bi: { title: "BI Layer", bullets: ["Standardized KPI definitions (single source of truth)", "Dashboards designed around decision workflows", "Controlled access to ensure trusted metrics"] },
};

const technicalByStage = {
source: { tech: ["REST APIs", "Batch ingestion", "Schema checks"], reliability: ["Schema drift detection", "Null/format validation", "Volume anomaly alerts"] },
adf: { tech: ["ADF", "Managed Identity", "Key Vault"], reliability: ["Exponential retry", "Watermark incremental loads", "Alert routing by severity"] },
adls: { tech: ["ADLS Gen2", "Parquet/Delta", "ACLs/RBAC"], reliability: ["Immutable raw zone", "Checksum/duplicate detection", "Partition strategy for performance"] },
dbx: { tech: ["Databricks", "PySpark", "Delta Lake"], reliability: ["Skew handling + repartition", "AQE / caching where needed", "Pre-publish validation gates"] },
sqldw: { tech: ["Azure SQL DW", "T-SQL", "Modeling"], reliability: ["Row-count reconciliation", "Index/statistics management", "Late-arrival handling"] },
bi: { tech: ["Power BI / Tableau", "Semantic modeling"], reliability: ["Metric consistency checks", "Staleness indicators", "Governed access"] },
};

const projects = [
{
id: "proj1",
title: "AI Data Analysis Agent",
repo: "Ai-dataanalysis-agent",
url: "https://github.com/guna-thota/Ai-dataanalysis-agent",
oneLiner: "NL-to-SQL workflow with LangGraph orchestration and RAG architecture.",
stack: ["Python", "GPT-4o", "LangChain", "LangGraph", "DuckDB", "SQL"],
metrics: [
"Natural language → executable SQL over structured datasets",
"Schema-aware validation layer preventing unsafe query execution",
"LangGraph agent orchestration for multi-step reasoning",
"In-memory OLAP analytics via DuckDB",
],
},
{
id: "proj2",
title: "Automated Data Integration Framework",
repo: "automated-data-integration",
url: "https://github.com/guna-thota",
oneLiner: "Reusable ADF ELT templates with Delta Lake schema enforcement and Airflow orchestration.",
stack: ["ADF", "PySpark", "SQL", "Delta Lake", "Apache Airflow", "ADLS"],
metrics: [
"Reusable ADF ELT templates across multi-source ingestion workflows",
"Delta Lake schema enforcement + retry mechanisms",
"Standardized Spark transformation patterns for scalability",
"Airflow orchestration for scheduling and monitoring",
],
},
];

const experience = [/* unchanged for brevity (your original stays) */];
const certifications = [/* unchanged */];

function NodeIcon({ id }) {
const cls = "h-5 w-5";
switch (id) {
case "source": return <Server className={cls} />;
case "adf": return <Cloud className={cls} />;
case "adls": return <Database className={cls} />;
case "dbx": return <Sparkles className={cls} />;
case "sqldw": return <Database className={cls} />;
case "bi": return <BarChart3 className={cls} />;
default: return <Server className={cls} />;
}
}

function Modal({ open, title, children, onClose }) {
return (
<AnimatePresence>
{open && (
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", display: "grid", placeItems: "center" }}
onClick={onClose}>
<motion.div onClick={(e) => e.stopPropagation()} style={{ background: "#111", padding: 20 }}>
<div style={{ display: "flex", justifyContent: "space-between" }}>
<div>{title}</div>
<button onClick={onClose}><X /></button>
</div>
{children}
</motion.div>
</motion.div>
)}
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
<div>
<div className="noise" />
<div className="grid" />

<div className="shell">
{/* EVERYTHING ELSE REMAINS EXACTLY SAME */}
</div>

<Modal open={!!activeProject} title="Project" onClose={() => setActiveProject(null)}>
{activeProject && (
<div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13 }}>
Repository:{" "}
<a href={activeProject.url} target="_blank" rel="noreferrer">
{activeProject.repo}
</a>
</div>
)}
</Modal>

</div>
);
}
