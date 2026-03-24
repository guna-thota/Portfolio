import React, { useMemo, useState } from “react”;
import { motion, AnimatePresence } from “framer-motion”;
import {
ShieldCheck, Server, Database, BarChart3, Cloud, Sparkles,
Mail, Linkedin, BadgeCheck, Gauge, Clock, Layers, X,
Github, Download, Briefcase, GraduationCap, Award, ExternalLink, Code2,
} from “lucide-react”;

const cx = (…c) => c.filter(Boolean).join(” “);

const PATH_D = “M 40 70 C 220 20, 360 120, 540 70 S 860 20, 1080 70”;

const pipeline = [
{ id: “source”, label: “Source Systems”,     hint: “APIs • files • operational DBs” },
{ id: “adf”,    label: “Azure Data Factory”, hint: “orchestration • scheduling • retries” },
{ id: “adls”,   label: “ADLS Gen2”,          hint: “raw → bronze → silver → gold” },
{ id: “dbx”,    label: “Databricks (Spark)”, hint: “transformations • incremental” },
{ id: “sqldw”,  label: “Azure SQL DW”,       hint: “modeling • performance” },
{ id: “bi”,     label: “BI Layer”,           hint: “KPIs • semantic layer” },
];

const summaryByStage = {
source: { title: “Source Systems”,     bullets: [“Defined ingestion contracts (schema + SLAs)”, “Validated early to prevent bad data entering the pipeline”, “Captured metadata for traceability and auditability”] },
adf:    { title: “Azure Data Factory”, bullets: [“Parameterized pipelines for dev/stage/prod”, “Retries + alerting for stable operations”, “Idempotent loads using watermark strategy”] },
adls:   { title: “ADLS Gen2”,          bullets: [“Layered lake design (raw/bronze/silver/gold)”, “Partitioning aligned to reporting access patterns”, “RBAC + lifecycle policies for governance and cost control”] },
dbx:    { title: “Databricks (Spark)”, bullets: [“PySpark transformations (cleanse, join, dedupe, enrich)”, “Incremental processing (MERGE) to reduce compute and runtime”, “Quality gates before publish to serving layer”] },
sqldw:  { title: “Azure SQL DW”,       bullets: [“Star schema / dimensional modeling for analytics”, “Index + execution plan tuning for faster queries”, “Freshness monitoring for reporting SLAs”] },
bi:     { title: “BI Layer”,           bullets: [“Standardized KPI definitions (single source of truth)”, “Dashboards designed around decision workflows”, “Controlled access to ensure trusted metrics”] },
};

const technicalByStage = {
source: { tech: [“REST APIs”, “Batch ingestion”, “Schema checks”],        reliability: [“Schema drift detection”, “Null/format validation”, “Volume anomaly alerts”] },
adf:    { tech: [“ADF”, “Managed Identity”, “Key Vault”],                  reliability: [“Exponential retry”, “Watermark incremental loads”, “Alert routing by severity”] },
adls:   { tech: [“ADLS Gen2”, “Parquet/Delta”, “ACLs/RBAC”],              reliability: [“Immutable raw zone”, “Checksum/duplicate detection”, “Partition strategy for performance”] },
dbx:    { tech: [“Databricks”, “PySpark”, “Delta Lake”],                   reliability: [“Skew handling + repartition”, “AQE / caching where needed”, “Pre-publish validation gates”] },
sqldw:  { tech: [“Azure SQL DW”, “T-SQL”, “Modeling”],                    reliability: [“Row-count reconciliation”, “Index/statistics management”, “Late-arrival handling”] },
bi:     { tech: [“Power BI / Tableau”, “Semantic modeling”],               reliability: [“Metric consistency checks”, “Staleness indicators”, “Governed access”] },
};

