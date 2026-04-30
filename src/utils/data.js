export const personalInfo = {
  name: 'Vansh Shah',
  title: 'MCA Student & Full-Stack Developer',
  tagline: 'Full-stack developer with experience in building web applications, APIs, and data-driven systems.',
  bio: `I am an MCA student and full-stack developer with experience in building web applications, APIs, and data-driven systems. I enjoy solving practical problems through clean backend architecture and thoughtful product development.

I am especially strong in backend development and problem solving, with a growing focus on scalable systems, maintainable code, and real-world applications that create measurable value.`,
  email: 'vanshshah1011@gmail.com',
  location: 'Borivali, Mumbai',
  availability: 'Available for internships, remote work, part-time roles, and freelance projects',
  resumeUrl: '/Vansh_Shah_Resume.pdf',
  social: {
    github: 'https://github.com/QuantumCoder1011',
    linkedin: 'https://www.linkedin.com/in/vansh-shah-b44567242',
    leetcode: 'https://leetcode.com/u/v_shah1011/',
  },
}

export const skills = [
  { category: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { category: 'Backend', items: ['Flask', 'REST APIs', 'PHP', 'Python'] },
  { category: 'Tools & Platforms', items: ['Git', 'GitHub'] },
  { category: 'CS Fundamentals', items: ['DSA', 'OOP', 'DBMS'] },
]

export const proficiencies = [
  { label: 'Frontend Development', level: 65 },
  { label: 'Backend / APIs', level: 80 },
  { label: 'Data Structures & Algorithms', level: 78 },
  { label: 'UI/UX Design', level: 55 },
  { label: 'Database Design', level: 75 },
]

export const dsaStats = {
  platform: 'LeetCode',
  url: 'https://leetcode.com/u/v_shah1011/',
  username: 'v_shah1011',
  totalSolved: 228,
  easy: 135,
  medium: 89,
  hard: 4,
  streak: 120,
  ranking: 'Top 33.79%',
  focusAreas: ['Arrays', 'String', 'Sorting', 'Two Pointers', 'Hash Table'],
  recentMilestone: 'Earned the 100 Days Badge 2026 and currently maintaining a 120-day streak.',
  contests: 26,
  contestRating: 1541,
}

export const projects = [
  {
    id: 1,
    slug: 'url-based-intrusion-detection-system',
    title: 'URL-Based Intrusion Detection System',
    description: 'A full-stack security analysis platform that detects malicious URL patterns from CSV logs and PCAP network captures.',
    longDescription: `This project is a full-stack intrusion detection system built to analyze web traffic and identify malicious URL activity from uploaded CSV logs and PCAP network capture files. It provides an interactive dashboard for viewing detections, filtering threats, and exporting results for further analysis.

The original version used regex and priority-based pattern matching to identify attacks such as SQL Injection, XSS, Command Injection, and Directory Traversal. I later improved it with an ML-based prediction layer that estimates likely attack types with a confidence score when a threat is not confidently matched by regex rules.`,
    problem: 'Security logs and captured traffic are difficult to inspect manually, especially when trying to detect suspicious URL-based attack patterns quickly and consistently.',
    solution: 'I built a Flask backend to process CSV and PCAP files, extract URL activity, run attack detection logic, store results in a database, and expose APIs to the frontend. On top of the regex rules, I added an ML-based prediction step with confidence scoring to improve detection coverage when fixed patterns were not enough.',
    image: null,
    gradient: 'from-blue-600/20 to-violet-600/20',
    accent: '#4f8ef7',
    tags: ['Python', 'Flask', 'React', 'SQLite', 'PostgreSQL', 'Pandas', 'Scapy', 'Chart.js', 'Machine Learning'],
    github: 'https://github.com/QuantumCoder1011/url-intrusion-detection-system',
    live: 'https://url-intrusion-detection-system.vercel.app/',
    featured: true,
    learnings: 'Learned how to combine backend data processing, threat detection logic, file parsing, API design, frontend dashboards, and practical security analysis into one complete system.',
  },
  {
    id: 2,
    slug: 'startup-success-predictor',
    title: 'Startup Success Predictor',
    description: 'A machine learning project that predicts startup success and funding potential using business and market input features.',
    longDescription: `This project was built to explore how machine learning can be applied to real-world business decision-making. The idea was to analyze startup-related factors such as industry, location, and funding history, then use them to estimate the likelihood of startup success.

The system focused on preparing structured input data, training a predictive model, and evaluating how different business attributes influence outcomes. It helped turn raw startup data into a more interpretable prediction workflow while giving practical exposure to applied machine learning.`,
    problem: 'Investors and founders often have to make decisions using incomplete signals. This project aimed to model startup success patterns from available data to support more data-driven prediction.',
    solution: 'I used Python and XGBoost to build the prediction pipeline, performed preprocessing on startup-related features, and trained a model to estimate success and funding outcomes from structured business data.',
    image: null,
    gradient: 'from-cyan-600/20 to-blue-600/20',
    accent: '#00d4ff',
    tags: ['Python', 'XGBoost', 'Machine Learning', 'Data Preprocessing'],
    github: '',
    live: '',
    featured: false,
    learnings: 'Learned practical machine learning workflow including feature preprocessing, model building, working with structured datasets, and improving prediction quality through better input preparation.',
  },
  {
    id: 3,
    slug: 'aptitude-test-web-application',
    title: 'Aptitude Test Web Application',
    description: 'A web-based aptitude testing platform with authentication, timed tests, leaderboard support, and performance analytics.',
    longDescription: `This project was built as a structured online testing platform where users could log in, take aptitude tests, and receive performance-based results. The goal was to create a system that could manage question flow, user sessions, and timed assessments in a simple web interface.

The application supported category-based and difficulty-based question generation, helping create more dynamic and reusable tests. It also included leaderboard and analytics features to make the platform more useful for both evaluation and progress tracking.`,
    problem: 'Manual or static aptitude tests are hard to scale and do not provide strong tracking or adaptive organization. This project solved that by creating a centralized system for conducting and evaluating tests online.',
    solution: 'I built the application using PHP, MySQL, HTML, CSS, and JavaScript, with session-based authentication, dynamic question generation, timed assessments, score handling, and leaderboard and performance tracking features.',
    image: null,
    gradient: 'from-violet-600/20 to-pink-600/20',
    accent: '#8b5cf6',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    github: '',
    live: '',
    featured: false,
    learnings: 'Learned how to build a complete web application with authentication, database-backed question management, timed test logic, and user performance analysis.',
  },
  {
    id: 4,
    slug: 'contract-risk-analyzer',
    title: 'Contract Risk Analyzer',
    description: 'An AI-powered local contract analysis tool that detects risky clauses, classifies legal sections, and suggests safer rewrites.',
    longDescription: `Contract Risk Analyzer is a locally running AI tool built to help users review dense legal contracts without sending sensitive data to the cloud. It accepts contracts in multiple formats including PDF, DOCX, TXT, and images, extracts and structures clauses, classifies them into legal categories, and assigns risk ratings based on the user's role such as contractor, client, or vendor.

The system combines rule-based legal risk detection with LLM-based reasoning using LLaMA 3 through Ollama, then computes an overall risk score with category-level breakdowns. It also uses a local RAG-style cache to speed up repeated analysis of similar clauses, and can generate safer clause rewrites through both a Flask web UI and a Tkinter desktop interface.`,
    problem: 'Legal contracts are difficult to review manually and often contain one-sided or risky clauses that can expose users to legal or financial harm. This project helps surface those risks faster and in a more structured way while keeping contract data fully local.',
    solution: 'I built a multi-agent pipeline for ingestion, clause structuring, classification, risk analysis, scoring, caching, and suggestion generation. I combined regex-based rule detection with local LLM analysis for better accuracy, used Ollama to run LLaMA 3 locally, and designed both web and desktop interfaces for the analysis workflow.',
    image: null,
    gradient: 'from-orange-600/20 to-red-600/20',
    accent: '#ff6b35',
    tags: ['Python', 'Flask', 'Tkinter', 'Ollama', 'LLaMA 3', 'PyMuPDF', 'python-docx', 'pytesseract', 'RAG'],
    github: 'https://github.com/QuantumCoder1011/contract-risk-analyzer',
    live: '',
    featured: true,
    learnings: 'Learned how to design an AI-assisted document analysis pipeline, combine rule-based systems with local LLM workflows, structure long-form legal text, and build local-first tools that balance usability, privacy, and automation.',
  },
  {
    id: 5,
    slug: 'voice-based-ai-admission-agent',
    title: 'Voice-Based AI Admission Agent',
    description: 'An AI-powered voice calling agent for college admissions that conducts dynamic conversations through the browser and real phone calls.',
    longDescription: `This project is a voice-based AI admission assistant designed to help prospective students interact with an automated counselor in a natural, human-like way. It evaluates a student's MCA CET score and adapts its conversation strategy accordingly, such as emphasizing prestige for higher scores or support systems for lower scores.

The system supports both browser-based voice conversations and real phone calls through Twilio. It uses speech-to-text, LLM reasoning, and text-to-speech to manage live interactions, while also generating transcripts and summaries for each conversation.`,
    problem: 'Admission teams often need to handle repetitive outreach and answer similar student questions at scale. This project helps automate those conversations while still making them more personalized and context-aware.',
    solution: 'I built a FastAPI backend with WebSocket-based browser communication and Twilio telephony support, used Faster-Whisper for speech-to-text, Gemini and Ollama for reasoning, and Edge-TTS with fallback support for voice responses. The app also stores student records and saves transcript summaries after calls.',
    image: null,
    gradient: 'from-green-600/20 to-emerald-600/20',
    accent: '#10b981',
    tags: ['FastAPI', 'Uvicorn', 'WebSockets', 'Tailwind CSS', 'JavaScript', 'Gemini', 'Ollama', 'Faster-Whisper', 'Edge-TTS', 'Twilio'],
    github: 'https://github.com/QuantumCoder1011/ai-admission-calling-agent',
    live: '',
    featured: false,
    learnings: 'Learned how to build real-time voice AI workflows, connect speech systems with LLM reasoning, handle browser and telephony integrations, and design low-latency conversational pipelines.',
  },
]

export const education = {
  degree: 'Master of Computer Applications (MCA)',
  school: 'MET Institute of Computer Science',
  affiliation: 'University of Mumbai',
  period: 'Currently pursuing',
}

export const experience = [
  {
    company: 'Care N Cure Hospital',
    role: 'Junior Accountant Data Analyst',
    period: 'Jan 2024 - Mar 2025',
    type: 'Part-time',
    description: 'Managed digital operations, reporting, and data handling for the hospital on a part-time basis. Worked on tracking expenses, monitoring stock, preparing monthly reports, analyzing patient and doctor-wise revenue trends, supporting financial record organization for CA-related needs, and helping resolve website-related issues when required.',
    highlights: [
      'Tracked hospital expenses and maintained financial records using Excel and Tally',
      'Prepared monthly reports covering revenue, pending payments, and operational insights',
      'Generated doctor-wise and service-wise analysis for X-ray, sonography, lab, and other patient categories',
      'Organized data and reports for accounting and CA-related requirements while also supporting website issue handling',
    ],
    logo: 'C',
    color: '#4f8ef7',
  },
]
