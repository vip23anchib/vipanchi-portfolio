export const TRANSIT_LINES = {
  BACKEND: {
    id: 'backend',
    code: 'B',
    name: 'Backend Line',
    color: '#0057B8', // Royal Transit Blue
    contrastText: '#FFFFFF',
    skills: ['Python', 'Django', 'DRF', 'REST APIs', 'select_for_update', 'Concurrency', 'Token Auth', 'RBAC', 'Celery/Django-Q2'],
    description: 'High-concurrency servers, database row locks, authentication boundaries & transactional integrity.'
  },
  DATA: {
    id: 'data',
    code: 'D',
    name: 'Data & ETL Line',
    color: '#FF6319', // Subway Orange
    contrastText: '#FFFFFF',
    skills: ['PostgreSQL', 'SQL CTEs & Window Functions', 'Pandas', 'Power BI', 'ETL Pipelines', 'Data Normalization'],
    description: 'Relational data stores, analytical queries, financial anomaly detection & automated ETL ingestion.'
  },
  ML_AUDIO: {
    id: 'ml_audio',
    code: 'M',
    name: 'ML & Audio Line',
    color: '#80397B', // Metropolitan Deep Purple/Magenta
    contrastText: '#FFFFFF',
    skills: ['Whisper', 'PyAnnote', 'FFmpeg', 'NumPy', 'OpenAI API', 'Google Gemini API', 'Speaker Diarization'],
    description: 'Speech-to-text models, acoustic feature extraction, speaker diarization & LLM evaluation workflows.'
  },
  FRONTEND_SYS: {
    id: 'frontend_sys',
    code: 'F',
    name: 'Frontend & Systems Line',
    color: '#00933C', // Transit Forest Green
    contrastText: '#FFFFFF',
    skills: ['React', 'Firebase', 'Tailwind CSS', 'PyQt5', 'HTML5 Canvas', 'OAuth 2.0', 'TypeScript'],
    description: 'Interactive graphical canvases, realtime interfaces, client-side caching & desktop GUI systems.'
  }
};

