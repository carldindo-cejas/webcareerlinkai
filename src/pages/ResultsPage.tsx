import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Download, RefreshCw, GraduationCap, Briefcase, ChevronRight, Sparkles } from 'lucide-react';
import type { Recommendation, RIASECScores, RIASECType } from '@/types';
import { riasecDescriptions } from '@/data/riasecQuestions';
import { getCareerRecommendations, getTopRIASECCodes } from '@/utils/recommendationEngine';

interface ResultsPageProps {
  riasecScores: RIASECScores;
  recommendations: Recommendation[];
  onRetake: () => void;
  onDownloadReport: () => void;
}

const RIASEC_COLORS: Record<RIASECType, string> = {
  R: '#EF4444',
  I: '#3B82F6',
  A: '#F59E0B',
  S: '#10B981',
  E: '#8B5CF6',
  C: '#EC4899',
};

export default function ResultsPage({ 
  riasecScores, 
  recommendations, 
  onRetake, 
  onDownloadReport 
}: ResultsPageProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCourse, setSelectedCourse] = useState<Recommendation | null>(null);
  
  const topCodes = getTopRIASECCodes(riasecScores);
  const dominantType = topCodes[0];
  const dominantDesc = riasecDescriptions[dominantType];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Animate score bars
      const scoreBars = section.querySelectorAll('.score-bar-fill');
      scoreBars.forEach((bar, index) => {
        const type = Object.keys(riasecScores)[index] as RIASECType;
        gsap.fromTo(bar,
          { width: 0 },
          { 
            width: `${riasecScores[type]}%`, 
            duration: 1, 
            delay: index * 0.1,
            ease: 'power2.out',
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [riasecScores]);

  const relatedCareers = selectedCourse 
    ? getCareerRecommendations(selectedCourse.course.id, riasecScores)
    : [];

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#070A12] pt-24 pb-12 px-6">
      {/* Background glow */}
      <div className="fixed top-1/4 right-1/4
                      w-[500px] h-[500px] rounded-full
                      bg-[#4F46E5]/5 blur-[200px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <div className="micro-label mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
              YOUR RESULTS
            </div>
            <h1 className="text-[clamp(28px,3vw,40px)] font-light text-white">
              Career <span className="text-[#4F46E5]">Recommendations</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onDownloadReport} className="btn-secondary">
              <Download className="w-4 h-4" />
              Download Report
            </button>
            <button onClick={onRetake} className="btn-secondary">
              <RefreshCw className="w-4 h-4" />
              Retake
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - RIASEC Profile */}
          <div className="space-y-6">
            {/* RIASEC Card */}
            <div className="glass-card glass-card-md p-6">
              <h3 className="text-lg font-medium text-white mb-5">
                Your RIASEC Profile
              </h3>

              {/* Top Codes */}
              <div className="flex items-center gap-2 mb-6">
                {topCodes.map((code, index) => (
                  <div
                    key={code}
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
                    style={{ 
                      backgroundColor: `${RIASEC_COLORS[code]}20`,
                      color: RIASEC_COLORS[code],
                      opacity: index === 0 ? 1 : index === 1 ? 0.7 : 0.5,
                    }}
                  >
                    {code}
                  </div>
                ))}
              </div>

              {/* Score Bars */}
              <div className="space-y-4">
                {(Object.entries(riasecScores) as [RIASECType, number][])
                  .sort((a, b) => b[1] - a[1])
                  .map(([type, score]) => (
                    <div key={type}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
                            style={{ 
                              backgroundColor: `${RIASEC_COLORS[type]}20`,
                              color: RIASEC_COLORS[type],
                            }}
                          >
                            {type}
                          </span>
                          <span className="text-sm text-[#A7ACB8]">
                            {riasecDescriptions[type]?.title}
                          </span>
                        </div>
                        <span className="text-sm text-white font-medium">{score}%</span>
                      </div>
                      <div className="score-bar">
                        <div 
                          className="score-bar-fill"
                          style={{ backgroundColor: RIASEC_COLORS[type] }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Dominant Type Description */}
            <div className="glass-card glass-card-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ 
                    backgroundColor: `${RIASEC_COLORS[dominantType]}20`,
                  }}
                >
                  <span 
                    className="text-lg font-bold"
                    style={{ color: RIASEC_COLORS[dominantType] }}
                  >
                    {dominantType}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-white">
                  {dominantDesc?.title}
                </h3>
              </div>
              <p className="text-sm text-[#A7ACB8] leading-relaxed mb-4">
                {dominantDesc?.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {dominantDesc?.traits.map(trait => (
                  <span 
                    key={trait}
                    className="px-3 py-1 rounded-full bg-white/[0.05] text-xs text-[#A7ACB8]"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Recommendations */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card glass-card-md p-6">
              <h3 className="text-lg font-medium text-white mb-5 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#4F46E5]" />
                Recommended Courses
              </h3>

              <div className="space-y-4">
                {recommendations.slice(0, 5).map((rec) => (
                  <div
                    key={rec.course.id}
                    onClick={() => setSelectedCourse(rec)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all
                                ${selectedCourse?.course.id === rec.course.id
                                  ? 'bg-[#4F46E5]/10 border-[#4F46E5]'
                                  : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.05]'
                                }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="w-6 h-6 rounded-md bg-[#4F46E5]/20 
                                           text-[#4F46E5] text-xs font-bold flex items-center justify-center">
                            {rec.rank}
                          </span>
                          <h4 className="text-white font-medium">{rec.course.name}</h4>
                        </div>
                        <p className="text-sm text-[#A7ACB8] mb-3 line-clamp-2">
                          {rec.course.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {rec.reasons.slice(0, 2).map((reason, i) => (
                            <span 
                              key={i}
                              className="px-2.5 py-1 rounded-full bg-[#4F46E5]/10 
                                         text-xs text-[#4F46E5]"
                            >
                              {reason}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="text-2xl font-light text-[#4F46E5]">
                            {rec.score}%
                          </div>
                          <div className="text-xs text-[#A7ACB8]">match</div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-[#A7ACB8]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Course Details */}
            {selectedCourse && (
              <div className="glass-card glass-card-md p-6 animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#4F46E5]" />
                  Related Careers: {selectedCourse.course.name}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedCareers.map(career => (
                    <div 
                      key={career.id}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                    >
                      <h4 className="text-white font-medium mb-1">{career.name}</h4>
                      <p className="text-sm text-[#A7ACB8] mb-3 line-clamp-2">
                        {career.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-[#4F46E5]">{career.outlook}</span>
                        <span className="text-[#A7ACB8]">{career.salaryRange}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