const projects = [
{
id: “proj1”,
title: “AI Data Analysis Agent”,
repo: “Ai-dataanalysis-agent”,
url: “https://github.com/guna-thota/Ai-dataanalysis-agent”,
oneLiner: “NL-to-SQL workflow with LangGraph orchestration and RAG architecture.”,
stack: [“Python”, “GPT-4o”, “LangChain”, “LangGraph”, “DuckDB”, “SQL”],
metrics: [
“Natural language → executable SQL over structured datasets”,
“Schema-aware validation layer preventing unsafe query execution”,
“LangGraph agent orchestration for multi-step reasoning”,
“In-memory OLAP analytics via DuckDB”,
],
},
{
id: “proj2”,
title: “Automated Data Integration Framework”,
repo: “automated-data-integration”,
url: “https://github.com/guna-thota”,
oneLiner: “Reusable ADF ELT templates with Delta Lake schema enforcement and Airflow orchestration.”,
stack: [“ADF”, “PySpark”, “SQL”, “Delta Lake”, “Apache Airflow”, “ADLS”],
metrics: [
“Reusable ADF ELT templates across multi-source ingestion workflows”,
“Delta Lake schema enforcement + retry mechanisms”,
“Standardized Spark transformation patterns for scalability”,
“Airflow orchestration for scheduling and monitoring”,
],
},
];

const experience = [
{
role: “Data Engineer”,
suffix: “(Fixed-Term Contract)”,
company: “Outlier.ai”,
location: “Remote, Indiana, USA”,
period: “Oct 2024 – Jan 2025”,
bullets: [
“Engineered Python and PySpark ELT pipelines with schema validation and execution controls, reducing batch failures by 20%.”,
“Implemented structured logging and automated retry mechanisms, improving pipeline observability and reducing manual intervention during failure recovery.”,
],
},
{
role: “Associate Software Engineer – Data Engineering”,
suffix: “”,
company: “Hexaware Technologies”,
location: “Chennai, India”,
period: “Mar 2022 – May 2023”,
bullets: [
“Built ADF pipelines integrated with Databricks (PySpark) processing 10M+ records daily across 5+ ingestion workflows in TB-scale healthcare environments.”,
“Optimized distributed SQL and Spark transformations achieving a 30% reduction in pipeline runtime, strengthening enterprise SLA compliance.”,
“Collaborated with analytics and BI teams to deliver stable reporting datasets supporting enterprise dashboards and clinical systems.”,
],
},
{
role: “Cloud Engineering Intern”,
suffix: “”,
company: “Amazon Web Services (AWS)”,
location: “Hyderabad, India”,
period: “Apr 2021 – Apr 2022”,
bullets: [
“Provisioned and secured cloud infrastructure (EC2, S3, IAM, VPC) across development environments.”,
“Built CloudWatch dashboards tracking compute utilization, storage consumption, and alerting thresholds.”,
],
},
];

const certifications = [
{ name: “Azure Data Engineer Associate”, code: “DP-203”, date: “Dec 2022”, issuer: “Microsoft” },
{ name: “Azure Fundamentals”,            code: “AZ-900”, date: “Aug 2022”, issuer: “Microsoft” },
{ name: “AWS Academy Cloud Foundations”, code: “AWS”,    date: “Apr 2022”, issuer: “Amazon”    },
{ name: “CyberSecurity Essentials”,      code: “CISCO”,  date: “Aug 2019”, issuer: “Cisco”     },
];

function NodeIcon({ id }) {
const cls = “h-5 w-5”;
switch (id) {
case “source”: return <Server className={cls} />;
case “adf”:    return <Cloud className={cls} />;
case “adls”:   return <Database className={cls} />;
case “dbx”:    return <Sparkles className={cls} />;
case “sqldw”:  return <Database className={cls} />;
case “bi”:     return <BarChart3 className={cls} />;
default:       return <Server className={cls} />;
}
}

