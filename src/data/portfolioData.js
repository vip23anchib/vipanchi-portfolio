export const portfolioData = {
  personal: {
    name: "Vipanchi Barman",
    title: "Backend & Data Systems Engineer",
    tagline: "Architecting high-concurrency backends, normalized relational data stores, and AI-driven telemetry pipelines.",
    location: "Bhopal / Hyderabad / Delhi, India",
    email: "barman23vipanchi@gmail.com",
    phone: "+91 6364696723",
    status: "Available for SDE / Backend Engineering Internships & Full-Time Roles",
    github: "https://github.com/vip23anchib",
    linkedin: "https://linkedin.com/in/vipanchi-barman", // default anchor
    leetcode: "https://leetcode.com/u/vip23anchi/",
    resumeUrl: "/Barman_Vipanchi_Resume_10-09-2026.pdf",
    stats: [
      { label: "Academic CGPA", value: "9.04", suffix: " / 10.0", detail: "VIT Bhopal CSE" },
      { label: "Transactions Analyzed", value: "100K+", suffix: "", detail: "Forensic Audit Analytics" },
      { label: "Resumes Parsed & Scored", value: "1,000+", suffix: "", detail: "LLM Pipeline" },
      { label: "Automated Tests Written", value: "31+", suffix: " suites", detail: "Concurrency & OAuth 2.0" },
    ]
  },

  education: {
    institution: "Vellore Institute of Technology (VIT), Bhopal",
    degree: "Bachelor of Technology (B.Tech)",
    major: "Computer Science and Engineering",
    cgpa: "9.04 / 10.0",
    expectedGraduation: "Expected May 2027",
    coursework: [
      "Database Management Systems (DBMS)",
      "Design and Analysis of Algorithms (DAA)",
      "Object-Oriented Programming (C++/Java)",
      "Operating Systems & Concurrency",
      "Computer Networks & Protocols",
      "Data Structures & Optimization"
    ]
  },

  experience: [
    {
      id: "meslova-systems",
      role: "Python Backend Developer Intern",
      company: "Meslova Systems Pvt. Ltd.",
      location: "Hyderabad, India",
      period: "May 2026 – Jul 2026",
      type: "Internship",
      techStack: ["Python", "Django", "Django REST Framework (DRF)", "PostgreSQL", "Whisper", "PyAnnote", "Token Auth", "RBAC"],
      highlights: [
        "Architected and engineered the core backend infrastructure for a B2B recruitment/ATS SaaS platform, powering role-based portals for recruiters, HR managers, and system admins with 15+ secure RESTful APIs and token-based RBAC.",
        "Engineered end-to-end candidate screening workflows including resume parsing, automated ATS scoring, search/filtering, recruitment pipeline tracking, and audit activity logs over an 8+ table normalized PostgreSQL schema with indexed queries.",
        "Contributed to an asynchronous audio-analytics pipeline utilizing OpenAI Whisper and PyAnnote for speaker-wise call diarization, enabling downstream candidate sentiment extraction and hiring-signal analysis."
      ],
      systemMetrics: "15+ REST APIs • 8+ Table Normalized Schema • Sub-150ms query latency on indexed lookups"
    },
    {
      id: "saurabhi-media",
      role: "Backend Developer Intern",
      company: "Saurabhi Media Pvt. Ltd.",
      location: "Delhi, India",
      period: "Apr 2026 – May 2026",
      type: "Internship",
      techStack: ["Python", "SQL", "ETL Pipelines", "Data Validation", "Relational Databases", "Watch-folder Ingestion"],
      highlights: [
        "Built a high-throughput Python-based ETL and data-validation pipeline to parse, sanitize, clean, and load large-volume multi-source CSV datasets into relational databases, ensuring analysis-readiness for downstream reporting.",
        "Automated real-time data ingestion via a watch-folder background daemon service, eliminating manual data entry effort and enabling near real-time data availability for analytics teams.",
        "Designed modular, idempotent pipeline stages with structured error handling, log rotation, and data-quality validation checks supporting reliable, audit-ready data processing at scale."
      ],
      systemMetrics: "100% automated ingestion • Idempotent staging • Zero manual data-entry overhead"
    }
  ],

  projects: [
    {
      id: "hiremind",
      title: "HireMind",
      subtitle: "AI-Powered Applicant Tracking & Ranking System",
      category: "Backend & AI",
      featured: true,
      github: "https://github.com/vip23anchib/HireMind",
      live: null,
      tech: ["Python", "Django", "DRF", "React", "PostgreSQL", "OpenAI API", "Token Auth", "RBAC"],
      overview: "Full-scale ATS platform designed to automate applicant shortlisting, structured resume information extraction, candidate-to-job matching, and recruiter pipeline workflows.",
      architecture: [
        "Architected normalized schema across 8+ entities (Jobs, Candidates, Applications, Stages, EvaluationMetrics) with 15+ secure REST endpoints.",
        "Implemented role-based access control (RBAC) and JWT/token authentication enforcing strict data boundaries between recruiters, candidates, and admins.",
        "Engineered an LLM-driven resume parsing & candidate-ranking pipeline using OpenAI API, scoring 1,000+ candidate profiles against job descriptions with structured relevance metrics.",
        "Built a stage-wise funnel analytics layer giving recruiters actionable hiring insights and bottleneck visibility across the pipeline."
      ],
      metrics: {
        resumesProcessed: "1,000+ parsed",
        endpoints: "15+ REST endpoints",
        schema: "8+ normalized tables",
        speedup: "70% manual shortlisting reduction"
      },
      codeSnippet: `// HireMind Candidate Scoring Pipeline
class CandidateRankingService:
    def rank_candidate(self, resume_text: str, job_spec: dict) -> EvaluationMetric:
        extracted = self.llm_parser.extract_structured_fields(resume_text)
        relevance_score = self.compute_semantic_fit(extracted, job_spec)
        
        with transaction.atomic():
            metric = EvaluationMetric.objects.create(
                candidate_id=extracted.id,
                job_id=job_spec['id'],
                fit_score=relevance_score,
                extracted_skills=extracted.skills
            )
            self.analytics_stream.push_funnel_event(metric)
        return metric`
    },
    {
      id: "ayusetu",
      title: "AyuSetu",
      subtitle: "Clinical Appointment & AI Follow-Up Platform",
      category: "Backend & Systems",
      featured: true,
      github: "https://github.com/vip23anchib/ayusetu-healthcare",
      live: "https://ayusetu-healthcare.vercel.app",
      tech: ["Python", "Django", "DRF", "PostgreSQL", "React", "Tailwind CSS", "Gemini API", "Django-Q2", "OAuth 2.0"],
      overview: "Mission-critical healthcare booking and patient follow-up platform built with strict concurrency safety guarantees, automated Google Calendar sync, and AI clinical triage.",
      architecture: [
        "Designed concurrency-safe appointment booking using select_for_update() row-level database locking, a partial unique index, and 5-minute temporary slot holds, completely eliminating double-booking under high load.",
        "Engineered asynchronous AI triage, post-visit clinical summaries, and instant patient notifications using Django-Q2 background worker queues.",
        "Integrated Google Calendar OAuth 2.0 to bi-directionally sync doctor schedules, shift changes, and leaves with automated conflict cancellation.",
        "Comprehensive backend test suite with 31 automated integration tests validating race conditions, reservation expiration, and OAuth tokens."
      ],
      metrics: {
        locking: "select_for_update() + Partial Index",
        testCoverage: "31 Automated Test Suites",
        holdDuration: "5-min temporary slot locks",
        status: "Production Deployment on Vercel"
      },
      codeSnippet: `// AyuSetu Concurrency-Safe Booking
@transaction.atomic
def reserve_appointment_slot(doctor_id, slot_time, patient_id):
    # Acquire pessimistic row-level lock
    slot = DoctorSlot.objects.select_for_update().get(
        doctor_id=doctor_id, 
        slot_time=slot_time, 
        status='AVAILABLE'
    )
    # 5-minute temporary slot reservation hold
    slot.status = 'HELD'
    slot.held_by_id = patient_id
    slot.held_until = timezone.now() + timedelta(minutes=5)
    slot.save(update_fields=['status', 'held_by_id', 'held_until'])
    return slot`
    },
    {
      id: "auditlens",
      title: "AuditLens",
      subtitle: "Forensic Audit Analytics & Anomaly Detection Dashboard",
      category: "Data & Analytics",
      featured: true,
      github: "https://github.com/vip23anchib/AuditLens",
      live: null,
      tech: ["SQL", "Python", "Pandas", "Machine Learning", "Power BI", "Exploratory Data Analysis"],
      overview: "Enterprise forensic audit analytics platform engineered to detect financial anomalies, duplicate payments, policy circumvention, and high-risk transactional patterns across massive financial ledgers.",
      architecture: [
        "Analyzed 100K+ transactional records using advanced SQL (CTEs, self-joins, window functions, and CASE expressions) for transaction profiling and risk scoring.",
        "Leveraged Python and Pandas for data cleaning, statistical distribution analysis, z-score outlier detection, and duplicate invoice clustering.",
        "Built interactive executive Power BI dashboards visualizing departmental spend variance, vendor concentration risk, and suspicious transaction indicators.",
        "Applied machine learning anomaly detection models to flag anomalous split-payments designed to bypass procurement authorization limits."
      ],
      metrics: {
        recordsAnalyzed: "100K+ Transactions",
        queryTechniques: "Window functions, CTEs, Aggregations",
        insights: "Vendor risk & duplicate detection",
        dashboard: "Interactive Power BI Executive Suite"
      },
      codeSnippet: `-- AuditLens Anomaly Detection Query
WITH RankedTransactions AS (
    SELECT 
        txn_id, vendor_id, amount, department_id, txn_date,
        LAG(amount, 1) OVER (PARTITION BY vendor_id ORDER BY txn_date) as prev_amount,
        AVG(amount) OVER (PARTITION BY department_id) as dept_avg_spend,
        STDDEV(amount) OVER (PARTITION BY department_id) as dept_stddev
    FROM financial_ledger
)
SELECT txn_id, vendor_id, amount,
       (amount - dept_avg_spend) / NULLIF(dept_stddev, 0) AS z_score_anomaly
FROM RankedTransactions
WHERE amount > dept_avg_spend + (3 * dept_stddev)
   OR (amount = prev_amount AND txn_date >= NOW() - INTERVAL '48 HOURS');`
    },
    {
      id: "shopverse",
      title: "ShopVerse",
      subtitle: "Full-Stack E-Commerce & Payment Gateway Engine",
      category: "Full Stack",
      featured: false,
      github: "https://github.com/vip23anchib/ShopVerse",
      live: "https://setup-ecommerce-ps1.vercel.app",
      tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Razorpay API", "Tailwind CSS"],
      overview: "E-commerce web application featuring dynamic catalog management, secure checkout flows, transactional order processing, and payment webhook verification.",
      architecture: [
        "Engineered RESTful backend endpoints for catalog filtering, cart persistence, and order state machines.",
        "Integrated secure Razorpay payment flow with server-side HMAC signature verification to prevent payment tampering.",
        "Awarded 2nd place in the Linpack Club E-commerce Payment Integration competition for resilient payment error recovery."
      ],
      metrics: {
        achievement: "2nd Place Winner (Linpack)",
        security: "HMAC Signature Verification",
        stack: "TypeScript + React + Node.js"
      }
    },
    {
      id: "processviz",
      title: "ProcessViz",
      subtitle: "Chemical Process Equipment Visualizer & Report Engine",
      category: "Full Stack",
      featured: false,
      github: "https://github.com/vip23anchib/ProcessViz",
      live: "https://chemical-equipment-visualizer-mu.vercel.app",
      tech: ["React", "JavaScript", "HTML5 Canvas", "Chart Engine", "Tailwind CSS"],
      overview: "Interactive engineering platform for visualizing, analyzing, and generating technical reports for industrial chemical process equipment.",
      architecture: [
        "Built dynamic interactive rendering canvas for chemical vessel schematics, flow rates, and thermal parameters.",
        "Implemented real-time calculation modules with instant PDF report generation for industrial equipment compliance."
      ],
      metrics: {
        capabilities: "Schematic canvas + PDF report engine",
        deployment: "Live on Vercel"
      }
    },
    {
      id: "dsa-vault",
      title: "Algorithms & DSA Vault",
      subtitle: "Curated Solutions, Multi-Approach Patterns & LeetCode Notes",
      category: "Backend & Systems",
      featured: false,
      github: "https://github.com/vip23anchib/LeetCodeSolutions",
      live: "https://leetcode.com/u/vip23anchib",
      tech: ["C++", "Python", "Data Structures", "Algorithms", "System Optimization"],
      overview: "Systematic repository of interview-grade algorithmic solutions across trees, dynamic programming, graph algorithms, and space/time complexity optimization.",
      architecture: [
        "Comprehensive collection of categorized LeetCode & NeetCode problem solutions with time/space complexity trade-off analyses.",
        "Deep coverage of sliding window, monotonic stacks, union-find, DFS/BFS graph traversals, and dynamic programming memoization."
      ],
      metrics: {
        languages: "C++ (Modern C++17/20) & Python",
        domains: "Graphs, DP, Trees, Greedy, Arrays"
      }
    }
  ],

  skills: {
    categories: [
      {
        name: "Languages",
        skills: [
          { name: "Python", level: 95, highlight: "Primary Language (Django/FastAPI/Data)" },
          { name: "C++", level: 90, highlight: "DSA, System-level problem solving" },
          { name: "SQL", level: 95, highlight: "Complex CTEs, Window Functions, Optimization" },
          { name: "JavaScript", level: 85, highlight: "ES6+, Async/Await, Web APIs" },
          { name: "TypeScript", level: 80, highlight: "Type-safe full-stack workflows" }
        ]
      },
      {
        name: "Backend & Architecture",
        skills: [
          { name: "Django", level: 95, highlight: "Full MVC & ORM Mastery" },
          { name: "Django REST Framework (DRF)", level: 95, highlight: "Token Auth, Serializers, ViewSets" },
          { name: "RESTful API Design", level: 95, highlight: "Clean architecture, Idempotent APIs" },
          { name: "Concurrency & DB Locking", level: 90, highlight: "select_for_update(), Partial Indexes" },
          { name: "Role-Based Access Control (RBAC)", level: 90, highlight: "Secure permission matrix" },
          { name: "Django-Q2 / Celery", level: 85, highlight: "Asynchronous task workers" }
        ]
      },
      {
        name: "Databases & Data Engineering",
        skills: [
          { name: "PostgreSQL", level: 95, highlight: "Schema Normalization, Indexes, JSONB" },
          { name: "MySQL", level: 85, highlight: "Relational modeling, Joins" },
          { name: "ETL Pipeline Engineering", level: 90, highlight: "Automated ingestion, validation" },
          { name: "Query Profiling & Tuning", level: 90, highlight: "EXPLAIN ANALYZE, Index Optimization" },
          { name: "Data Warehousing Basics", level: 80, highlight: "Star schema, aggregate tables" }
        ]
      },
      {
        name: "Data, Analytics & AI",
        skills: [
          { name: "Pandas & NumPy", level: 90, highlight: "Data cleaning, statistical profiling" },
          { name: "Power BI & Tableau", level: 88, highlight: "Executive dashboards, DAX metrics" },
          { name: "OpenAI API & LLM Pipelines", level: 90, highlight: "Structured parsing, embeddings" },
          { name: "Google Gemini API", level: 88, highlight: "Clinical triage, summaries" },
          { name: "Whisper & PyAnnote", level: 85, highlight: "Audio transcription, call diarization" }
        ]
      },
      {
        name: "Frontend & UI",
        skills: [
          { name: "React.js", level: 88, highlight: "Hooks, Context API, Component Architecture" },
          { name: "Tailwind CSS", level: 92, highlight: "Modern utility-first styling, Dark mode" },
          { name: "HTML5 & CSS3", level: 95, highlight: "Semantic, accessible layouts" },
          { name: "Responsive Design", level: 95, highlight: "Mobile-first, cross-browser support" }
        ]
      },
      {
        name: "Tools & DevOps",
        skills: [
          { name: "Git & GitHub", level: 95, highlight: "Branching workflows, PR reviews" },
          { name: "Postman", level: 92, highlight: "API testing, collections, mock servers" },
          { name: "Linux / Bash Scripting", level: 85, highlight: "Daemon scripts, cron automation" },
          { name: "OAuth 2.0 & JWT", level: 90, highlight: "Google Calendar sync, Token Auth" },
          { name: "Docker Basics", level: 75, highlight: "Containerized environments" }
        ]
      }
    ]
  },

  achievements: [
    {
      id: "cyber-for-her",
      title: "Top 20 Finalist (out of 200+ Teams)",
      event: "Cyber for HER Hackathon",
      organizer: "DSCI (Data Security Council of India), with EY and Rubrik",
      description: "Selected among top 20 finalist teams nationally for engineering innovative cybersecurity and data protection architecture solutions.",
      badge: "National Finalist",
      icon: "ShieldAlert"
    },
    {
      id: "sih-finalist",
      title: "Finalist — Smart India Hackathon (SIH)",
      event: "Smart India Hackathon",
      organizer: "Ministry of Education & AICTE, Govt. of India",
      description: "Qualified as a finalist in India's largest nationwide hackathon, architecting scalable technological solutions for national problem statements.",
      badge: "National Finalist",
      icon: "Award"
    },
    {
      id: "linpack-payment",
      title: "2nd Place Winner — E-Commerce Payment Integration",
      event: "Payment Integration Hackathon",
      organizer: "Linpack Club",
      description: "Secured 2nd place for implementing a bulletproof, concurrency-resilient Razorpay payment gateway integration with webhook verification.",
      badge: "2nd Place Winner",
      icon: "CreditCard"
    },
    {
      id: "ecell-iitb",
      title: "Campus Ambassador — E-Cell IIT Bombay",
      event: "Leadership & Community Outreach",
      organizer: "Entrepreneurship Cell, IIT Bombay",
      description: "Led an active team of 25 student ambassadors, organizing entrepreneurship initiatives, technology workshops, and hackathon campaigns.",
      badge: "Team Lead (25 members)",
      icon: "Users"
    }
  ],

  terminalCommands: {
    help: "Available commands:\n- about       : Output bio, education & CGPA\n- skills      : List top technical competencies\n- experience  : Show internship timeline\n- projects    : Display featured repositories & architecture\n- honors      : View hackathon achievements & leadership\n- contact     : Get email, GitHub, LinkedIn links\n- clear       : Clear terminal output",
    about: "Vipanchi Barman — Backend & Data Systems Engineer\nEducation: B.Tech CSE at Vellore Institute of Technology (VIT) Bhopal\nCGPA: 9.04 / 10.0 (Expected May 2027)\nFocus: High-concurrency backends, PostgreSQL schema design, ETL pipelines, LLM integration.",
    skills: "CORE TECHNICAL SKILLS:\n- Languages: Python, C++, SQL, JavaScript, TypeScript\n- Backend: Django, DRF, REST APIs, select_for_update(), RBAC, Django-Q2\n- Databases & Data: PostgreSQL, MySQL, Pandas, NumPy, Power BI, ETL\n- AI / Speech: OpenAI API, Gemini API, Whisper, PyAnnote\n- Frontend: React.js, Tailwind CSS",
    experience: "EXPERIENCE:\n1. Python Backend Developer Intern | Meslova Systems (May 2026 – Jul 2026)\n   - B2B ATS platform, 15+ REST APIs, RBAC, Whisper/PyAnnote audio analytics.\n2. Backend Developer Intern | Saurabhi Media (Apr 2026 – May 2026)\n   - Python automated ETL pipeline, watch-folder daemon, idempotent data validation.",
    projects: "FEATURED PROJECTS:\n1. HireMind - AI-Powered ATS (Django, DRF, React, PostgreSQL, OpenAI)\n2. AyuSetu - Concurrency-Safe Healthcare Booking (Django, select_for_update, Gemini)\n3. AuditLens - Forensic Anomaly Detection (SQL, Python, Pandas, Power BI)\n4. ShopVerse - E-Commerce & Razorpay Engine (React, Node.js, TS, PostgreSQL)",
    honors: "AWARDS & HONORS:\n🏆 Top 20 Finalist (200+ teams) - Cyber for HER (DSCI / EY / Rubrik)\n🌟 Finalist - Smart India Hackathon (SIH)\n🥈 2nd Place - Linpack Payment Integration Challenge\n🚀 Campus Ambassador - E-Cell IIT Bombay (Led team of 25)",
    contact: "CONTACT DETAILS:\n- Email: barman23vipanchi@gmail.com\n- Phone: +91 6364696723\n- GitHub: https://github.com/vip23anchib\n- LinkedIn: https://linkedin.com/in/vipanchi-barman\n- LeetCode: https://leetcode.com/u/vip23anchib"
  }
};
