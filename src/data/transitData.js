export const TRANSIT_LINES = {
  BACKEND: {
    id: 'backend',
    code: 'B',
    name: 'Backend & Systems Line',
    color: '#1B5FA8', // Classic Transit Blue
    contrastText: '#FFFFFF',
    skills: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'select_for_update()', 'Concurrency', 'Token Auth / RBAC', 'OAuth 2.0'],
    description: 'High-concurrency servers, relational database locking, authentication boundaries, and clean RESTful API design.'
  },
  DATA: {
    id: 'data',
    code: 'D',
    name: 'Data & ETL Line',
    color: '#E05A2B', // Warm Transit Coral/Orange
    contrastText: '#FFFFFF',
    skills: ['PostgreSQL', 'Advanced SQL (CTEs, Window Functions)', 'Pandas', 'Power BI', 'ETL Pipelines', 'Data Normalization'],
    description: 'Relational data stores, analytical queries, financial anomaly detection, and automated ETL ingestion.'
  },
  ML_AUDIO: {
    id: 'ml_audio',
    code: 'M',
    name: 'ML & Audio Line',
    color: '#7E347D', // Deep Transit Violet
    contrastText: '#FFFFFF',
    skills: ['OpenAI Whisper', 'PyAnnote', 'FFmpeg', 'NumPy', 'OpenAI API', 'Google Gemini API', 'Speaker Diarization'],
    description: 'Speech recognition, acoustic feature extraction, speaker diarization, and LLM evaluation pipelines.'
  },
  FRONTEND_SYS: {
    id: 'frontend_sys',
    code: 'F',
    name: 'Frontend & Systems Line',
    color: '#1B824C', // Forest Transit Green
    contrastText: '#FFFFFF',
    skills: ['React.js', 'Firebase', 'Tailwind CSS', 'PyQt5', 'HTML5 Canvas', 'TypeScript', 'Responsive UI'],
    description: 'Interactive canvas visualizers, realtime dashboards, state management, and desktop GUI systems.'
  }
};