function Stat({ icon: Icon, label, value, note }) {
return (
<div className=“panel” style={{ padding: 14 }}>
<div style={{ display: “flex”, alignItems: “center”, justifyContent: “space-between”, gap: 10 }}>
<div>
<div className="smallTitle">{label}</div>
<div style={{ fontSize: 18, fontWeight: 800, marginTop: 2 }}>{value}</div>
</div>
<div style={{ width: 40, height: 40, borderRadius: 14, border: “1px solid rgba(255,255,255,0.10)”, background: “rgba(255,255,255,0.05)”, display: “grid”, placeItems: “center” }}>
<Icon className="h-5 w-5" />
</div>
</div>
{note && <div style={{ marginTop: 8, fontSize: 12, color: “rgba(255,255,255,0.55)” }}>{note}</div>}
</div>
);
}

function Modal({ open, title, children, onClose }) {
return (
<AnimatePresence>
{open && (
<motion.div
initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
style={{ position: “fixed”, inset: 0, background: “rgba(0,0,0,0.65)”, display: “grid”, placeItems: “center”, zIndex: 9999, padding: 16 }}
onClick={onClose}
>
<motion.div
initial={{ y: 10, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }}
exit={{ y: 10, opacity: 0, scale: 0.98 }} transition={{ duration: 0.16 }}
onClick={(e) => e.stopPropagation()}
style={{ width: “min(700px, 96vw)”, borderRadius: 18, border: “1px solid rgba(255,255,255,0.12)”, background: “linear-gradient(180deg, rgba(15,25,40,0.97), rgba(10,18,30,0.97))”, boxShadow: “0 24px 80px rgba(0,0,0,0.55)”, overflow: “hidden” }}
>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, padding: “14px 16px”, borderBottom: “1px solid rgba(255,255,255,0.10)” }}>
<div style={{ fontWeight: 800 }}>{title}</div>
<button className=“btn” style={{ padding: “8px 10px” }} onClick={onClose}><X className="h-4 w-4" /></button>
</div>
<div style={{ padding: 16 }}>{children}</div>
</motion.div>
</motion.div>
)}
</AnimatePresence>
);
}