export const TRANSIT_STATIONS = [
  // 1. ORIGIN TERMINUS
  {
    id: 'vit-bhopal-terminus',
    name: 'VIT Bhopal Terminus',
    shortName: 'VIT Bhopal',
    subtitle: 'B.Tech CSE (9.04 CGPA) • Academic Foundation',
    type: 'terminus_origin',
    x: 80,
    y: 380,
    labelPos: 'bottom',
    lines: ['backend', 'data', 'ml_audio', 'frontend_sys'],
    category: 'Education & Core Foundations',
    summary: 'Starting depot of the engineering journey: 9.04 / 10.0 CGPA at Vellore Institute of Technology Bhopal. Core mastery in DBMS, Operating Systems, Computer Networks, and Data Structures.',
    details: {
      institution: 'Vellore Institute of Technology (VIT), Bhopal',
      degree: 'B.Tech in Computer Science and Engineering',
      cgpa: '9.04 / 10.0',
      period: '2023 – Expected May 2027',
      coursework: [
        'Database Management Systems (DBMS)',
        'Design and Analysis of Algorithms (DAA)',
        'Operating Systems & Concurrency',
        'Computer Networks & Protocols',
        'Object-Oriented Programming (C++/Java)',
        'Data Structures & Optimization'
      ]
    },
    techStack: ['C++', 'Python', 'SQL', 'Data Structures', 'DBMS', 'OS'],
    stats: [
      { label: 'CGPA', value: '9.04 / 10.0' },
      { label: 'DSA Vault', value: '300+ Problems' },
      { label: 'Discipline', value: 'Computer Science' }
    ]
  },

  // 2. INTERCHANGE: SAURABHI MEDIA
  {
    id: 'saurabhi-media',
    name: 'Saurabhi Media Hub',
    shortName: 'Saurabhi Media',
    subtitle: 'Backend Developer Intern • Automated ETL & Watch-Folder Daemon',
    type: 'interchange',
    x: 230,
    y: 380,
    labelPos: 'top',
    lines: ['backend', 'data'],
    category: 'Work Experience',
    period: 'Apr 2026 – May 2026',
    role: 'Backend Developer Intern',
    company: 'Saurabhi Media Pvt. Ltd. (Delhi, India)',
    summary: 'Engineered high-throughput Python ETL pipelines and background daemon services to parse, sanitize, and load large-volume multi-source CSV files into normalized relational schemas.',
    architecture: [
      'Built automated watch-folder background daemon to ingest arriving media metadata files with zero manual intervention.',
      'Constructed idempotent pipeline stages with structured error logging and data sanitization for 100% audit-readiness.',
      'Optimized SQL ingestion batch routines, minimizing disk I/O and pipeline execution bottlenecks.'
    ],
    techStack: ['Python', 'SQL', 'ETL Pipelines', 'Relational DBs', 'Watch-folder Ingestion', 'Linux Daemons'],
    stats: [
      { label: 'Ingestion Overhead', value: '0% Manual' },
      { label: 'Execution Mode', value: 'Idempotent' },
      { label: 'Schema Target', value: 'PostgreSQL/MySQL' }
    ]
  },

  // 3. JUNCTION: AUDITLENS
  {
    id: 'auditlens',
    name: 'AuditLens Junction',
    shortName: 'AuditLens',
    subtitle: 'Forensic Transaction Anomaly Detection & Audit Analytics',
    type: 'junction',
    x: 390,
    y: 260,
    labelPos: 'top',
    lines: ['backend', 'data'],
    category: 'Production Project',
    github: 'https://github.com/vip23anchib/AuditLens',
    live: null,
    summary: 'Enterprise financial forensics and anomaly detection suite designed to uncover policy circumvention, duplicate ledger entries, split payments, and high-risk transactional patterns across 100K+ ledger records.',
    architecture: [
      'Analyzed 100K+ transactional records utilizing advanced SQL (Window functions, Common Table Expressions, LAG/LEAD partition analyses).',
      'Applied statistical Z-score outlier detection and duplicate invoice clustering algorithms via Python & Pandas.',
      'Engineered interactive executive Power BI dashboards visualizing departmental spend variances and vendor concentration risks.',
      'Implemented automated heuristic models to flag transactions timed specifically to bypass procurement authorization tiers.'
    ],
    techStack: ['SQL (CTEs & Window Functions)', 'Python', 'Pandas', 'Power BI', 'Statistical Outlier Analysis'],
    stats: [
      { label: 'Ledger Records', value: '100K+ Analyzed' },
      { label: 'Query Logic', value: 'CTEs + LAG/LEAD' },
      { label: 'Dashboard', value: 'Power BI Suite' }
    ],
    codeSnippet: `-- AuditLens: Forensic Multi-Window Anomaly Detection
WITH RankedLedger AS (
    SELECT 
        txn_id, vendor_id, amount, department_id, txn_date,
        LAG(amount, 1) OVER (PARTITION BY vendor_id ORDER BY txn_date) AS prev_amount,
        AVG(amount) OVER (PARTITION BY department_id) AS dept_avg_spend,
        STDDEV(amount) OVER (PARTITION BY department_id) AS dept_stddev
    FROM financial_ledger
)
SELECT txn_id, vendor_id, amount,
       (amount - dept_avg_spend) / NULLIF(dept_stddev, 0) AS z_score_anomaly
FROM RankedLedger
WHERE amount > dept_avg_spend + (3 * dept_stddev)
   OR (amount = prev_amount AND txn_date >= NOW() - INTERVAL '48 HOURS');`
  },

  // 4. CENTRAL GRAND JUNCTION: AYUSETU (Backend + Data + ML)
  {
    id: 'ayusetu',
    name: 'AyuSetu Grand Junction',
    shortName: 'AyuSetu',
    subtitle: 'Clinical Booking Engine • Concurrency Locking & AI Triage',
    type: 'grand_junction',
    x: 550,
    y: 380,
    labelPos: 'bottom',
    lines: ['backend', 'data', 'ml_audio'],
    category: 'Featured Production Project',
    github: 'https://github.com/vip23anchib/ayusetu-healthcare',
    live: 'https://ayusetu-healthcare.vercel.app',
    summary: 'Mission-critical healthcare booking and patient follow-up engine engineered with strict database concurrency guarantees, automated Google Calendar synchronization, and asynchronous AI clinical triage.',
    architecture: [
      'Pessimistic row-level database locking with select_for_update() and a partial unique index, backed by a 5-minute temporary slot reservation hold to eliminate double bookings.',
      'Asynchronous clinical triage pipeline using Django-Q2 worker queues communicating with the Google Gemini API.',
      'Bi-directional Google Calendar OAuth 2.0 schedule sync for doctors, with automatic conflict cancellation.',
      '31 automated integration test suites validating race conditions, reservation expiration, and OAuth token refreshes.'
    ],
    techStack: ['Python', 'Django', 'DRF', 'PostgreSQL', 'select_for_update()', 'React', 'Gemini API', 'Django-Q2', 'OAuth 2.0'],
    stats: [
      { label: 'Concurrency Lock', value: 'select_for_update()' },
      { label: 'Automated Tests', value: '31 Test Suites' },
      { label: 'Slot Hold Time', value: '5-Minute Lock' }
    ],
    codeSnippet: `@transaction.atomic
def reserve_appointment_slot(doctor_id, slot_time, patient_id):
    # Acquire pessimistic row-level lock on the target slot
    slot = DoctorSlot.objects.select_for_update().get(
        doctor_id=doctor_id, 
        slot_time=slot_time, 
        status='AVAILABLE'
    )
    # Apply temporary 5-minute reservation hold
    slot.status = 'HELD'
    slot.held_by_id = patient_id
    slot.held_until = timezone.now() + timedelta(minutes=5)
    slot.save(update_fields=['status', 'held_by_id', 'held_until'])
    return slot`
  },

  // 5. INTERCHANGE: MESLOVA SYSTEMS (Backend + ML)
  {
    id: 'meslova-systems',
    name: 'Meslova Systems Hub',
    shortName: 'Meslova Systems',
    subtitle: 'Python Backend Developer Intern • ATS Platform & Audio Pipeline',
    type: 'interchange',
    x: 710,
    y: 260,
    labelPos: 'top',
    lines: ['backend', 'ml_audio'],
    category: 'Work Experience',
    period: 'May 2026 – Jul 2026',
    role: 'Python Backend Developer Intern',
    company: 'Meslova Systems Pvt. Ltd. (Hyderabad, India)',
    summary: 'Architected the core backend infrastructure for a B2B SaaS recruitment & ATS platform with 15+ secure REST APIs, token RBAC, and an asynchronous audio analytics pipeline with Whisper & PyAnnote.',
    architecture: [
      'Architected 15+ REST APIs and token-based RBAC across an 8+ table normalized PostgreSQL schema with sub-150ms indexed queries.',
      'Engineered candidate screening workflows including resume parsing, automated scoring, search/filter, and audit activity logs.',
      'Implemented async audio-analytics pipeline using OpenAI Whisper and PyAnnote for speaker diarization and hiring-signal analysis.'
    ],
    techStack: ['Python', 'Django', 'DRF', 'PostgreSQL', 'Whisper', 'PyAnnote', 'Token Auth', 'RBAC'],
    stats: [
      { label: 'APIs Built', value: '15+ REST Endpoints' },
      { label: 'Schema', value: '8+ Normalized Tables' },
      { label: 'Query Latency', value: '<150ms on Indexed Lookups' }
    ]
  },

  // 6. JUNCTION: HIREMIND (Backend + ML)
  {
    id: 'hiremind',
    name: 'HireMind Terminal',
    shortName: 'HireMind',
    subtitle: 'AI-Powered Applicant Tracking & Resume Ranking Engine',
    type: 'junction',
    x: 870,
    y: 260,
    labelPos: 'bottom',
    lines: ['backend', 'ml_audio'],
    category: 'Featured Production Project',
    github: 'https://github.com/vip23anchib/HireMind',
    live: null,
    summary: 'Full-scale ATS platform designed to automate applicant shortlisting, structured resume extraction, and candidate-to-job matching across recruitment pipelines.',
    architecture: [
      'Engineered LLM-driven resume parsing & candidate-ranking pipeline using OpenAI API, scoring 1,000+ candidate profiles.',
      'Normalized schema across 8+ entities (Jobs, Candidates, Applications, Stages, EvaluationMetrics) with 15+ REST endpoints.',
      'Implemented stage-wise funnel analytics layer giving recruiters actionable hiring bottleneck visibility.',
      'Built strict RBAC boundaries separating candidate, recruiter, and administrator actions.'
    ],
    techStack: ['Python', 'Django', 'DRF', 'React', 'PostgreSQL', 'OpenAI API', 'Token Auth', 'RBAC'],
    stats: [
      { label: 'Resumes Scored', value: '1,000+ Profiles' },
      { label: 'Manual Effort Saved', value: '70% Reduction' },
      { label: 'Schema Entities', value: '8+ Tables' }
    ],
    codeSnippet: `class CandidateRankingService:
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

  // 7. LOCAL STATION: AUDIO ANALYTICS DASHBOARD (ML Line)
  {
    id: 'audio-analytics',
    name: 'Audio Telemetry Station',
    shortName: 'Audio Analytics',
    subtitle: 'Whisper & PyAnnote Speaker Diarization Pipeline',
    type: 'station',
    x: 1010,
    y: 260,
    labelPos: 'top',
    lines: ['ml_audio'],
    category: 'ML / Audio Systems',
    github: 'https://github.com/vip23anchib',
    live: null,
    summary: 'Asynchronous speech processing pipeline combining OpenAI Whisper for high-accuracy multilingual transcription and PyAnnote for speaker diarization, formatted via FFmpeg audio chunking.',
    architecture: [
      'Engineered multi-channel audio extraction using FFmpeg subprocesses to normalize sampling rates and bitrate.',
      'PyAnnote speaker embedding extraction identifying discrete speaker turns and speech intervals.',
      'Whisper timestamp alignment mapping speaker IDs to exact transcript segments.'
    ],
    techStack: ['Whisper', 'PyAnnote', 'FFmpeg', 'NumPy', 'Python', 'Audio Processing'],
    stats: [
      { label: 'Pipeline Mode', value: 'Asynchronous' },
      { label: 'Diarization', value: 'Multi-Speaker' },
      { label: 'Audio Engine', value: 'FFmpeg Core' }
    ]
  },

  // 8. JUNCTION: MEDICHAIN (Frontend + Backend)
  {
    id: 'medichain',
    name: 'MediChain Station',
    shortName: 'MediChain',
    subtitle: 'Decentralized Clinical Verification & Record Portal',
    type: 'junction',
    x: 690,
    y: 500,
    labelPos: 'bottom',
    lines: ['frontend_sys', 'backend'],
    category: 'Production Project',
    github: 'https://github.com/vip23anchib',
    live: null,
    summary: 'Healthcare records portal with tamper-evident cryptographic hash verification, role-segregated access for patients and providers, and real-time state sync.',
    architecture: [
      'Engineered reactive frontend using React, Tailwind CSS, and Firebase realtime listeners.',
      'Implemented secure access tokens and cryptographic audit trail logs for clinical access events.'
    ],
    techStack: ['React', 'Firebase', 'Tailwind CSS', 'REST APIs', 'Token Security'],
    stats: [
      { label: 'Verification', value: 'Cryptographic Hash' },
      { label: 'Realtime Sync', value: 'Firebase Engine' }
    ]
  },

  // 9. JUNCTION: CHEMICAL EQUIPMENT VISUALIZER (ProcessViz) (Frontend + Systems)
  {
    id: 'processviz',
    name: 'ProcessViz Station',
    shortName: 'ProcessViz',
    subtitle: 'Chemical Process Equipment Visualizer & Report Engine',
    type: 'junction',
    x: 850,
    y: 500,
    labelPos: 'top',
    lines: ['frontend_sys', 'backend'],
    category: 'Engineering Tool',
    github: 'https://github.com/vip23anchib/ProcessViz',
    live: 'https://chemical-equipment-visualizer-mu.vercel.app',
    summary: 'Interactive industrial engineering platform for visualizing vessel schematics, flow rates, thermodynamic calculations, and automated PDF engineering report generation.',
    architecture: [
      'Dynamic HTML5 Canvas schematic renderer with interactive zoom and drag-and-drop parameter inputs.',
      'Real-time thermodynamic calculation engine generating instant printable technical audit PDFs.'
    ],
    techStack: ['React', 'JavaScript', 'HTML5 Canvas', 'PyQt5', 'Tailwind CSS'],
    stats: [
      { label: 'Rendering', value: 'HTML5 Canvas Schematics' },
      { label: 'Live Deployment', value: 'Vercel Live' }
    ]
  },

  // 10. JUNCTION: SHOPVERSE (Frontend + Backend)
  {
    id: 'shopverse',
    name: 'ShopVerse Station',
    shortName: 'ShopVerse',
    subtitle: 'E-Commerce Platform & Resilient Payment Gateway Engine',
    type: 'junction',
    x: 990,
    y: 500,
    labelPos: 'bottom',
    lines: ['frontend_sys', 'backend'],
    category: 'Full Stack Project',
    github: 'https://github.com/vip23anchib/ShopVerse',
    live: 'https://setup-ecommerce-ps1.vercel.app',
    summary: 'Full-stack e-commerce engine featuring state-machine checkout flows, transactional order processing, and server-side HMAC signature verification for Razorpay.',
    architecture: [
      '2nd Place Winner in the Linpack Club 3-hour rapid build hackathon for bulletproof payment failure recovery.',
      'Server-side HMAC-SHA256 signature verification preventing payment callback spoofing and double-charging.'
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Razorpay API', 'Tailwind CSS'],
    stats: [
      { label: 'Hackathon Award', value: '2nd Place Winner' },
      { label: 'Signature Security', value: 'HMAC-SHA256' }
    ]
  },

  // 11. DESTINATION TERMINUS: OPEN TO SDE ROLES
  {
    id: 'sde-terminus',
    name: 'Terminus: Open to SDE Roles',
    shortName: 'SDE Terminus',
    subtitle: 'Available for SDE / Backend Engineering Roles • Ready to Dispatch',
    type: 'terminus_destination',
    x: 1130,
    y: 380,
    labelPos: 'right',
    lines: ['backend', 'data', 'ml_audio', 'frontend_sys'],
    category: 'Career Dispatch',
    summary: 'Active station ready for full-time Software Development Engineer & Backend Developer opportunities. Deep proficiency in high-concurrency Python/Django, normalized PostgreSQL schemas, distributed data pipelines, and AI systems.',
    details: {
      status: 'Open to SDE / Backend Roles (Internships & Full-Time)',
      locations: 'Bhopal / Hyderabad / Delhi / Remote',
      email: 'barman23vipanchi@gmail.com',
      phone: '+91 6364696723',
      github: 'https://github.com/vip23anchib',
      linkedin: 'https://linkedin.com/in/vipanchi-barman',
      leetcode: 'https://leetcode.com/u/vip23anchib'
    },
    techStack: ['Python', 'Django/DRF', 'PostgreSQL', 'SQL', 'FastAPI', 'System Architecture'],
    stats: [
      { label: 'Status', value: 'Immediate Availability' },
      { label: 'Target Roles', value: 'Backend / SDE / Data' },
      { label: 'Contact', value: 'barman23vipanchi@gmail.com' }
    ]
  }
];

export const LANDMARK_ACHIEVEMENTS = [
  {
    id: 'sih-finalist',
    name: 'Smart India Hackathon Finalist',
    code: 'SIH',
    organizer: 'Ministry of Education & AICTE, Govt. of India',
    badge: 'National Finalist',
    icon: 'Award',
    x: 460,
    y: 120,
    connectsTo: 'auditlens',
    summary: 'Finalist in India’s largest nationwide hackathon, architecting scalable technological solutions for national problem statements.'
  },
  {
    id: 'cyber-for-her',
    name: 'Top 20 Cyber for HER',
    code: 'CYBER',
    organizer: 'DSCI (Data Security Council of India), EY, Rubrik',
    badge: 'Top 20 Nationally',
    icon: 'Shield',
    x: 640,
    y: 120,
    connectsTo: 'meslova-systems',
    summary: 'Selected among top 20 finalist teams out of 200+ teams nationally for architecting innovative cybersecurity solutions.'
  },
  {
    id: 'linpack-award',
    name: '2nd Place: Payment Gateway Build',
    code: 'LINPACK',
    organizer: 'Linpack Club Payment Integration Challenge',
    badge: '2nd Place Winner',
    icon: 'Trophy',
    x: 990,
    y: 650,
    connectsTo: 'shopverse',
    summary: 'Secured 2nd place in a 3-hour rapid build for resilient Razorpay payment integration with HMAC validation.'
  },
  {
    id: 'ecell-iitb',
    name: 'Campus Ambassador — E-Cell IIT Bombay',
    code: 'IIT-B',
    organizer: 'Entrepreneurship Cell, IIT Bombay',
    badge: 'Lead (25 Ambassadors)',
    icon: 'Users',
    x: 340,
    y: 570,
    connectsTo: 'vit-bhopal-terminus',
    summary: 'Led an active team of 25 student ambassadors, organizing entrepreneurship initiatives and tech workshops.'
  }
];

// SVG Schematic Tracks (Octolinear paths using 0°, 45°, 90° bends)
export const SVG_TRACK_PATHS = {
  // Backend Line (Blue) - Starts at VIT, runs through Saurabhi, AuditLens, AyuSetu, Meslova, HireMind, loops through MediChain, ShopVerse to Terminus
  backend: {
    color: '#0057B8',
    d: 'M 80 380 L 230 380 L 310 300 L 390 260 L 470 300 L 550 380 L 630 300 L 710 260 L 870 260 L 930 320 L 930 440 L 990 500 L 1050 500 L 1090 440 L 1130 380'
  },
  // Data Line (Orange) - Starts at VIT, goes through Saurabhi, climbs to AuditLens, converges at AyuSetu, runs to Terminus
  data: {
    color: '#FF6319',
    d: 'M 80 380 L 230 380 L 310 300 L 390 260 L 470 300 L 550 380 L 630 380 L 1050 380 L 1130 380'
  },
  // ML & Audio Line (Purple) - Starts at VIT, runs through AyuSetu, climbs to Meslova, HireMind, Audio Station, to Terminus
  ml_audio: {
    color: '#80397B',
    d: 'M 80 380 L 470 380 L 550 380 L 630 300 L 710 260 L 870 260 L 1010 260 L 1070 320 L 1130 380'
  },
  // Frontend & Systems Line (Green) - Starts at VIT, descends to MediChain, ProcessViz, ShopVerse, to Terminus
  frontend_sys: {
    color: '#00933C',
    d: 'M 80 380 L 230 380 L 310 460 L 550 460 L 630 500 L 690 500 L 850 500 L 990 500 L 1050 500 L 1090 440 L 1130 380'
  }
};

// Express Landmark Spur Track Lines
export const SVG_SPUR_PATHS = [
  { id: 'sih-spur', d: 'M 390 260 L 390 170 L 460 120', target: 'sih-finalist' },
  { id: 'cyber-spur', d: 'M 710 260 L 710 170 L 640 120', target: 'cyber-for-her' },
  { id: 'ecell-spur', d: 'M 80 380 L 170 470 L 250 570 L 340 570', target: 'ecell-iitb' },
  { id: 'linpack-spur', d: 'M 990 500 L 990 650', target: 'linpack-award' }
];

// Sequential Train Route Path for the onLoad train animation
export const TRAIN_ANIMATION_ROUTE = [
  { x: 80, y: 380, label: 'VIT Bhopal Origin' },
  { x: 230, y: 380, label: 'Saurabhi Media Hub' },
  { x: 390, y: 260, label: 'AuditLens Junction' },
  { x: 550, y: 380, label: 'AyuSetu Grand Junction' },
  { x: 710, y: 260, label: 'Meslova Systems Hub' },
  { x: 870, y: 260, label: 'HireMind Terminal' },
  { x: 1010, y: 260, label: 'Audio Telemetry' },
  { x: 690, y: 500, label: 'MediChain Portal' },
  { x: 850, y: 500, label: 'ProcessViz Station' },
  { x: 990, y: 500, label: 'ShopVerse Station' },
  { x: 1130, y: 380, label: 'Open to SDE Roles' }
];