export const TRANSIT_STATIONS = [
  // 1. ORIGIN: EDUCATION
  {
    id: 'vit-bhopal-terminus',
    name: 'VIT Bhopal',
    shortName: 'VIT Bhopal',
    subtitle: 'B.Tech in Computer Science & Engineering • 9.04 CGPA',
    type: 'terminus_origin',
    x: 80,
    y: 380,
    labelPos: 'bottom',
    lines: ['backend', 'data', 'ml_audio', 'frontend_sys'],
    category: 'Education & Academic Track',
    summary: 'Graduating in 2027 from Vellore Institute of Technology (VIT), Bhopal with a 9.04 / 10.0 CGPA. Built a strong theoretical and practical foundation in Database Systems, Operating Systems, Computer Networks, and Data Structures & Algorithms.',
    details: {
      institution: 'Vellore Institute of Technology (VIT), Bhopal',
      degree: 'B.Tech in Computer Science and Engineering',
      cgpa: '9.04 / 10.0',
      period: '2023 – Expected May 2027',
      coursework: [
        'Database Management Systems (DBMS)',
        'Design & Analysis of Algorithms (DAA)',
        'Operating Systems & Concurrency',
        'Computer Networks & Protocols',
        'Object-Oriented Programming (C++/Java)',
        'Data Structures & Optimization'
      ]
    },
    techStack: ['C++', 'Python', 'SQL', 'Data Structures', 'DBMS', 'Operating Systems'],
    stats: [
      { label: 'Academic CGPA', value: '9.04 / 10.0' },
      { label: 'DSA Solutions', value: '300+ Problems' },
      { label: 'Expected Graduation', value: 'May 2027' }
    ]
  },

  // 2. INTERNSHIP: SAURABHI MEDIA
  {
    id: 'saurabhi-media',
    name: 'Saurabhi Media',
    shortName: 'Saurabhi Media',
    subtitle: 'Backend Developer Intern • High-Throughput ETL & Automated Ingestion',
    type: 'interchange',
    x: 240,
    y: 380,
    labelPos: 'top',
    lines: ['backend', 'data'],
    category: 'Work Experience',
    period: 'Apr 2026 – May 2026',
    role: 'Backend Developer Intern',
    company: 'Saurabhi Media Pvt. Ltd. (Delhi, India)',
    summary: 'Built high-throughput Python ETL pipelines and automated watch-folder background services to parse, sanitize, and ingest large-volume multi-source CSV datasets directly into relational databases, eliminating manual data entry.',
    architecture: [
      'Engineered an automated watch-folder background daemon to ingest incoming media metadata files in real-time with zero manual intervention.',
      'Designed modular, idempotent pipeline stages with structured error handling, log rotation, and data-quality validation checks.',
      'Optimized SQL ingestion batch routines, minimizing disk I/O and boosting processing throughput.'
    ],
    techStack: ['Python', 'SQL', 'ETL Pipelines', 'Relational Databases', 'Watch-Folder Ingestion', 'Linux Services'],
    stats: [
      { label: 'Manual Entry', value: '100% Automated' },
      { label: 'Pipeline Mode', value: 'Idempotent' },
      { label: 'Destination', value: 'Relational DBs' }
    ]
  },

  // 3. PROJECT: AUDITLENS
  {
    id: 'auditlens',
    name: 'AuditLens',
    shortName: 'AuditLens',
    subtitle: 'Financial Forensic Analytics & Transaction Anomaly Detection',
    type: 'junction',
    x: 390,
    y: 260,
    labelPos: 'top',
    lines: ['backend', 'data'],
    category: 'Featured Project',
    github: 'https://github.com/vip23anchib/AuditLens',
    live: null,
    summary: 'An enterprise forensic audit analytics suite built to detect financial anomalies, duplicate payments, policy circumvention, and high-risk transactional patterns across 100,000+ ledger records.',
    architecture: [
      'Analyzed 100K+ transactional records using advanced SQL (window functions, Common Table Expressions, and LAG/LEAD partition analyses).',
      'Implemented statistical Z-score outlier detection and duplicate invoice clustering algorithms via Python and Pandas.',
      'Designed interactive Power BI executive dashboards visualizing departmental spend variances and vendor concentration risk.',
      'Engineered heuristic detection rules to flag split payments timed specifically to bypass procurement authorization limits.'
    ],
    techStack: ['SQL (CTEs & Window Functions)', 'Python', 'Pandas', 'Power BI', 'Statistical Outlier Analysis'],
    stats: [
      { label: 'Ledger Records', value: '100K+ Analyzed' },
      { label: 'Core Technique', value: 'CTEs + LAG/LEAD' },
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
    name: 'AyuSetu',
    shortName: 'AyuSetu',
    subtitle: 'Clinical Booking Platform • Concurrency Locking & AI Triage',
    type: 'grand_junction',
    x: 550,
    y: 380,
    labelPos: 'bottom',
    lines: ['backend', 'data', 'ml_audio'],
    category: 'Featured Project',
    github: 'https://github.com/vip23anchib/ayusetu-healthcare',
    live: 'https://ayusetu-healthcare.vercel.app',
    summary: 'Built a concurrency-safe clinical appointment platform using select_for_update() row-level database locking so double-bookings can never occur under high load, combined with asynchronous Gemini AI clinical triage and bi-directional Google Calendar sync.',
    architecture: [
      'Pessimistic row-level database locking with select_for_update() and a partial unique index, backed by a 5-minute temporary slot hold to completely eliminate race conditions.',
      'Asynchronous clinical triage pipeline using Django-Q2 worker queues communicating with the Google Gemini API for post-visit patient summaries.',
      'Integrated Google Calendar OAuth 2.0 to bi-directionally sync doctor shifts, leaves, and appointments with automatic conflict cancellation.',
      'Comprehensive backend test suite with 31 automated integration tests validating race conditions, reservation expiration, and OAuth token refreshes.'
    ],
    techStack: ['Python', 'Django', 'DRF', 'PostgreSQL', 'select_for_update()', 'React', 'Gemini API', 'Django-Q2', 'OAuth 2.0'],
    stats: [
      { label: 'Concurrency Lock', value: 'select_for_update()' },
      { label: 'Automated Tests', value: '31 Test Suites' },
      { label: 'Slot Hold Duration', value: '5-Minute Lock' }
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

  // 5. INTERNSHIP: MESLOVA SYSTEMS (Backend + ML)
  {
    id: 'meslova-systems',
    name: 'Meslova Systems',
    shortName: 'Meslova Systems',
    subtitle: 'Python Backend Developer Intern • ATS Platform & Audio Analytics',
    type: 'interchange',
    x: 710,
    y: 260,
    labelPos: 'top',
    lines: ['backend', 'ml_audio'],
    category: 'Work Experience',
    period: 'May 2026 – Jul 2026',
    role: 'Python Backend Developer Intern',
    company: 'Meslova Systems Pvt. Ltd. (Hyderabad, India)',
    summary: 'Architected and engineered the backend infrastructure for a B2B SaaS recruitment and ATS platform, powering role-based portals for recruiters and admins with 15+ secure RESTful APIs, token RBAC, and an asynchronous audio analytics pipeline.',
    architecture: [
      'Architected 15+ secure REST APIs and token-based RBAC across an 8+ table normalized PostgreSQL schema with sub-150ms indexed queries.',
      'Engineered candidate screening workflows including resume parsing, automated scoring, search/filter, and audit activity logs.',
      'Contributed to an asynchronous audio-analytics pipeline utilizing OpenAI Whisper and PyAnnote for speaker-wise call diarization.'
    ],
    techStack: ['Python', 'Django', 'DRF', 'PostgreSQL', 'Whisper', 'PyAnnote', 'Token Auth', 'RBAC'],
    stats: [
      { label: 'REST APIs', value: '15+ Endpoints' },
      { label: 'Schema Design', value: '8+ Tables' },
      { label: 'Query Latency', value: '<150ms Indexed' }
    ]
  },

  // 6. PROJECT: HIREMIND (Backend + ML)
  {
    id: 'hiremind',
    name: 'HireMind',
    shortName: 'HireMind',
    subtitle: 'AI-Powered Applicant Tracking & Resume Ranking System',
    type: 'junction',
    x: 870,
    y: 260,
    labelPos: 'bottom',
    lines: ['backend', 'ml_audio'],
    category: 'Featured Project',
    github: 'https://github.com/vip23anchib/HireMind',
    live: null,
    summary: 'A full-scale ATS platform designed to automate applicant shortlisting, structured resume extraction, and candidate-to-job matching with OpenAI API LLM evaluation.',
    architecture: [
      'Engineered an LLM-driven resume parsing and candidate-ranking pipeline using OpenAI API, scoring 1,000+ candidate profiles against job specifications.',
      'Normalized schema across 8+ entities (Jobs, Candidates, Applications, Stages, EvaluationMetrics) with 15+ REST endpoints.',
      'Implemented a stage-wise funnel analytics layer giving recruiters actionable visibility across hiring stages.',
      'Enforced role-based access control (RBAC) separating candidate, recruiter, and administrator actions.'
    ],
    techStack: ['Python', 'Django', 'DRF', 'React', 'PostgreSQL', 'OpenAI API', 'Token Auth', 'RBAC'],
    stats: [
      { label: 'Profiles Scored', value: '1,000+ Resumes' },
      { label: 'Shortlisting Time', value: '70% Saved' },
      { label: 'Schema Entities', value: '8+ Normalized Tables' }
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

  // 7. PROJECT: AUDIO ANALYTICS DASHBOARD (ML Line)
  {
    id: 'audio-analytics',
    name: 'Audio Analytics Dashboard',
    shortName: 'Audio Analytics',
    subtitle: 'Whisper & PyAnnote Speaker Diarization Pipeline',
    type: 'station',
    x: 1010,
    y: 260,
    labelPos: 'top',
    lines: ['ml_audio'],
    category: 'Audio / ML Project',
    github: 'https://github.com/vip23anchib',
    live: null,
    summary: 'An asynchronous speech processing pipeline combining OpenAI Whisper for high-accuracy transcription and PyAnnote for speaker diarization, formatted via FFmpeg audio chunking.',
    architecture: [
      'Engineered multi-channel audio extraction using FFmpeg subprocesses to normalize sampling rates and bitrate.',
      'PyAnnote speaker embedding extraction identifying discrete speaker turns and speech intervals.',
      'Whisper timestamp alignment mapping speaker IDs to exact transcript segments.'
    ],
    techStack: ['Whisper', 'PyAnnote', 'FFmpeg', 'NumPy', 'Python', 'Audio Processing'],
    stats: [
      { label: 'Processing Mode', value: 'Asynchronous' },
      { label: 'Diarization', value: 'Multi-Speaker' },
      { label: 'Audio Engine', value: 'FFmpeg Core' }
    ]
  },

  // 8. PROJECT: MEDICHAIN (Frontend + Backend)
  {
    id: 'medichain',
    name: 'MediChain',
    shortName: 'MediChain',
    subtitle: 'Clinical Verification & Tamper-Evident Medical Record Portal',
    type: 'junction',
    x: 690,
    y: 500,
    labelPos: 'bottom',
    lines: ['frontend_sys', 'backend'],
    category: 'Healthcare System',
    github: 'https://github.com/vip23anchib',
    live: null,
    summary: 'A secure healthcare records portal featuring tamper-evident cryptographic hash verification, role-segregated access for patients and providers, and real-time state sync with Firebase.',
    architecture: [
      'Engineered a responsive frontend using React, Tailwind CSS, and Firebase realtime listeners.',
      'Implemented secure access tokens and cryptographic audit trail logs for clinical access events.'
    ],
    techStack: ['React', 'Firebase', 'Tailwind CSS', 'REST APIs', 'Cryptographic Hashing'],
    stats: [
      { label: 'Integrity Check', value: 'Cryptographic Hash' },
      { label: 'Realtime Sync', value: 'Firebase Engine' }
    ]
  },

  // 9. PROJECT: PROCESSVIZ / CHEMICAL EQUIPMENT VISUALIZER (Frontend + Systems)
  {
    id: 'processviz',
    name: 'Chemical Equipment Visualizer',
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
    summary: 'An interactive engineering platform for visualizing chemical vessel schematics, flow rates, thermodynamic calculations, and automated PDF engineering report generation.',
    architecture: [
      'Dynamic HTML5 Canvas schematic renderer with interactive zoom and drag-and-drop parameter inputs.',
      'Real-time thermodynamic calculation engine generating instant printable technical audit PDFs.'
    ],
    techStack: ['React', 'JavaScript', 'HTML5 Canvas', 'PyQt5', 'Tailwind CSS'],
    stats: [
      { label: 'Rendering', value: 'HTML5 Canvas Schematics' },
      { label: 'Deployment', value: 'Live on Vercel' }
    ]
  },

  // 10. PROJECT: SHOPVERSE (Frontend + Backend)
  {
    id: 'shopverse',
    name: 'ShopVerse',
    shortName: 'ShopVerse',
    subtitle: 'E-Commerce Platform & Resilient Payment Gateway Engine',
    type: 'junction',
    x: 990,
    y: 500,
    labelPos: 'bottom',
    lines: ['frontend_sys', 'backend'],
    category: 'Full-Stack Project',
    github: 'https://github.com/vip23anchib/ShopVerse',
    live: 'https://setup-ecommerce-ps1.vercel.app',
    summary: 'A full-stack e-commerce engine featuring dynamic catalog filtering, transactional checkout state machines, and server-side HMAC signature verification for Razorpay.',
    architecture: [
      'Awarded 2nd Place in the Linpack Club 3-hour rapid build hackathon for resilient payment error recovery and webhook validation.',
      'Server-side HMAC-SHA256 signature verification preventing payment callback spoofing and double-charging.'
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Razorpay API', 'Tailwind CSS'],
    stats: [
      { label: 'Hackathon Award', value: '2nd Place Winner' },
      { label: 'Security', value: 'HMAC-SHA256 Verification' }
    ]
  },

  // 11. DESTINATION: OPEN TO OPPORTUNITIES
  {
    id: 'sde-terminus',
    name: 'Open to SDE Roles',
    shortName: 'Open to Roles',
    subtitle: 'Available for Software Development Engineer & Backend Developer Roles',
    type: 'terminus_destination',
    x: 1130,
    y: 380,
    labelPos: 'right',
    lines: ['backend', 'data', 'ml_audio', 'frontend_sys'],
    category: 'Current Status',
    summary: 'Currently seeking Software Development Engineer (SDE) and Backend Developer opportunities (both full-time and internships). Specializing in Python/Django, PostgreSQL concurrency locking, distributed ETL data pipelines, and AI systems.',
    details: {
      status: 'Open to SDE / Backend Roles',
      locations: 'Bhopal / Hyderabad / Delhi / Remote',
      email: 'barman23vipanchi@gmail.com',
      phone: '+91 6364696723',
      github: 'https://github.com/vip23anchib',
      linkedin: 'https://linkedin.com/in/vipanchi-barman',
      leetcode: 'https://leetcode.com/u/vip23anchib'
    },
    techStack: ['Python', 'Django/DRF', 'PostgreSQL', 'SQL', 'Concurrency', 'System Architecture'],
    stats: [
      { label: 'Availability', value: 'Immediate / 2027 Grad' },
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
    name: 'Top 20 — Cyber for HER',
    code: 'CYBER',
    organizer: 'DSCI (Data Security Council of India), with EY and Rubrik',
    badge: 'Top 20 Nationally',
    icon: 'Shield',
    x: 640,
    y: 120,
    connectsTo: 'meslova-systems',
    summary: 'Selected among the top 20 finalist teams out of 200+ teams nationally for architecting innovative cybersecurity and data protection architecture.'
  },
  {
    id: 'linpack-award',
    name: '2nd Place: Payment Integration Challenge',
    code: 'LINPACK',
    organizer: 'Linpack Club Payment Hackathon',
    badge: '2nd Place Winner',
    icon: 'Trophy',
    x: 990,
    y: 650,
    connectsTo: 'shopverse',
    summary: 'Secured 2nd place in a 3-hour rapid build competition for a resilient Razorpay payment gateway integration with webhook verification.'
  },
  {
    id: 'ecell-iitb',
    name: 'Campus Ambassador — E-Cell IIT Bombay',
    code: 'IIT-B',
    organizer: 'Entrepreneurship Cell, IIT Bombay',
    badge: 'Team Lead (25 Ambassadors)',
    icon: 'Users',
    x: 340,
    y: 570,
    connectsTo: 'vit-bhopal-terminus',
    summary: 'Led an active team of 25 student ambassadors, organizing entrepreneurship initiatives, workshops, and hackathon campaigns.'
  }
];

// SVG Schematic Tracks (With gentle curved turns)
export const SVG_TRACK_PATHS = {
  // Backend Line (Blue)
  backend: {
    color: '#1B5FA8',
    d: 'M 80 380 L 240 380 Q 280 380 310 330 L 370 280 Q 390 260 410 260 L 430 260 Q 460 260 490 310 L 530 360 Q 550 380 570 380 L 590 380 Q 620 380 650 330 L 690 280 Q 710 260 730 260 L 870 260 Q 910 260 930 300 L 930 460 Q 930 500 970 500 L 1050 500 Q 1090 500 1110 440 L 1130 380'
  },
  // Data Line (Orange/Coral)
  data: {
    color: '#E05A2B',
    d: 'M 80 380 L 240 380 Q 280 380 310 330 L 370 280 Q 390 260 410 260 L 430 260 Q 460 260 490 310 L 530 360 Q 550 380 570 380 L 1050 380 L 1130 380'
  },
  // ML & Audio Line (Deep Violet)
  ml_audio: {
    color: '#7E347D',
    d: 'M 80 380 L 470 380 Q 510 380 550 380 L 570 380 Q 610 380 640 330 L 680 280 Q 700 260 720 260 L 870 260 L 1010 260 Q 1060 260 1090 320 L 1130 380'
  },
  // Frontend & Systems Line (Forest Green)
  frontend_sys: {
    color: '#1B824C',
    d: 'M 80 380 L 240 380 Q 280 380 300 420 L 320 460 Q 350 490 390 490 L 550 490 Q 600 490 630 500 L 690 500 L 850 500 L 990 500 Q 1050 500 1090 440 L 1130 380'
  }
};

// Express Landmark Spur Track Lines
export const SVG_SPUR_PATHS = [
  { id: 'sih-spur', d: 'M 390 260 L 390 170 Q 390 140 430 130 L 460 120', target: 'sih-finalist' },
  { id: 'cyber-spur', d: 'M 710 260 L 710 170 Q 710 140 670 130 L 640 120', target: 'cyber-for-her' },
  { id: 'ecell-spur', d: 'M 80 380 Q 130 430 180 480 L 250 550 Q 290 570 340 570', target: 'ecell-iitb' },
  { id: 'linpack-spur', d: 'M 990 500 L 990 650', target: 'linpack-award' }
];

// Sequential Train Route Path
export const TRAIN_ANIMATION_ROUTE = [
  { x: 80, y: 380, label: 'VIT Bhopal' },
  { x: 240, y: 380, label: 'Saurabhi Media' },
  { x: 390, y: 260, label: 'AuditLens' },
  { x: 550, y: 380, label: 'AyuSetu' },
  { x: 710, y: 260, label: 'Meslova Systems' },
  { x: 870, y: 260, label: 'HireMind' },
  { x: 1010, y: 260, label: 'Audio Analytics' },
  { x: 690, y: 500, label: 'MediChain' },
  { x: 850, y: 500, label: 'ProcessViz' },
  { x: 990, y: 500, label: 'ShopVerse' },
  { x: 1130, y: 380, label: 'Open to Roles' }
];