export default function App() {
const [summaryMode, setSummaryMode] = useState(true);
const [selected, setSelected] = useState(“adf”);
const [activeProject, setActiveProject] = useState(null);

const headline = useMemo(() => (summaryMode ? “Overview” : “Implementation”), [summaryMode]);
const summary = summaryByStage[selected];
const tech = technicalByStage[selected];

return (
<div>
<div className="noise" />
<div className="grid" />

```
  <div className="shell">

    {/* ── TOPBAR ── */}
    <div className="topbar" style={{ flexWrap: "wrap", gap: 10 }}>
      <div className="brand">
        <div className="logo" style={{ display: "grid", placeItems: "center", fontWeight: 900, fontSize: 22, color: "white", fontFamily: "system-ui" }}>G</div>
        <div>
          <h1>Guna Durga Prashanth Thota</h1>
          <p>Data Engineer — Azure · PySpark · LLM Pipelines</p>
        </div>
      </div>

      <div className="actions" style={{ flexWrap: "wrap", gap: 8 }}>
        <div className="toggle">
          <span>Overview</span>
          <div className="switch" onClick={() => setSummaryMode(v => !v)}>
            <motion.div className="knob" animate={{ x: summaryMode ? 0 : 18 }} transition={{ type: "spring", stiffness: 520, damping: 30 }} />
          </div>
          <span>Detail</span>
        </div>
        <a className="btn" href="mailto:gunaprashant@gmail.com" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Mail className="h-4 w-4" />Email</a>
        <a className="btn" href="https://www.linkedin.com/in/gthota27/" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Linkedin className="h-4 w-4" />LinkedIn</a>
        <a className="btn" href="https://github.com/guna-thota" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Github className="h-4 w-4" />GitHub</a>
        <a className="btn" href="https://leetcode.com/u/prashanth_thota/" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Code2 className="h-4 w-4" />LeetCode</a>
        <a className="btn" href="/Guna_Resume.pdf" download style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(34,197,94,0.12)", borderColor: "rgba(34,197,94,0.35)" }}><Download className="h-4 w-4" />Resume</a>
      </div>
    </div>

    {/* ── HERO ── */}
    <div className="hero">

      {/* LEFT CARD */}
      <motion.div className="card" whileHover={{ y: -2 }}>
        <div className="cardInner">
          <h2 className="title">
            Azure Data Engineering
            <br />
            <span style={{ color: "rgba(255,255,255,0.55)" }}>Production pipelines • reliability • performance</span>
          </h2>

          <div className="subtitle">
            {headline}. I build Azure data systems that stay stable under real-world conditions — bad data, late arrivals, retries, schema changes. At Hexaware I cut pipeline runtime by <strong>30%</strong> and reduced batch failures by <strong>20%</strong> processing <strong>10M+ records daily</strong>.
          </div>

          <div className="panel" style={{ marginTop: 12 }}>
            <div className="smallTitle">Professional summary</div>
            <div style={{ marginTop: 8, color: "rgba(255,255,255,0.82)", lineHeight: 1.6, fontSize: 13 }}>
              <div>Data Engineer building Azure-native pipelines supporting analytics and ML workloads.</div>
              <div style={{ marginTop: 4 }}>Focused on reliability — quality gates, reconciliation, monitoring — and predictable operations.</div>
              <div style={{ marginTop: 4 }}>Expanding into LLM pipelines, Apache Airflow orchestration, and real-time streaming.</div>
            </div>
          </div>

          <div className="pills" style={{ marginTop: 12 }}>
            {["ADF", "ADLS", "Databricks", "PySpark", "Delta Lake", "Airflow", "LangChain", "LangGraph", "GPT-4o", "AWS"].map(p => (
              <span key={p} className="pill">{p}</span>
            ))}
          </div>

          <div style={{ marginTop: 14, display: "grid", gap: 10, gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
            <Stat icon={BadgeCheck} label="Runtime Cut"  value="30%"  note="Spark + SQL tuning at Hexaware" />
            <Stat icon={Gauge}      label="Failures Cut" value="20%"  note="Schema validation + retry logic" />
            <Stat icon={Clock}      label="Daily Volume" value="10M+" note="Records processed per day" />
          </div>
        </div>
      </motion.div>

      {/* RIGHT CARD */}
      <motion.div className="card" whileHover={{ y: -2 }}>
        <div className="cardInner">
          <div className="sectionTitle" style={{ marginTop: 0 }}>
            <h2>Projects</h2>
            <p>Selected work</p>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            {projects.map(p => (
              <motion.div key={p.id} className="panel" style={{ padding: 14, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }} whileHover={{ y: -2 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: 14 }}>{p.title}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 3 }}>{p.oneLiner}</div>
                  </div>
                  <a className="btn" href={p.url} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 5, flexShrink: 0, fontSize: 12 }}>
                    <ExternalLink className="h-3 w-3" />Repo
                  </a>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 10 }}>
                  {p.stack.map(s => (
                    <span key={s} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, border: "1px solid rgba(34,197,94,0.28)", background: "rgba(34,197,94,0.07)", color: "rgba(255,255,255,0.75)" }}>{s}</span>
                  ))}
                </div>
                <div className="smallTitle" style={{ marginTop: 10 }}>Scale &amp; scope</div>
                <ul className="list" style={{ marginTop: 6 }}>
                  {p.metrics.map(m => <li key={m}><span className="dot" /><span>{m}</span></li>)}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="panel" style={{ marginTop: 12 }}>
            <div className="smallTitle">What I optimize for</div>
            <ul className="list" style={{ marginTop: 8 }}>
              <li><span className="dot" /><span>Pipelines with <strong>clear contracts</strong> — schema + SLAs, validated early.</span></li>
              <li><span className="dot" /><span>Designed for <strong>recovery</strong>: retries, idempotency, backfills without duplicates.</span></li>
              <li><span className="dot" /><span>Tuned for <strong>cost and speed</strong>: incremental loads, partitions, query performance.</span></li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>

    {/* ── EXPERIENCE ── */}
    <div className="sectionTitle" style={{ marginTop: 28 }}>
      <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}><Briefcase className="h-5 w-5" style={{ opacity: 0.7 }} />Work Experience</h2>
    </div>

    <motion.div className="card" whileHover={{ y: -2 }}>
      <div className="cardInner">
        {experience.map((exp, i) => (
          <div key={i} style={{ paddingBottom: i < experience.length - 1 ? 18 : 0, marginBottom: i < experience.length - 1 ? 18 : 0, borderBottom: i < experience.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14 }}>
                  {exp.role}{" "}
                  {exp.suffix && <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{exp.suffix}</span>}
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{exp.company} — {exp.location}</div>
              </div>
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>{exp.period}</span>
            </div>
            <ul className="list" style={{ marginTop: 10 }}>
              {exp.bullets.map(b => <li key={b}><span className="dot" /><span>{b}</span></li>)}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>

    {/* ── PIPELINE ── */}
    <div className="pipelineWrap">
      <div className="sectionTitle">
        <h2>End-to-End Data Pipeline Architecture</h2>
        <p>Click a stage to drill down</p>
      </div>

      <motion.div className={cx("card", "pipelineCard")} whileHover={{ y: -2 }}>
        <svg width="100%" height="130" viewBox="0 0 1120 130" style={{ position: "absolute", left: 0, top: 0, opacity: 0.5, pointerEvents: "none" }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="pipeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="rgba(78,168,222,0.26)" />
              <stop offset="55%"  stopColor="rgba(30,129,176,0.24)" />
              <stop offset="100%" stopColor="rgba(20,93,160,0.22)" />
            </linearGradient>
            <filter id="pipeGlow">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <path d={PATH_D} fill="none" stroke="url(#pipeGrad)" strokeWidth="2" strokeDasharray="7 10" />
          {[0, 1, 2].map(i => (
            <circle key={i} r={3} cx={40} cy={70} fill="rgba(255,255,255,0.55)" filter="url(#pipeGlow)" opacity={0.38}>
              <animateMotion dur="7s" repeatCount="indefinite" begin={`${i * 2}s`} path={PATH_D} />
              <animate attributeName="opacity" values="0.10;0.45;0.10" dur="2.8s" repeatCount="indefinite" />
            </circle>
          ))}
        </svg>

        <div className="pipelineRow">
          {pipeline.map(n => (
            <div key={n.id} className={cx("node", selected === n.id && "nodeActive")} onClick={() => setSelected(n.id)}>
              <div className="nodeTop">
                <div className="nodeLeft">
                  <div className="badgeIcon"><NodeIcon id={n.id} /></div>
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
                <div style={{ marginTop: 6, fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{summaryMode ? "Summary" : "Details"}</div>
              </div>
              <div className="stackChip" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <Layers className="h-4 w-4" />{headline}
              </div>
            </div>
            <AnimatePresence mode="wait">
              {summaryMode ? (
                <motion.ul key="sum" className="list" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.16 }} style={{ marginTop: 12 }}>
                  {summary.bullets.map(b => <li key={b}><span className="dot" /><span>{b}</span></li>)}
                </motion.ul>
              ) : (
                <motion.div key="tech" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.16 }} style={{ marginTop: 12 }}>
                  <div className="smallTitle">Tech</div>
                  <div className="stack">{tech.tech.map(t => <span key={t} className="stackChip">{t}</span>)}</div>
                  <div style={{ height: 12 }} />
                  <div className="smallTitle">Reliability controls</div>
                  <ul className="list" style={{ marginTop: 10 }}>
                    {tech.reliability.map(r => <li key={r}><span className="dot" /><span>{r}</span></li>)}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="panel">
            <div className="smallTitle">Production principles</div>
            <ul className="list" style={{ marginTop: 10 }}>
              <li><span className="dot" /><span><strong>Observability:</strong> freshness, failures, volume anomalies, drift.</span></li>
              <li><span className="dot" /><span><strong>Data quality:</strong> validation gates + reconciliation before publish.</span></li>
              <li><span className="dot" /><span><strong>Cost &amp; performance:</strong> incremental loads, partitions, query tuning.</span></li>
              <li><span className="dot" /><span><strong>Governance:</strong> access control, audit-friendly logging, clear ownership.</span></li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>

    {/* ── CERTIFICATIONS ── */}
    <div className="sectionTitle" style={{ marginTop: 28 }}>
      <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}><Award className="h-5 w-5" style={{ opacity: 0.7 }} />Certifications</h2>
    </div>

    <motion.div className="card" whileHover={{ y: -2 }}>
      <div className="cardInner">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 12 }}>
          {certifications.map(cert => (
            <div key={cert.code} className="panel" style={{ padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, border: "1px solid rgba(139,92,246,0.35)", background: "rgba(139,92,246,0.10)", color: "rgba(255,255,255,0.85)", fontWeight: 700 }}>{cert.code}</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{cert.date}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.35 }}>{cert.name}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>{cert.issuer}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>

    {/* ── EDUCATION ── */}
    <div className="sectionTitle" style={{ marginTop: 28 }}>
      <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}><GraduationCap className="h-5 w-5" style={{ opacity: 0.7 }} />Education</h2>
    </div>

    <motion.div className="card" whileHover={{ y: -2 }}>
      <div className="cardInner" style={{ display: "grid", gap: 16 }}>
        {[
          { degree: "M.S. Computer Science", school: "Purdue University Northwest — Indiana, USA", period: "Aug 2023 – May 2025" },
          { degree: "B.Tech Electronics & Communication Engineering", school: "Sreenidhi Institute of Science & Technology (SNIST) — Hyderabad, India", period: "Aug 2018 – Jun 2022" },
        ].map((e, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap", paddingBottom: i === 0 ? 16 : 0, borderBottom: i === 0 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 14 }}>{e.degree}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 3 }}>{e.school}</div>
            </div>
            <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>{e.period}</span>
          </div>
        ))}
      </div>
    </motion.div>

    {/* ── CONTACT ── */}
    <div className="sectionTitle" style={{ marginTop: 28 }}>
      <h2>Contact</h2>
    </div>

    <motion.div className="card" whileHover={{ y: -2 }}>
      <div className="cardInner">
        <div className="stack">
          {[
            { label: "gunaprashant@gmail.com",       href: "mailto:gunaprashant@gmail.com" },
            { label: "gunaprashanth.tech@gmail.com", href: "mailto:gunaprashanth.tech@gmail.com" },
            { label: "linkedin.com/in/gthota27",     href: "https://www.linkedin.com/in/gthota27/" },
            { label: "github.com/guna-thota",        href: "https://github.com/guna-thota" },
            { label: "LeetCode",                     href: "https://leetcode.com/u/prashanth_thota/" },
          ].map(l => (
            <a key={l.label} className="stackChip" href={l.href} target={l.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer">{l.label}</a>
          ))}
        </div>
      </div>
    </motion.div>

    <div className="footer">© {new Date().getFullYear()} • Guna Durga Prashanth Thota</div>
  </div>

  <Modal open={!!activeProject} title="Project" onClose={() => setActiveProject(null)}>
    {activeProject && <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13 }}>Repository: <a href={activeProject.url} target="_blank" rel="noreferrer" style={{ color: "rgba(120,200,255,0.9)" }}>{activeProject.repo}</a></div>}
  </Modal>
</div>
```

);
}
