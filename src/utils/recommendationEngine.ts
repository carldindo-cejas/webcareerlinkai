import type { 
  UserProfile, 
  RIASECScores, 
  SCCTAnswer, 
  Course, 
  Career, 
  Recommendation,
  SHSStrand,
  RIASECType 
} from '@/types';
import { courses, careers } from '@/data/courses';
import { riasecDescriptions } from '@/data/riasecQuestions';

interface RecommendationWeights {
  riasec: number;
  scct: number;
  academic: number;
  strand: number;
}

const DEFAULT_WEIGHTS: RecommendationWeights = {
  riasec: 0.40,
  scct: 0.30,
  academic: 0.20,
  strand: 0.10,
};

export function calculateRIASECScores(answers: { [questionId: number]: number }): RIASECScores {
  const scores: RIASECScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  const counts = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

  // For each answer, we need to know the question type
  // Since we don't have direct access to questions here, 
  // we'll use a simplified calculation based on the pattern
  // The actual scoring happens in the AssessmentPage
  
  Object.entries(answers).forEach(([_, score]) => {
    // Distribute scores across types (simplified)
    const types: RIASECType[] = ['R', 'I', 'A', 'S', 'E', 'C'];
    types.forEach(type => {
      scores[type] += score;
      counts[type]++;
    });
  });

  // Normalize scores to 0-100 scale
  (Object.keys(scores) as RIASECType[]).forEach(type => {
    if (counts[type] > 0) {
      scores[type] = Math.min(100, Math.round((scores[type] / counts[type]) * 20));
    }
  });

  return scores;
}

export function getTopRIASECCodes(scores: RIASECScores): [RIASECType, RIASECType, RIASECType] {
  const sorted = (Object.entries(scores) as [RIASECType, number][])
    .sort((a, b) => b[1] - a[1]);
  
  return [sorted[0][0], sorted[1][0], sorted[2][0]];
}

function calculateAcademicScore(grades: UserProfile['grades']): number {
  const allGrades: number[] = [];
  
  // Collect all grades
  Object.values(grades.math).forEach(g => allGrades.push(g));
  Object.values(grades.english).forEach(g => allGrades.push(g));
  Object.values(grades.science).forEach(g => allGrades.push(g));
  
  if (allGrades.length === 0) return 50; // Default score if no grades
  
  const average = allGrades.reduce((a, b) => a + b, 0) / allGrades.length;
  // Convert to 0-100 scale (assuming grades are 60-100)
  return Math.round(average);
}

function calculateCourseRIASECMatch(course: Course, scores: RIASECScores): number {
  if (course.riasecMatch.length === 0) return 50;
  
  let totalScore = 0;
  course.riasecMatch.forEach(type => {
    totalScore += scores[type];
  });
  
  return totalScore / course.riasecMatch.length;
}

function calculateStrandMatch(course: Course, userStrand: SHSStrand): number {
  if (course.strandAlignment.includes(userStrand)) {
    return 100;
  }
  
  // Partial match for related strands
  const strandRelations: Record<SHSStrand, SHSStrand[]> = {
    'STEM': ['ICT', 'GAS'],
    'ABM': ['GAS', 'HE'],
    'HUMSS': ['GAS', 'Arts and Design'],
    'ICT': ['STEM', 'GAS'],
    'HE': ['ABM', 'GAS', 'AFA'],
    'GAS': ['STEM', 'ABM', 'HUMSS', 'ICT', 'HE', 'AFA', 'Arts and Design', 'Sports Track'],
    'AFA': ['HE', 'GAS'],
    'Arts and Design': ['HUMSS', 'GAS'],
    'Sports Track': ['STEM', 'GAS'],
  };
  
  const relatedStrands = strandRelations[userStrand] || [];
  const hasRelatedMatch = course.strandAlignment.some(strand => 
    relatedStrands.includes(strand)
  );
  
  return hasRelatedMatch ? 60 : 30;
}

function analyzeSCCTForCourse(scctAnswers: SCCTAnswer[]): number {
  if (scctAnswers.length === 0) return 50;
  
  // Simple analysis based on answer length and content
  // More detailed answers = higher engagement = higher score
  let totalScore = 0;
  
  scctAnswers.forEach(answer => {
    const answerLength = answer.answer.length;
    if (answerLength > 100) totalScore += 80;
    else if (answerLength > 50) totalScore += 60;
    else if (answerLength > 20) totalScore += 40;
    else totalScore += 20;
  });
  
  return Math.min(100, totalScore / scctAnswers.length);
}

export function generateRecommendations(
  profile: UserProfile,
  weights: RecommendationWeights = DEFAULT_WEIGHTS
): Recommendation[] {
  const academicScore = calculateAcademicScore(profile.grades);
  
  const scoredCourses = courses.map(course => {
    const riasecMatch = calculateCourseRIASECMatch(course, profile.riasecScores);
    const scctMatch = analyzeSCCTForCourse(profile.scctAnswers);
    const strandMatch = calculateStrandMatch(course, profile.strand);
    
    // Calculate weighted total score
    const totalScore = 
      (riasecMatch * weights.riasec) +
      (scctMatch * weights.scct) +
      (academicScore * weights.academic) +
      (strandMatch * weights.strand);
    
    // Generate reasons
    const reasons: string[] = [];
    
    if (riasecMatch >= 70) {
      const topTypes = getTopRIASECCodes(profile.riasecScores);
      reasons.push(`Strong match with your ${topTypes.join('')} personality profile`);
    }
    
    if (strandMatch >= 80) {
      reasons.push(`Aligns well with your ${profile.strand} strand`);
    } else if (strandMatch >= 60) {
      reasons.push(`Complements your ${profile.strand} background`);
    }
    
    if (academicScore >= 85) {
      reasons.push(`Your strong academic performance prepares you well`);
    }
    
    if (scctMatch >= 70) {
      reasons.push(`Matches your expressed interests and goals`);
    }
    
    if (course.difficulty === 'High' && academicScore >= 90) {
      reasons.push(`Challenging program suited to your academic strengths`);
    }
    
    if (reasons.length === 0) {
      reasons.push('Moderate fit based on your overall profile');
    }
    
    return {
      course,
      score: Math.round(totalScore),
      reasons,
      rank: 0, // Will be set after sorting
    };
  });
  
  // Sort by score descending and assign ranks
  const sorted = scoredCourses
    .sort((a, b) => b.score - a.score)
    .map((rec, index) => ({
      ...rec,
      rank: index + 1,
    }));
  
  // Return top 10 recommendations
  return sorted.slice(0, 10);
}

export function getCareerRecommendations(
  courseId: string,
  riasecScores: RIASECScores
): Career[] {
  const course = courses.find(c => c.id === courseId);
  if (!course) return [];
  
  const relatedCareers = careers.filter(career => 
    course.careers.includes(career.id) ||
    career.requiredCourses.includes(courseId)
  );
  
  // Score careers based on RIASEC match
  const scoredCareers = relatedCareers.map(career => {
    let matchScore = 0;
    career.riasecMatch.forEach(type => {
      matchScore += riasecScores[type];
    });
    matchScore /= career.riasecMatch.length;
    
    return { career, score: matchScore };
  });
  
  return scoredCareers
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(sc => sc.career);
}

export function generateReportSummary(profile: UserProfile): string {
  const topCodes = getTopRIASECCodes(profile.riasecScores);
  const dominantType = topCodes[0];
  
  const description = riasecDescriptions[dominantType];
  
  return `Your assessment reveals a ${topCodes.join('')} profile, with ${description?.title || dominantType} as your dominant type. ${description?.description || ''}`;
}
