import { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, ClipboardList, MessageSquare, Sparkles, Brain, Lightbulb } from 'lucide-react';
import { riasecQuestions, riasecDescriptions } from '@/data/riasecQuestions';
import { scctQuestions } from '@/data/scctQuestions';
import type { RIASECScores, SCCTAnswer, RIASECType } from '@/types';

interface AssessmentPageProps {
  onComplete: (riasecScores: RIASECScores, scctAnswers: SCCTAnswer[]) => void;
  onNavigate?: (page: string) => void;
}

const LIKERT_SCALE = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
];

const RIASEC_COLORS: Record<RIASECType, string> = {
  R: '#EF4444',
  I: '#3B82F6',
  A: '#F59E0B',
  S: '#10B981',
  E: '#8B5CF6',
  C: '#EC4899',
};

export default function AssessmentPage({ onComplete, onNavigate }: AssessmentPageProps) {
  const [phase, setPhase] = useState<'intro' | 'riasec' | 'riasec-results' | 'scct' | 'complete'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [riasecAnswers, setRiasecAnswers] = useState<{ [key: number]: number }>({});
  const [riasecScores, setRiasecScores] = useState<RIASECScores | null>(null);
  const [scctAnswers, setScctAnswers] = useState<SCCTAnswer[]>([]);
  const [scctTextAnswers, setScctTextAnswers] = useState<{ [key: number]: string }>({});

  const currentRiasecQuestion = riasecQuestions[currentQuestionIndex];
  const currentScctQuestion = scctQuestions[currentQuestionIndex];

  const handleRiasecAnswer = (value: number) => {
    setRiasecAnswers(prev => ({
      ...prev,
      [currentRiasecQuestion.id]: value,
    }));

    // Auto-advance after selection
    setTimeout(() => {
      if (currentQuestionIndex < riasecQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Calculate RIASEC scores
        const scores: RIASECScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
        const counts = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

        Object.entries(riasecAnswers).forEach(([questionId, score]) => {
          const question = riasecQuestions.find(q => q.id === parseInt(questionId));
          if (question) {
            scores[question.type] += score;
            counts[question.type]++;
          }
        });

        // Add the last answer
        const lastQuestion = riasecQuestions.find(q => q.id === currentRiasecQuestion.id);
        if (lastQuestion) {
          scores[lastQuestion.type] += value;
          counts[lastQuestion.type]++;
        }

        // Normalize scores
        (Object.keys(scores) as (keyof RIASECScores)[]).forEach(type => {
          if (counts[type] > 0) {
            scores[type] = Math.round((scores[type] / (counts[type] * 5)) * 100);
          }
        });

        setRiasecScores(scores);
        setPhase('riasec-results');
      }
    }, 300);
  };

  const handleScctAnswer = () => {
    const answer = scctTextAnswers[currentScctQuestion.id];
    if (!answer || answer.trim().length < 10) return;

    const newAnswer: SCCTAnswer = {
      questionId: currentScctQuestion.id,
      answer: answer.trim(),
      category: currentScctQuestion.category,
    };

    setScctAnswers(prev => [...prev, newAnswer]);

    if (currentQuestionIndex < scctQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Complete assessment
      if (riasecScores) {
        setPhase('complete');
        onComplete(riasecScores, [...scctAnswers, newAnswer]);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const progress = phase === 'riasec'
    ? ((currentQuestionIndex + 1) / riasecQuestions.length) * 100
    : ((currentQuestionIndex + 1) / scctQuestions.length) * 100;

  // Intro Screen
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-[#070A12] flex items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-2xl w-full">
          <div className="glass-card p-6 sm:p-8 md:p-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#4F46E5]/10 flex items-center justify-center mx-auto mb-6">
              <ClipboardList className="w-8 h-8 text-[#4F46E5]" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-4">
              Career Assessment
            </h1>
            <p className="text-sm sm:text-base text-[#A7ACB8] mb-8 max-w-lg mx-auto leading-relaxed">
              This two-phase assessment will help us understand your personality, 
              interests, and goals to provide personalized career recommendations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-8">
              <div className="glass-card glass-card-sm p-4 sm:p-5 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#4F46E5]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-[#4F46E5]">1</span>
                  </div>
                  <h3 className="text-white font-medium text-sm sm:text-base">RIASEC Test</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#A7ACB8]">
                  48 questions about your interests and personality
                </p>
                <div className="mt-3 text-xs text-[#4F46E5]">~10 minutes</div>
              </div>

              <div className="glass-card glass-card-sm p-4 sm:p-5 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#4F46E5]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-[#4F46E5]">2</span>
                  </div>
                  <h3 className="text-white font-medium text-sm sm:text-base">SCCT Questions</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#A7ACB8]">
                  12 open-ended questions about your goals
                </p>
                <div className="mt-3 text-xs text-[#4F46E5]">~15 minutes</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {onNavigate && (
                <button
                  onClick={() => onNavigate('landing')}
                  className="btn-ghost w-full sm:w-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              )}
              <button
                onClick={() => setPhase('riasec')}
                className="btn-primary w-full sm:w-auto"
              >
                Start Assessment
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Complete Screen
  if (phase === 'complete') {
    return (
      <div className="min-h-screen bg-[#070A12] flex items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-[#4F46E5]/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#4F46E5]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-light text-white mb-4">
            Assessment Complete!
          </h1>
          <p className="text-sm sm:text-base text-[#A7ACB8] mb-8">
            We&apos;re analyzing your responses to generate personalized recommendations.
          </p>
          <div className="flex items-center justify-center gap-2 text-[#4F46E5]">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="text-sm">Generating results...</span>
          </div>
        </div>
      </div>
    );
  }

  // RIASEC Results Explanation Screen
  if (phase === 'riasec-results' && riasecScores) {
    const topCodes = (Object.entries(riasecScores) as [RIASECType, number][])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([type]) => type);

    return (
      <div className="min-h-screen bg-[#070A12] pt-20 sm:pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-[#4F46E5]" />
              <span className="text-xs sm:text-sm uppercase tracking-widest text-[#A7ACB8]">Your Results</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-3">
              RIASEC Assessment Results
            </h1>
            <p className="text-sm sm:text-base text-[#A7ACB8] max-w-2xl mx-auto">
              Here's what your answers reveal about your personality, interests, and ideal work environment.
            </p>
          </div>

          {/* Top Codes Display */}
          <div className="mb-8 sm:mb-10">
            <div className="glass-card p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl text-white font-medium mb-6">Your RIASEC Profile</h2>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {topCodes.map((code) => (
                  <div
                    key={code}
                    className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center text-lg sm:text-2xl font-bold"
                    style={{
                      backgroundColor: `${RIASEC_COLORS[code]}20`,
                      color: RIASEC_COLORS[code],
                    }}
                  >
                    <div>{code}</div>
                    <div className="text-xs mt-1 opacity-60">
                      {Math.round(riasecScores[code])}%
                    </div>
                  </div>
                ))}
              </div>

              {/* Score Bars */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-sm text-[#A7ACB8] uppercase tracking-wider mb-4">All Scores</h3>
                {(Object.entries(riasecScores) as [RIASECType, number][])
                  .sort((a, b) => b[1] - a[1])
                  .map(([type, score]) => (
                    <div key={type}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-5 h-5 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                            style={{ backgroundColor: RIASEC_COLORS[type] }}
                          >
                            {type}
                          </div>
                          <span className="text-xs sm:text-sm text-[#A7ACB8]">
                            {riasecDescriptions[type]?.title}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-white">{score}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            backgroundColor: RIASEC_COLORS[type],
                            width: `${score}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Top Code Explanations */}
          <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
            {topCodes.map((code) => {
              const desc = riasecDescriptions[code];
              return (
                <div key={code} className="glass-card p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg text-white font-medium mb-3 flex items-center gap-2">
                    <Brain className="w-5 h-5" style={{ color: RIASEC_COLORS[code] }} />
                    {desc.title} ({code})
                  </h3>
                  <p className="text-sm text-[#A7ACB8] mb-3">
                    {desc.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {desc.traits.map((trait) => (
                      <span
                        key={trait}
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: `${RIASEC_COLORS[code]}15`,
                          color: RIASEC_COLORS[code],
                        }}
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                setCurrentQuestionIndex(0);
                setPhase('scct');
              }}
              className="btn-primary w-full sm:w-auto"
            >
              Continue to Next Phase
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Question Screen
  return (
    <div className="min-h-screen bg-[#070A12] pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Progress Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#4F46E5]/10 flex items-center justify-center flex-shrink-0">
                {phase === 'riasec' ? (
                  <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5 text-[#4F46E5]" />
                ) : (
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-[#4F46E5]" />
                )}
              </div>
              <div>
                <div className="text-xs sm:text-sm text-[#A7ACB8]">
                  {phase === 'riasec' ? 'RIASEC Assessment' : 'SCCT Questions'}
                </div>
                <div className="text-sm sm:text-base text-white font-medium">
                  Question {currentQuestionIndex + 1} of {phase === 'riasec' ? riasecQuestions.length : scctQuestions.length}
                </div>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-[#4F46E5] font-medium">
              {Math.round(progress)}%
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Question Card */}
        <div className="glass-card p-6 sm:p-8 md:p-10">
          {phase === 'riasec' ? (
            // RIASEC Question
            <>
              <h2 className="text-lg sm:text-xl md:text-2xl text-white mb-6 sm:mb-8 leading-relaxed">
                {currentRiasecQuestion.text}
              </h2>

              <div className="space-y-2 sm:space-y-3">
                {LIKERT_SCALE.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleRiasecAnswer(option.value)}
                    className={`w-full p-3 sm:p-4 rounded-xl border text-left transition-all
                                ${riasecAnswers[currentRiasecQuestion.id] === option.value
                                  ? 'bg-[#4F46E5]/20 border-[#4F46E5] text-white'
                                  : 'bg-white/[0.03] border-white/[0.08] text-[#A7ACB8] hover:bg-white/[0.06]'
                                }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                                      ${riasecAnswers[currentRiasecQuestion.id] === option.value
                                        ? 'border-[#4F46E5]'
                                        : 'border-[#A7ACB8]/30'
                                      }`}>
                        {riasecAnswers[currentRiasecQuestion.id] === option.value && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]" />
                        )}
                      </div>
                      <span className="text-sm sm:text-base">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            // SCCT Question
            <>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-[#4F46E5]/10 
                                 text-[#4F46E5] text-xs uppercase tracking-wider">
                  {currentScctQuestion.category}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl text-white mb-5 sm:mb-6 leading-relaxed">
                {currentScctQuestion.text}
              </h2>

              <textarea
                value={scctTextAnswers[currentScctQuestion.id] || ''}
                onChange={(e) => setScctTextAnswers(prev => ({
                  ...prev,
                  [currentScctQuestion.id]: e.target.value,
                }))}
                placeholder="Share your thoughts..."
                rows={4}
                className="input-glass resize-none mb-4 text-sm sm:text-base"
              />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={handleBack}
                  disabled={currentQuestionIndex === 0}
                  className="btn-ghost disabled:opacity-50 w-full sm:w-auto sm:order-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={handleScctAnswer}
                  disabled={!scctTextAnswers[currentScctQuestion.id]?.trim() || 
                    scctTextAnswers[currentScctQuestion.id].trim().length < 10}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto sm:order-2"
                >
                  {currentQuestionIndex < scctQuestions.length - 1 ? (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Complete
                      <CheckCircle className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
