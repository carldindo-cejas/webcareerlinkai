import type { Course, Career } from '@/types';

export const courses: Course[] = [
  // STEM Courses
  {
    id: 'bs-computer-science',
    name: 'BS Computer Science',
    description: 'Study of computation, algorithms, programming, and software development. Prepares students for careers in technology and innovation.',
    riasecMatch: ['I', 'R', 'C'],
    strandAlignment: ['STEM', 'ICT'],
    careers: ['software-engineer', 'data-scientist', 'systems-analyst', 'ai-engineer'],
    duration: '4 years',
    difficulty: 'High'
  },
  {
    id: 'bs-engineering',
    name: 'BS Engineering (Various)',
    description: 'Application of scientific and mathematical principles to design and build structures, machines, and systems.',
    riasecMatch: ['R', 'I', 'C'],
    strandAlignment: ['STEM'],
    careers: ['civil-engineer', 'mechanical-engineer', 'electrical-engineer'],
    duration: '4-5 years',
    difficulty: 'High'
  },
  {
    id: 'bs-nursing',
    name: 'BS Nursing',
    description: 'Healthcare profession focused on patient care, health promotion, and disease prevention.',
    riasecMatch: ['S', 'I', 'R'],
    strandAlignment: ['STEM', 'GAS'],
    careers: ['registered-nurse', 'nurse-practitioner', 'healthcare-administrator'],
    duration: '4 years',
    difficulty: 'High'
  },
  {
    id: 'bs-psychology',
    name: 'BS Psychology',
    description: 'Scientific study of behavior and mental processes, preparing students for careers in mental health and human services.',
    riasecMatch: ['I', 'S', 'A'],
    strandAlignment: ['STEM', 'HUMSS', 'GAS'],
    careers: ['psychologist', 'hr-specialist', 'counselor', 'researcher'],
    duration: '4 years',
    difficulty: 'Medium'
  },
  {
    id: 'bs-biology',
    name: 'BS Biology',
    description: 'Study of living organisms and life processes, foundation for medical and research careers.',
    riasecMatch: ['I', 'R', 'S'],
    strandAlignment: ['STEM'],
    careers: ['biologist', 'medical-researcher', 'environmental-scientist', 'doctor'],
    duration: '4 years',
    difficulty: 'High'
  },
  {
    id: 'bs-chemistry',
    name: 'BS Chemistry',
    description: 'Study of matter, its properties, and transformations. Essential for pharmaceuticals, materials, and research.',
    riasecMatch: ['I', 'R', 'C'],
    strandAlignment: ['STEM'],
    careers: ['chemist', 'pharmacist', 'quality-control-analyst', 'researcher'],
    duration: '4 years',
    difficulty: 'High'
  },
  {
    id: 'bs-mathematics',
    name: 'BS Mathematics',
    description: 'Study of numbers, patterns, and abstract structures. Foundation for analytics, finance, and research.',
    riasecMatch: ['I', 'C', 'R'],
    strandAlignment: ['STEM'],
    careers: ['data-analyst', 'actuary', 'financial-analyst', 'researcher'],
    duration: '4 years',
    difficulty: 'High'
  },
  {
    id: 'bs-architecture',
    name: 'BS Architecture',
    description: 'Art and science of designing buildings and structures, combining creativity with technical knowledge.',
    riasecMatch: ['A', 'I', 'R'],
    strandAlignment: ['STEM', 'Arts and Design'],
    careers: ['architect', 'interior-designer', 'urban-planner'],
    duration: '5 years',
    difficulty: 'High'
  },

  // Business Courses
  {
    id: 'bs-accountancy',
    name: 'BS Accountancy',
    description: 'Study of financial reporting, auditing, and taxation. Gateway to becoming a Certified Public Accountant.',
    riasecMatch: ['C', 'I', 'E'],
    strandAlignment: ['ABM', 'STEM', 'GAS'],
    careers: ['accountant', 'auditor', 'financial-controller', 'tax-specialist'],
    duration: '4 years',
    difficulty: 'High'
  },
  {
    id: 'bs-business-admin',
    name: 'BS Business Administration',
    description: 'Comprehensive study of business operations, management, and entrepreneurship.',
    riasecMatch: ['E', 'C', 'S'],
    strandAlignment: ['ABM', 'GAS'],
    careers: ['business-manager', 'entrepreneur', 'operations-manager', 'consultant'],
    duration: '4 years',
    difficulty: 'Medium'
  },
  {
    id: 'bs-marketing',
    name: 'BS Marketing Management',
    description: 'Study of consumer behavior, brand management, and strategic marketing communications.',
    riasecMatch: ['E', 'A', 'S'],
    strandAlignment: ['ABM', 'HUMSS', 'GAS'],
    careers: ['marketing-manager', 'brand-manager', 'digital-marketer', 'market-researcher'],
    duration: '4 years',
    difficulty: 'Medium'
  },
  {
    id: 'bs-hrm',
    name: 'BS Hotel and Restaurant Management',
    description: 'Study of hospitality operations, food service, and tourism management.',
    riasecMatch: ['S', 'E', 'R'],
    strandAlignment: ['HE', 'ABM', 'GAS'],
    careers: ['hotel-manager', 'restaurant-manager', 'event-coordinator', 'chef'],
    duration: '4 years',
    difficulty: 'Medium'
  },
  {
    id: 'bs-tourism',
    name: 'BS Tourism Management',
    description: 'Study of travel industry, destination management, and tourism services.',
    riasecMatch: ['S', 'E', 'A'],
    strandAlignment: ['HE', 'ABM', 'HUMSS', 'GAS'],
    careers: ['tourism-officer', 'travel-consultant', 'event-planner', 'tour-guide'],
    duration: '4 years',
    difficulty: 'Medium'
  },
  {
    id: 'bs-entrepreneurship',
    name: 'BS Entrepreneurship',
    description: 'Study of venture creation, business innovation, and startup management.',
    riasecMatch: ['E', 'C', 'S'],
    strandAlignment: ['ABM', 'GAS'],
    careers: ['entrepreneur', 'startup-founder', 'business-consultant', 'incubator-manager'],
    duration: '4 years',
    difficulty: 'Medium'
  },

  // HUMSS Courses
  {
    id: 'ba-communication',
    name: 'BA Communication',
    description: 'Study of media, journalism, public relations, and strategic communication.',
    riasecMatch: ['A', 'E', 'S'],
    strandAlignment: ['HUMSS', 'GAS'],
    careers: ['journalist', 'pr-specialist', 'content-creator', 'media-planner'],
    duration: '4 years',
    difficulty: 'Medium'
  },
  {
    id: 'ba-political-science',
    name: 'BA Political Science',
    description: 'Study of government, politics, public policy, and international relations.',
    riasecMatch: ['I', 'E', 'S'],
    strandAlignment: ['HUMSS', 'GAS'],
    careers: ['politician', 'policy-analyst', 'diplomat', 'lawyer'],
    duration: '4 years',
    difficulty: 'Medium'
  },
  {
    id: 'ba-psychology-humss',
    name: 'BA Psychology',
    description: 'Study of human behavior and mental processes with focus on clinical and counseling applications.',
    riasecMatch: ['S', 'I', 'A'],
    strandAlignment: ['HUMSS', 'STEM', 'GAS'],
    careers: ['counselor', 'hr-specialist', 'social-worker', 'therapist'],
    duration: '4 years',
    difficulty: 'Medium'
  },
  {
    id: 'bs-social-work',
    name: 'BS Social Work',
    description: 'Study of helping individuals, families, and communities overcome challenges.',
    riasecMatch: ['S', 'E', 'A'],
    strandAlignment: ['HUMSS', 'GAS'],
    careers: ['social-worker', 'community-organizer', 'case-manager', 'advocate'],
    duration: '4 years',
    difficulty: 'Medium'
  },
  {
    id: 'ba-english',
    name: 'BA English Language Studies',
    description: 'Study of language, literature, and communication skills for various professional applications.',
    riasecMatch: ['A', 'I', 'S'],
    strandAlignment: ['HUMSS', 'GAS'],
    careers: ['writer', 'editor', 'teacher', 'content-strategist'],
    duration: '4 years',
    difficulty: 'Medium'
  },
  {
    id: 'ba-education',
    name: 'BEEd/BSEd Education',
    description: 'Preparation for teaching careers in elementary and secondary education.',
    riasecMatch: ['S', 'A', 'E'],
    strandAlignment: ['HUMSS', 'GAS'],
    careers: ['teacher', 'curriculum-developer', 'educational-administrator', 'tutor'],
    duration: '4 years',
    difficulty: 'Medium'
  },

  // Arts and Design
  {
    id: 'bs-fine-arts',
    name: 'BS Fine Arts',
    description: 'Study of visual arts, including painting, sculpture, and mixed media.',
    riasecMatch: ['A', 'R', 'I'],
    strandAlignment: ['Arts and Design', 'HUMSS'],
    careers: ['artist', 'gallery-curator', 'art-director', 'illustrator'],
    duration: '4 years',
    difficulty: 'Medium'
  },
  {
    id: 'bs-interior-design',
    name: 'BS Interior Design',
    description: 'Study of creating functional and aesthetic interior spaces.',
    riasecMatch: ['A', 'R', 'E'],
    strandAlignment: ['Arts and Design', 'HE'],
    careers: ['interior-designer', 'set-designer', 'visual-merchandiser'],
    duration: '4 years',
    difficulty: 'Medium'
  },
  {
    id: 'bs-multimedia-arts',
    name: 'BS Multimedia Arts',
    description: 'Study of digital media, animation, game design, and interactive content.',
    riasecMatch: ['A', 'I', 'R'],
    strandAlignment: ['Arts and Design', 'ICT', 'STEM'],
    careers: ['graphic-designer', 'animator', 'game-designer', 'ui-ux-designer'],
    duration: '4 years',
    difficulty: 'Medium'
  },
  {
    id: 'bs-film',
    name: 'BA Film and Media Studies',
    description: 'Study of filmmaking, media production, and visual storytelling.',
    riasecMatch: ['A', 'E', 'R'],
    strandAlignment: ['Arts and Design', 'HUMSS'],
    careers: ['filmmaker', 'videographer', 'video-editor', 'producer'],
    duration: '4 years',
    difficulty: 'Medium'
  },

  // ICT Courses
  {
    id: 'bs-information-technology',
    name: 'BS Information Technology',
    description: 'Study of computer systems, networks, databases, and enterprise applications.',
    riasecMatch: ['I', 'R', 'C'],
    strandAlignment: ['ICT', 'STEM'],
    careers: ['it-specialist', 'network-administrator', 'database-administrator', 'systems-analyst'],
    duration: '4 years',
    difficulty: 'Medium'
  },
  {
    id: 'bs-information-systems',
    name: 'BS Information Systems',
    description: 'Study of business applications of technology and systems analysis.',
    riasecMatch: ['I', 'C', 'E'],
    strandAlignment: ['ICT', 'ABM', 'STEM'],
    careers: ['systems-analyst', 'business-analyst', 'it-consultant', 'project-manager'],
    duration: '4 years',
    difficulty: 'Medium'
  },
  {
    id: 'bs-software-engineering',
    name: 'BS Software Engineering',
    description: 'Study of systematic approach to software design, development, and maintenance.',
    riasecMatch: ['I', 'R', 'C'],
    strandAlignment: ['ICT', 'STEM'],
    careers: ['software-engineer', 'devops-engineer', 'quality-assurance', 'technical-lead'],
    duration: '4 years',
    difficulty: 'High'
  },

  // Agriculture
  {
    id: 'bs-agriculture',
    name: 'BS Agriculture',
    description: 'Study of crop production, animal husbandry, and agricultural management.',
    riasecMatch: ['R', 'I', 'C'],
    strandAlignment: ['AFA', 'STEM'],
    careers: ['agriculturist', 'farm-manager', 'agribusiness-owner', 'extension-worker'],
    duration: '4 years',
    difficulty: 'Medium'
  },
  {
    id: 'bs-agribusiness',
    name: 'BS Agribusiness Management',
    description: 'Study of business principles applied to agricultural enterprises.',
    riasecMatch: ['E', 'C', 'R'],
    strandAlignment: ['AFA', 'ABM'],
    careers: ['agribusiness-manager', 'supply-chain-analyst', 'agricultural-marketer'],
    duration: '4 years',
    difficulty: 'Medium'
  },

  // Sports
  {
    id: 'bs-pe',
    name: 'BS Physical Education',
    description: 'Study of physical fitness, sports science, and health education.',
    riasecMatch: ['S', 'R', 'E'],
    strandAlignment: ['Sports Track', 'STEM', 'GAS'],
    careers: ['pe-teacher', 'sports-coach', 'fitness-trainer', 'sports-administrator'],
    duration: '4 years',
    difficulty: 'Medium'
  },
  {
    id: 'bs-sports-science',
    name: 'BS Sports Science',
    description: 'Scientific study of human performance in sports and exercise.',
    riasecMatch: ['I', 'R', 'S'],
    strandAlignment: ['Sports Track', 'STEM'],
    careers: ['sports-scientist', 'athletic-trainer', 'sports-therapist', 'performance-analyst'],
    duration: '4 years',
    difficulty: 'Medium'
  },
];

