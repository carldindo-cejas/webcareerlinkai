import type { RIASECQuestion } from '@/types';

export const riasecQuestions: RIASECQuestion[] = [
  // Realistic (R) - 8 questions
  { id: 1, text: "I enjoy working with tools, machines, and equipment", type: 'R' },
  { id: 2, text: "I like to build and repair things with my hands", type: 'R' },
  { id: 3, text: "I prefer practical, hands-on activities over theoretical discussions", type: 'R' },
  { id: 4, text: "I enjoy outdoor activities and working in nature", type: 'R' },
  { id: 5, text: "I am good at understanding how mechanical things work", type: 'R' },
  { id: 6, text: "I prefer tasks with clear, concrete results", type: 'R' },
  { id: 7, text: "I enjoy physical activities and sports", type: 'R' },
  { id: 8, text: "I like working with wood, metal, or other materials", type: 'R' },

  // Investigative (I) - 8 questions
  { id: 9, text: "I enjoy solving complex problems and puzzles", type: 'I' },
  { id: 10, text: "I am curious about how things work in the natural world", type: 'I' },
  { id: 11, text: "I like to analyze data and find patterns", type: 'I' },
  { id: 12, text: "I enjoy conducting research and experiments", type: 'I' },
  { id: 13, text: "I prefer learning through observation and investigation", type: 'I' },
  { id: 14, text: "I am interested in scientific and mathematical concepts", type: 'I' },
  { id: 15, text: "I enjoy reading about new discoveries and innovations", type: 'I' },
  { id: 16, text: "I like to understand the theory behind practical applications", type: 'I' },

  // Artistic (A) - 8 questions
  { id: 17, text: "I enjoy expressing myself through creative activities", type: 'A' },
  { id: 18, text: "I have a strong appreciation for art, music, and beauty", type: 'A' },
  { id: 19, text: "I like to design and create original works", type: 'A' },
  { id: 20, text: "I enjoy performing in front of others", type: 'A' },
  { id: 21, text: "I prefer unstructured, imaginative tasks over routine work", type: 'A' },
  { id: 22, text: "I am good at thinking outside the box", type: 'A' },
  { id: 23, text: "I enjoy writing stories, poems, or songs", type: 'A' },
  { id: 24, text: "I appreciate unconventional ideas and approaches", type: 'A' },

  // Social (S) - 8 questions
  { id: 25, text: "I enjoy helping others solve their problems", type: 'S' },
  { id: 26, text: "I am good at teaching and explaining things to people", type: 'S' },
  { id: 27, text: "I prefer working in teams rather than alone", type: 'S' },
  { id: 28, text: "I am interested in understanding human behavior", type: 'S' },
  { id: 29, text: "I enjoy caring for and supporting others", type: 'S' },
  { id: 30, text: "I am good at mediating conflicts and building relationships", type: 'S' },
  { id: 31, text: "I find fulfillment in making a positive impact on people's lives", type: 'S' },
  { id: 32, text: "I enjoy community service and volunteer work", type: 'S' },

  // Enterprising (E) - 8 questions
  { id: 33, text: "I enjoy leading and directing others", type: 'E' },
  { id: 34, text: "I am good at persuading and influencing people", type: 'E' },
  { id: 35, text: "I have strong ambitions and career goals", type: 'E' },
  { id: 36, text: "I enjoy taking risks and starting new ventures", type: 'E' },
  { id: 37, text: "I am interested in business and financial matters", type: 'E' },
  { id: 38, text: "I like to compete and win", type: 'E' },
  { id: 39, text: "I am comfortable making decisions under pressure", type: 'E' },
  { id: 40, text: "I enjoy networking and meeting new people", type: 'E' },

  // Conventional (C) - 8 questions
  { id: 41, text: "I enjoy organizing and categorizing information", type: 'C' },
  { id: 42, text: "I am good at paying attention to details", type: 'C' },
  { id: 43, text: "I prefer structured, routine tasks over unpredictable work", type: 'C' },
  { id: 44, text: "I am comfortable working with numbers and data", type: 'C' },
  { id: 45, text: "I like to follow established procedures and standards", type: 'C' },
  { id: 46, text: "I am efficient at managing records and documents", type: 'C' },
  { id: 47, text: "I prefer clear instructions and expectations", type: 'C' },
  { id: 48, text: "I enjoy working with computers and office software", type: 'C' },
];

export const riasecDescriptions: Record<string, { title: string; description: string; traits: string[] }> = {
  R: {
    title: "Realistic",
    description: "People with Realistic interests like work that includes practical, hands-on problems and answers. They enjoy dealing with plants, animals, and real-world materials like wood, tools, and machinery.",
    traits: ["Practical", "Hands-on", "Technical", "Outdoor-oriented", "Mechanical"]
  },
  I: {
    title: "Investigative",
    description: "People with Investigative interests like work that has to do with ideas and thinking rather than physical activity or leading people. They enjoy searching for facts and figuring out problems.",
    traits: ["Analytical", "Curious", "Scientific", "Intellectual", "Research-oriented"]
  },
  A: {
    title: "Artistic",
    description: "People with Artistic interests like work that deals with the artistic side of things, such as acting, music, art, and design. They enjoy creating original works and expressing themselves.",
    traits: ["Creative", "Expressive", "Original", "Imaginative", "Non-conforming"]
  },
  S: {
    title: "Social",
    description: "People with Social interests like working with others to help them learn and grow. They enjoy teaching, counseling, and helping people solve problems.",
    traits: ["Helpful", "Understanding", "Caring", "Cooperative", "Empathetic"]
  },
  E: {
    title: "Enterprising",
    description: "People with Enterprising interests like work that has to do with starting up and carrying out projects, especially business ventures. They enjoy persuading and leading people.",
    traits: ["Ambitious", "Persuasive", "Energetic", "Risk-taking", "Leadership"]
  },
  C: {
    title: "Conventional",
    description: "People with Conventional interests like work that follows set procedures and routines. They enjoy working with data and details rather than ideas and people.",
    traits: ["Organized", "Detail-oriented", "Efficient", "Reliable", "Systematic"]
  }
};
