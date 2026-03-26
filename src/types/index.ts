// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  isGuest: boolean;
  createdAt: Date;
}

export interface UserProfile {
  userId: string;
  grades: Grades;
  strand: SHSStrand;
  riasecScores: RIASECScores;
  scctAnswers: SCCTAnswer[];
  completedAssessments: boolean[];
}

export interface Grades {
  math: { [gradeLevel: number]: number };
  english: { [gradeLevel: number]: number };
  science: { [gradeLevel: number]: number };
}

// SHS Strand Types
export type SHSStrand = 
  | 'STEM' 
  | 'ABM' 
  | 'HUMSS' 
  | 'ICT' 
  | 'HE' 
  | 'GAS' 
  | 'AFA' 
  | 'Arts and Design' 
  | 'Sports Track';

export const STRANDS: { value: SHSStrand; label: string; description: string }[] = [
  { value: 'STEM', label: 'STEM', description: 'Science, Technology, Engineering, and Mathematics' },
  { value: 'ABM', label: 'ABM', description: 'Accountancy, Business, and Management' },
  { value: 'HUMSS', label: 'HUMSS', description: 'Humanities and Social Sciences' },
  { value: 'ICT', label: 'ICT', description: 'Information and Communications Technology' },
  { value: 'HE', label: 'HE', description: 'Home Economics' },
  { value: 'GAS', label: 'GAS', description: 'General Academic Strand' },
  { value: 'AFA', label: 'AFA', description: 'Agri-Fishery Arts' },
  { value: 'Arts and Design', label: 'Arts and Design', description: 'Creative and Performing Arts' },
  { value: 'Sports Track', label: 'Sports Track', description: 'Sports and Physical Education' },
];

// RIASEC Types
export type RIASECType = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export interface RIASECScores {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

export interface RIASECQuestion {
  id: number;
  text: string;
  type: RIASECType;
}

export interface RIASECResult {
  scores: RIASECScores;
  topCodes: [RIASECType, RIASECType, RIASECType];
  dominantType: RIASECType;
}

// SCCT Types
export interface SCCTQuestion {
  id: number;
  text: string;
  category: 'confidence' | 'barriers' | 'goals';
}

export interface SCCTAnswer {
  questionId: number;
  answer: string;
  category: 'confidence' | 'barriers' | 'goals';
}

// Course and Career Types
export interface Course {
  id: string;
  name: string;
  description: string;
  riasecMatch: RIASECType[];
  strandAlignment: SHSStrand[];
  careers: string[];
  duration: string;
  difficulty: 'Low' | 'Medium' | 'High';
}

export interface Career {
  id: string;
  name: string;
  description: string;
  riasecMatch: RIASECType[];
  requiredCourses: string[];
  outlook: 'Growing' | 'Stable' | 'Declining';
  salaryRange: string;
}

export interface Recommendation {
  course: Course;
  score: number;
  reasons: string[];
  rank: number;
}

// Chat Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatThread {
  id: string;
  userId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// Assessment State
export interface AssessmentState {
  currentPhase: 'idle' | 'riasec' | 'scct' | 'complete';
  riasecAnswers: { [questionId: number]: number };
  scctAnswers: SCCTAnswer[];
  currentQuestionIndex: number;
}

// Report Types
export interface AssessmentReport {
  user: User;
  profile: UserProfile;
  riasecResult: RIASECResult;
  recommendations: Recommendation[];
  generatedAt: Date;
}

// Navigation
export type PageRoute = 
  | 'landing' 
  | 'login' 
  | 'signup' 
  | 'profile' 
  | 'assessment' 
  | 'results' 
  | 'chat' 
  | 'admin';