export const careers: Career[] = [
  {
    id: 'software-engineer',
    name: 'Software Engineer',
    description: 'Designs, develops, and maintains software applications and systems.',
    riasecMatch: ['I', 'R', 'C'],
    requiredCourses: ['bs-computer-science', 'bs-software-engineering', 'bs-information-technology'],
    outlook: 'Growing',
    salaryRange: '₱30,000 - ₱150,000+'
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    description: 'Analyzes complex data to help organizations make better decisions.',
    riasecMatch: ['I', 'C', 'R'],
    requiredCourses: ['bs-computer-science', 'bs-mathematics', 'bs-statistics'],
    outlook: 'Growing',
    salaryRange: '₱40,000 - ₱180,000+'
  },
  {
    id: 'registered-nurse',
    name: 'Registered Nurse',
    description: 'Provides patient care and health education in various healthcare settings.',
    riasecMatch: ['S', 'I', 'R'],
    requiredCourses: ['bs-nursing'],
    outlook: 'Growing',
    salaryRange: '₱25,000 - ₱80,000+'
  },
  {
    id: 'psychologist',
    name: 'Psychologist',
    description: 'Studies mental processes and human behavior to help people improve their lives.',
    riasecMatch: ['I', 'S', 'A'],
    requiredCourses: ['bs-psychology', 'ba-psychology-humss'],
    outlook: 'Stable',
    salaryRange: '₱25,000 - ₱100,000+'
  },
  {
    id: 'accountant',
    name: 'Accountant',
    description: 'Prepares and examines financial records to ensure accuracy and compliance.',
    riasecMatch: ['C', 'I', 'E'],
    requiredCourses: ['bs-accountancy', 'bs-accounting-technology'],
    outlook: 'Stable',
    salaryRange: '₱20,000 - ₱100,000+'
  },
  {
    id: 'teacher',
    name: 'Teacher',
    description: 'Educates students in various subjects and grade levels.',
    riasecMatch: ['S', 'A', 'E'],
    requiredCourses: ['ba-education', 'beed', 'bsed'],
    outlook: 'Stable',
    salaryRange: '₱22,000 - ₱60,000+'
  },
  {
    id: 'architect',
    name: 'Architect',
    description: 'Designs buildings and structures that are functional, safe, and aesthetically pleasing.',
    riasecMatch: ['A', 'I', 'R'],
    requiredCourses: ['bs-architecture'],
    outlook: 'Stable',
    salaryRange: '₱25,000 - ₱120,000+'
  },
  {
    id: 'graphic-designer',
    name: 'Graphic Designer',
    description: 'Creates visual concepts to communicate ideas and inspire audiences.',
    riasecMatch: ['A', 'R', 'I'],
    requiredCourses: ['bs-multimedia-arts', 'bs-fine-arts', 'bs-visual-communication'],
    outlook: 'Growing',
    salaryRange: '₱20,000 - ₱80,000+'
  },
  {
    id: 'entrepreneur',
    name: 'Entrepreneur',
    description: 'Starts and manages businesses, taking risks to create value.',
    riasecMatch: ['E', 'C', 'S'],
    requiredCourses: ['bs-entrepreneurship', 'bs-business-admin'],
    outlook: 'Growing',
    salaryRange: 'Variable'
  },
  {
    id: 'marketing-manager',
    name: 'Marketing Manager',
    description: 'Plans and executes marketing strategies to promote products and services.',
    riasecMatch: ['E', 'A', 'S'],
    requiredCourses: ['bs-marketing', 'bs-business-admin'],
    outlook: 'Growing',
    salaryRange: '₱30,000 - ₱150,000+'
  },
  {
    id: 'hr-specialist',
    name: 'HR Specialist',
    description: 'Manages recruitment, employee relations, and organizational development.',
    riasecMatch: ['S', 'E', 'C'],
    requiredCourses: ['bs-psychology', 'ba-psychology-humss', 'bs-hrm'],
    outlook: 'Stable',
    salaryRange: '₱22,000 - ₱80,000+'
  },
  {
    id: 'civil-engineer',
    name: 'Civil Engineer',
    description: 'Designs and oversees construction of infrastructure projects.',
    riasecMatch: ['R', 'I', 'C'],
    requiredCourses: ['bs-engineering'],
    outlook: 'Stable',
    salaryRange: '₱25,000 - ₱120,000+'
  },
  {
    id: 'doctor',
    name: 'Doctor (Physician)',
    description: 'Diagnoses and treats illnesses and injuries to improve patient health.',
    riasecMatch: ['I', 'S', 'R'],
    requiredCourses: ['bs-biology', 'bs-medical-technology', 'bs-nursing'],
    outlook: 'Stable',
    salaryRange: '₱50,000 - ₱300,000+'
  },
  {
    id: 'lawyer',
    name: 'Lawyer',
    description: 'Provides legal advice and representation to clients.',
    riasecMatch: ['I', 'E', 'S'],
    requiredCourses: ['ba-political-science', 'ba-philosophy', 'bs-criminology'],
    outlook: 'Stable',
    salaryRange: '₱30,000 - ₱200,000+'
  },
  {
    id: 'journalist',
    name: 'Journalist',
    description: 'Researches, writes, and reports news stories for various media.',
    riasecMatch: ['A', 'E', 'I'],
    requiredCourses: ['ba-communication', 'ba-journalism', 'ba-english'],
    outlook: 'Stable',
    salaryRange: '₱20,000 - ₱70,000+'
  },
  {
    id: 'ui-ux-designer',
    name: 'UI/UX Designer',
    description: 'Designs user interfaces and experiences for digital products.',
    riasecMatch: ['A', 'I', 'S'],
    requiredCourses: ['bs-multimedia-arts', 'bs-computer-science', 'bs-information-technology'],
    outlook: 'Growing',
    salaryRange: '₱25,000 - ₱120,000+'
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    description: 'Interprets data to help organizations make informed decisions.',
    riasecMatch: ['I', 'C', 'R'],
    requiredCourses: ['bs-mathematics', 'bs-statistics', 'bs-computer-science'],
    outlook: 'Growing',
    salaryRange: '₱25,000 - ₱100,000+'
  },
  {
    id: 'social-worker',
    name: 'Social Worker',
    description: 'Helps individuals and communities overcome social challenges.',
    riasecMatch: ['S', 'E', 'A'],
    requiredCourses: ['bs-social-work', 'ba-psychology-humss'],
    outlook: 'Stable',
    salaryRange: '₱18,000 - ₱50,000+'
  },
  {
    id: 'hotel-manager',
    name: 'Hotel Manager',
    description: 'Oversees hotel operations and ensures guest satisfaction.',
    riasecMatch: ['E', 'S', 'C'],
    requiredCourses: ['bs-hrm', 'bs-tourism'],
    outlook: 'Growing',
    salaryRange: '₱25,000 - ₱100,000+'
  },
  {
    id: 'filmmaker',
    name: 'Filmmaker',
    description: 'Creates films and video content from concept to completion.',
    riasecMatch: ['A', 'E', 'R'],
    requiredCourses: ['ba-film', 'bs-multimedia-arts'],
    outlook: 'Growing',
    salaryRange: 'Variable'
  },
];
