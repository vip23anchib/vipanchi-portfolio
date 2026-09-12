import React from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Cpu, Layout, Code2, Sparkles, Terminal, Check } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function SkillsSection() {
  const skillDomains = [
    {
      title: 'Backend & Concurrency Architecture',
      code: 'B',
      color: '#1B5FA8',
      icon: Server,
      description: 'Building high-concurrency server APIs, relational database locking, authentication boundaries, and async task execution.',
      skills: [
        { name: 'Python', level: 95, detail: 'Primary Backend Language (Django / FastAPI)' },
        { name: 'Django & DRF', level: 95, detail: 'Full MVC, Serializers, ViewSets, Token Auth' },
        { name: 'Database Locking', level: 92, detail: 'Pessimistic Locking with select_for_update()' },
        { name: 'RESTful API Design', level: 95, detail: 'Normalized Schemas, Idempotency, RBAC' },
        { name: 'Async Task Workers', level: 85, detail: 'Django-Q2 & Background Daemons' }
      ]
    },
    {
      title: 'Databases & Data Engineering',
      code: 'D',
      color: '#E05A2B',
      icon: Database,
      description: 'Architecting normalized schemas, complex analytical queries, forensic anomaly detection, and automated ETL ingestion.',
      skills: [
        { name: 'PostgreSQL & MySQL', level: 95, detail: 'Schema Normalization, Indexes, JSONB' },
        { name: 'Advanced SQL', level: 95, detail: 'Window Functions, Common Table Expressions (CTEs)' },
        { name: 'Pandas & NumPy', level: 90, detail: 'Data Cleaning, Statistical Z-Score Outliers' },
        { name: 'Power BI & Analytics', level: 88, detail: 'Executive Dashboards & Forensic Modeling' },
        { name: 'ETL Pipelines', level: 90, detail: 'Automated Watch-Folder Ingestion Daemons' }
      ]
    },
    {
      title: 'ML, Audio & AI Systems',
      code: 'M',
      color: '#7E347D',
      icon: Cpu,
      description: 'Integrating automatic speech recognition, multi-speaker call diarization, and LLM evaluation workflows.',
      skills: [
        { name: 'OpenAI Whisper', level: 90, detail: 'Speech-to-Text Transcription Pipelines' },
        { name: 'PyAnnote', level: 85, detail: 'Speaker Diarization & Voice Embeddings' },
        { name: 'FFmpeg Core', level: 88, detail: 'Multi-Channel Audio Chunking & Processing' },
        { name: 'OpenAI API', level: 90, detail: 'Resume Shortlisting & Semantic Candidate Ranking' },
        { name: 'Google Gemini API', level: 88, detail: 'Clinical AI Triage & Structured Summaries' }
      ]
    },
    {
      title: 'Frontend, Systems & Tooling',
      code: 'F',
      color: '#1B824C',
      icon: Layout,
      description: 'Building responsive user interfaces, dynamic canvas schematics, desktop GUIs, and developer workflows.',
      skills: [
        { name: 'React.js', level: 88, detail: 'Hooks, State Architecture, Component Design' },
        { name: 'Tailwind CSS', level: 92, detail: 'Modern Responsive Layouts' },
        { name: 'HTML5 Canvas & PyQt5', level: 85, detail: 'Interactive Industrial Schematics' },
        { name: 'OAuth 2.0 & JWT', level: 90, detail: 'Google Calendar API Sync, Token Security' },
        { name: 'Git & Linux / Bash', level: 92, detail: 'Branching Workflows & Background Services' }
      ]
    }
  ];

  return (
    <section id="skills" className="py-16 md:py-20 border-t border-[#DDD6C9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-metro-backend font-bold text-xs uppercase tracking-wider mb-1">
            <Code2 className="w-4 h-4" />
            <span>Technical Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-ink-primary tracking-tight font-sans">
            Skills & Engineering Domains
          </h2>
          <p className="text-sm text-ink-secondary mt-1 max-w-2xl">
            Proficiencies categorized across backend systems, relational databases, AI/speech pipelines, and modern frontend tools.
          </p>
        </div>

        {/* 4-Domain Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillDomains.map((domain, idx) => {
            const IconComponent = domain.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#DDD6C9] shadow-paper-card flex flex-col justify-between"
              >
                <div>
                  {/* Domain Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm"
                        style={{ backgroundColor: domain.color }}
                      >
                        {domain.code}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-ink-primary text-base">
                          {domain.title}
                        </h3>
                        <p className="text-xs text-ink-muted">
                          {domain.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3.5 mt-5">
                    {domain.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold text-ink-primary">
                          <span>{skill.name}</span>
                          <span className="text-ink-muted font-mono text-[11px]">{skill.level}%</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1.5 rounded-full bg-[#FAF8F4] border border-[#DDD6C9] overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${skill.level}%`,
                              backgroundColor: domain.color
                            }}
                          />
                        </div>

                        <div className="text-[11px] text-ink-secondary font-medium">
                          {skill.detail}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
