import { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, ClipboardList, MessageSquare, Sparkles } from 'lucide-react';
import { riasecQuestions } from '@/data/riasecQuestions';
import { scctQuestions } from '@/data/scctQuestions';
import type { RIASECScores, SCCTAnswer } from '@/types';

interface AssessmentPageProps {
  onComplete: (riasecScores: RIASECScores, scctAnswers: SCCTAnswer[]) => void;
}

const LIKERT_SCALE = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
];

export default function AssessmentPage({ onComplete }: AssessmentPageProps) {
  const [phase, setPhase] = useState<'intro' | 'riasec' | 'scct' | 'complete'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [riasecAnswers, setRiasecAnswers] = useState<{ [key: number]: number }>({});
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
        setPhase('scct');
        setCurrentQuestionIndex(0);
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

      // Normalize scores
      (Object.keys(scores) as (keyof RIASECScores)[]).forEach(type => {
        if (counts[type] > 0) {
          scores[type] = Math.round((scores[type] / (counts[type] * 5)) * 100);
        }
      });

      setPhase('complete');
      onComplete(scores, [...scctAnswers, newAnswer]);
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
      <div className="min-h-screen bg-[#070A12] flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl w-full">
          <div className="glass-card p-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#4F46E5]/10 flex items-center justify-center mx-auto mb-6">
              <ClipboardList className="w-8 h-8 text-[#4F46E5]" />
            </div>
            <h1 className="text-3xl font-light text-white mb-4">
              Career Assessment
            </h1>
            <p className="text-[#A7ACB8] mb-8 max-w-lg mx-auto leading-relaxed">
              This two-phase assessment will help us understand your personality, 
              interests, and goals to provide personalized career recommendations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="glass-card glass-card-sm p-5 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#4F46E5]/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-[#4F46E5]">1</span>
                  </div>
                  <h3 className="text-white font-medium">RIASEC Test</h3>
                </div>
                <p className="text-sm text-[#A7ACB8]">
                  48 questions about your interests and personality
                </p>
                <div className="mt-3 text-xs text-[#4F46E5]">~10 minutes</div>
              </div>

              <div className="glass-card glass-card-sm p-5 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#4F46E5]/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-[#4F46E5]">2</span>
                  </div>
                  <h3 className="text-white font-medium">SCCT Questions</h3>
                </div>
                <p className="text-sm text-[#A7ACB8]">
                  12 open-ended questions about your goals
                </p>
                <div className="mt-3 text-xs text-[#4F46E5]">~15 minutes</div>
              </div>
            </div>

            <button
              onClick={() => setPhase('riasec')}
              className="btn-primary"
            >
              Start Assessment
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Complete Screen
  if (phase === 'complete') {
    return (
      <div className="min-h-screen bg-[#070A12] flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-[#4F46E5]/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#4F46E5]" />
          </div>
          <h1 className="text-3xl font-light text-white mb-4">
            Assessment Complete!
          </h1>
          <p className="text-[#A7ACB8] mb-8">
            We&apos;re analyzing your responses to generate personalized recommendations.
          </p>
          <div className="flex items-center justify-center gap-2 text-[#4F46E5]">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span>Generating results...</span>
          </div>
        </div>
      </div>
    );
  }

  // Question Screen
  return (
    <div className="min-h-screen bg-[#070A12] pt-24 pb-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#4F46E5]/10 flex items-center justify-center">
                {phase === 'riasec' ? (
                  <ClipboardList className="w-5 h-5 text-[#4F46E5]" />
                ) : (
                  <MessageSquare className="w-5 h-5 text-[#4F46E5]" />
                )}
              </div>
              <div>
                <div className="text-sm text-[#A7ACB8]">
                  {phase === 'riasec' ? 'RIASEC Assessment' : 'SCCT Questions'}
                </div>
                <div className="text-white font-medium">
                  Question {currentQuestionIndex + 1} of {phase === 'riasec' ? riasecQuestions.length : scctQuestions.length}
                </div>
              </div>
            </div>
            <div className="text-sm text-[#4F46E5]">
              {Math.round(progress)}%
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Question Card */}
        <div className="glass-card p-8 md:p-10">
          {phase === 'riasec' ? (
            // RIASEC Question
            <>
              <h2 className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
                {currentRiasecQuestion.text}
              </h2>

              <div className="space-y-3">
                {LIKERT_SCALE.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleRiasecAnswer(option.value)}
                    className={`w-full p-4 rounded-xl border text-left transition-all
                                ${riasecAnswers[currentRiasecQuestion.id] === option.value
                                  ? 'bg-[#4F46E5]/20 border-[#4F46E5] text-white'
                                  : 'bg-white/[0.03] border-white/[0.08] text-[#A7ACB8] hover:bg-white/[0.06]'
                                }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                                      ${riasecAnswers[currentRiasecQuestion.id] === option.value
                                        ? 'border-[#4F46E5]'
                                        : 'border-[#A7ACB8]/30'
                                      }`}>
                        {riasecAnswers[currentRiasecQuestion.id] === option.value && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]" />
                        )}
                      </div>
                      <span>{option.label}</span>
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
              <h2 className="text-xl md:text-2xl text-white mb-6 leading-relaxed">
                {currentScctQuestion.text}
              </h2>

              <textarea
                value={scctTextAnswers[currentScctQuestion.id] || ''}
                onChange={(e) => setScctTextAnswers(prev => ({
                  ...prev,
                  [currentScctQuestion.id]: e.target.value,
                }))}
                placeholder="Share your thoughts..."
                rows={5}
                className="input-glass resize-none mb-4"
              />

              <div className="flex items-center justify-between">
                <button
                  onClick={handleBack}
                  disabled={currentQuestionIndex === 0}
                  className="btn-ghost disabled:opacity-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={handleScctAnswer}
                  disabled={!scctTextAnswers[currentScctQuestion.id]?.trim() || 
                    scctTextAnswers[currentScctQuestion.id].trim().length < 10}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
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
