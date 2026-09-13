import React from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Cpu, Layout, Code2, Check } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function SkillsSection() {
  const skillDomains = [
    {
      title: 'Backend & Concurrency Architecture', code: 'B', color: '#1B5FA8', icon: Server,
      description: 'Building high-concurrency server APIs, relational database locking, authentication boundaries, and async task execution.',
      skills: [
        { name: 'Python', level: 95, detail: 'Primary Backend Language (Django / FastAPI)' },
        { name: 'Django & DRF', level: 95, detail: 'Full MVC, Serializers, ViewSets, Token Auth' },
        { name: 'Database Locking', level: 92, detail: 'Pessimistic Locking with select_for_update()' },
        { name: 'RESTful API Design', level: 95, detail: 'Normalized Schemas, Idempotency, RBAC' },
        { name: 'Async Task Workers', level: 85, detail: 'Django-Q2 & Background Daemons' },
      ],
    },
    {
      title: 'Databases & Data Engineering', code: 'D', color: '#E05A2B', icon: Database,
      description: 'Architecting normalized schemas, complex analytical queries, forensic anomaly detection, and automated ETL ingestion.',
      skills: [
        { name: 'PostgreSQL & MySQL', level: 95, detail: 'Schema Normalization, Indexes, JSONB' },
        { name: 'Advanced SQL', level: 95, detail: 'Window Functions, Common Table Expressions (CTEs)' },
        { name: 'Pandas & NumPy', level: 90, detail: 'Data Cleaning, Statistical Z-Score Outliers' },
        { name: 'Power BI & Analytics', level: 88, detail: 'Executive Dashboards & Forensic Modeling' },
        { name: 'ETL Pipelines', level: 90, detail: 'Automated Watch-Folder Ingestion Daemons' },
      ],
    },
    {
      title: 'ML, Audio & AI Systems', code: 'M', color: '#7E347D', icon: Cpu,
      description: 'Integrating automatic speech recognition, multi-speaker call diarization, and LLM evaluation workflows.',
      skills: [
        { name: 'OpenAI Whisper', level: 90, detail: 'Speech-to-Text Transcription Pipelines' },
        { name: 'PyAnnote', level: 85, detail: 'Speaker Diarization & Voice Embeddings' },
        { name: 'FFmpeg Core', level: 88, detail: 'Multi-Channel Audio Chunking & Processing' },
        { name: 'OpenAI API', level: 90, detail: 'Resume Shortlisting & Semantic Candidate Ranking' },
        { name: 'Google Gemini API', level: 88, detail: 'Clinical AI Triage & Structured Summaries' },
      ],
    },
    {
      title: 'Frontend, Systems & Tooling', code: 'F', color: '#1B824C', icon: Layout,
      description: 'Building responsive user interfaces, dynamic canvas schematics, desktop GUIs, and developer workflows.',
      skills: [
        { name: 'React.js', level: 88, detail: 'Hooks, State Architecture, Component Design' },
        { name: 'Tailwind CSS', level: 92, detail: 'Modern Responsive Layouts' },
        { name: 'HTML5 Canvas & PyQt5', level: 85, detail: 'Interactive Industrial Schematics' },
        { name: 'OAuth 2.0 & JWT', level: 90, detail: 'Google Calendar API Sync, Token Security' },
        { name: 'Git & Linux / Bash', level: 92, detail: 'Branching Workflows & Background Services' },
      ],
    },
  ];

  return (
    <section id="skills" className="py-16 md:py-20 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
        >
          <div className="w-10 h-[3px] bg-metro-backend rounded-full mb-5" />
          <div className="flex items-center gap-2 text-metro-backend font-bold text-xs uppercase tracking-wider mb-2">
            <Code2 className="w-4 h-4" />
            <span>Technical Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight font-sans">
            Skills &amp; Engineering Domains
          </h2>
          <p className="text-sm text-[#374151] mt-2 max-w-2xl font-medium">
            Proficiencies categorized across backend systems, relational databases, AI/speech pipelines, and modern frontend tools.
          </p>
        </motion.div>

        {/* Content Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="rounded-3xl border border-[#E4DDD3] bg-white/50 shadow-[0_2px_24px_rgba(27,95,168,0.06)] p-6 sm:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillDomains.map((domain, idx) => {
              const IconComponent = domain.icon;
              return (
                <div key={idx} className="p-6 sm:p-7 rounded-2xl bg-white border border-[#DDD6C9] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-[#EAE4D9]">
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md group-hover:scale-105 transition-transform" style={{ backgroundColor: domain.color }}>
                          {domain.code}
                        </div>
                        <div>
                          <h3 className="font-black text-[#111827] text-base sm:text-lg font-sans">{domain.title}</h3>
                          <p className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">{domain.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4 mt-4">
                      {domain.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-bold text-[#111827]">
                            <span>{skill.name}</span>
                            <span className="text-[#6B7280] font-mono text-[11px] font-bold">{skill.level}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-[#FAF8F4] border border-[#DDD6C9] overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${skill.level}%`, backgroundColor: domain.color }} />
                          </div>
                          <div className="text-[11px] text-[#374151] font-medium">{skill.detail}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
