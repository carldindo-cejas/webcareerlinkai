import type { SCCTQuestion } from '@/types';

export const scctQuestions: SCCTQuestion[] = [
  // Confidence (Self-Efficacy) - 4 questions
  {
    id: 1,
    text: "How confident are you in your ability to succeed in challenging academic subjects?",
    category: 'confidence'
  },
  {
    id: 2,
    text: "When facing a difficult problem, how likely are you to persist until you find a solution?",
    category: 'confidence'
  },
  {
    id: 3,
    text: "How confident are you in your ability to learn new skills quickly?",
    category: 'confidence'
  },
  {
    id: 4,
    text: "Do you believe you can achieve your career goals with effort and dedication?",
    category: 'confidence'
  },

  // Career Barriers - 4 questions
  {
    id: 5,
    text: "What financial challenges do you anticipate in pursuing your desired education?",
    category: 'barriers'
  },
  {
    id: 6,
    text: "Are there any family expectations or obligations that might affect your career choices?",
    category: 'barriers'
  },
  {
    id: 7,
    text: "What concerns do you have about job availability in your field of interest?",
    category: 'barriers'
  },
  {
    id: 8,
    text: "Do you feel you have access to enough information about your desired career path?",
    category: 'barriers'
  },

  // Goals and Expectations - 4 questions
  {
    id: 9,
    text: "What are your top three career goals for the next 5-10 years?",
    category: 'goals'
  },
  {
    id: 10,
    text: "How important is work-life balance in your future career?",
    category: 'goals'
  },
  {
    id: 11,
    text: "What kind of work environment do you see yourself thriving in?",
    category: 'goals'
  },
  {
    id: 12,
    text: "How do you define success in your future career?",
    category: 'goals'
  },
];

export const scctCategoryDescriptions = {
  confidence: {
    title: "Self-Efficacy",
    description: "Your belief in your ability to succeed in specific situations or accomplish tasks.",
    icon: "Target"
  },
  barriers: {
    title: "Career Barriers",
    description: "Challenges and obstacles that may affect your career development.",
    icon: "Shield"
  },
  goals: {
    title: "Goals & Expectations",
    description: "Your aspirations and what you hope to achieve in your career.",
    icon: "Flag"
  }
};
