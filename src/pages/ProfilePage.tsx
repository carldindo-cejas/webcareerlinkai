import { useState, useEffect } from 'react';
import { ArrowRight, Save, GraduationCap, Calculator, BookOpen, FlaskConical, ChevronDown } from 'lucide-react';
import { STRANDS } from '@/types';
import type { SHSStrand, Grades } from '@/types';

interface ProfilePageProps {
  profile: { grades: Grades; strand: SHSStrand } | null;
  onUpdateGrades: (grades: Grades) => void;
  onUpdateStrand: (strand: SHSStrand) => void;
  onContinue: () => void;
}

const GRADE_LEVELS = [7, 8, 9, 10];

export default function ProfilePage({ profile, onUpdateGrades, onUpdateStrand, onContinue }: ProfilePageProps) {
  const [grades, setGrades] = useState<Grades>({
    math: {},
    english: {},
    science: {},
  });
  const [strand, setStrand] = useState<SHSStrand>('GAS');
  const [isStrandDropdownOpen, setIsStrandDropdownOpen] = useState(false);

  useEffect(() => {
    if (profile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setGrades(profile.grades);
      setStrand(profile.strand);
    }
  }, [profile]);

  const handleGradeChange = (subject: keyof Grades, level: number, value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 60 || numValue > 100) return;

    setGrades(prev => ({
      ...prev,
      [subject]: {
        ...prev[subject],
        [level]: numValue,
      },
    }));
  };

  const handleSave = () => {
    onUpdateGrades(grades);
    onUpdateStrand(strand);
  };

  const hasGrades = Object.values(grades).some(
    subject => Object.values(subject).length > 0
  );

  return (
    <div className="min-h-screen bg-[#070A12] pt-24 pb-12 px-6">
      {/* Background glow */}
      <div className="fixed top-1/3 left-1/4 -translate-x-1/2
                      w-[600px] h-[600px] rounded-full
                      bg-[#4F46E5]/5 blur-[200px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <div className="mb-10">
          <div className="micro-label mb-3 flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5 text-[#4F46E5]" />
            ACADEMIC PROFILE
          </div>
          <h1 className="text-[clamp(28px,3vw,40px)] font-light text-white mb-3">
            Your Academic <span className="text-[#4F46E5]">Background</span>
          </h1>
          <p className="text-[#A7ACB8] max-w-xl">
            Enter your grades and select your SHS strand. This helps us recommend 
            courses that match your academic strengths.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Grades Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Math */}
            <div className="glass-card glass-card-md p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#4F46E5]/10 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-[#4F46E5]" />
                </div>
                <h3 className="text-lg font-medium text-white">Mathematics</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {GRADE_LEVELS.map((level, index) => (
                  <div key={`math-${level}`}>
                    <label className="block text-xs text-[#A7ACB8] mb-2">
                      Grade {level}
                    </label>
                    <input
                      type="number"
                      min="60"
                      max="100"
                      value={grades.math[level] || ''}
                      onChange={(e) => handleGradeChange('math', level, e.target.value)}
                      onKeyDown={(e) => {
                        if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
                          e.preventDefault();
                        }
                        if (e.key === 'Enter') {
                          handleSave();
                        }
                      }}
                      placeholder="--"
                      className="input-glass text-center"
                      autoFocus={index === 0}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* English */}
            <div className="glass-card glass-card-md p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#4F46E5]/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#4F46E5]" />
                </div>
                <h3 className="text-lg font-medium text-white">English</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {GRADE_LEVELS.map(level => (
                  <div key={`english-${level}`}>
                    <label className="block text-xs text-[#A7ACB8] mb-2">
                      Grade {level}
                    </label>
                    <input
                      type="number"
                      min="60"
                      max="100"
                      value={grades.english[level] || ''}
                      onChange={(e) => handleGradeChange('english', level, e.target.value)}
                      onKeyDown={(e) => {
                        if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
                          e.preventDefault();
                        }
                        if (e.key === 'Enter') {
                          handleSave();
                        }
                      }}
                      placeholder="--"
                      className="input-glass text-center"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Science */}
            <div className="glass-card glass-card-md p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#4F46E5]/10 flex items-center justify-center">
                  <FlaskConical className="w-5 h-5 text-[#4F46E5]" />
                </div>
                <h3 className="text-lg font-medium text-white">Science</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {GRADE_LEVELS.map(level => (
                  <div key={`science-${level}`}>
                    <label className="block text-xs text-[#A7ACB8] mb-2">
                      Grade {level}
                    </label>
                    <input
                      type="number"
                      min="60"
                      max="100"
                      value={grades.science[level] || ''}
                      onChange={(e) => handleGradeChange('science', level, e.target.value)}
                      onKeyDown={(e) => {
                        if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
                          e.preventDefault();
                        }
                        if (e.key === 'Enter') {
                          handleSave();
                        }
                      }}
                      placeholder="--"
                      className="input-glass text-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Strand Selection */}
          <div className="space-y-6">
            <div className="glass-card glass-card-md p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                SHS Strand
              </h3>
              <p className="text-sm text-[#A7ACB8] mb-5">
                Select the strand you are currently enrolled in or plan to take.
              </p>

              {/* Custom Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsStrandDropdownOpen(!isStrandDropdownOpen)}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08]
                             text-white text-left flex items-center justify-between
                             hover:bg-white/[0.08] transition-colors"
                >
                  <span>{STRANDS.find(s => s.value === strand)?.label || 'Select strand'}</span>
                  <ChevronDown className={`w-4 h-4 text-[#A7ACB8] transition-transform ${isStrandDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isStrandDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 
                                  bg-[#0B0E1F] border border-white/[0.08] rounded-xl
                                  max-h-60 overflow-y-auto z-10">
                    {STRANDS.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => {
                          setStrand(s.value);
                          setIsStrandDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-white/[0.05] transition-colors
                                    ${strand === s.value ? 'bg-[#4F46E5]/10 text-[#4F46E5]' : 'text-white'}`}
                      >
                        <div className="font-medium">{s.label}</div>
                        <div className="text-xs text-[#A7ACB8]">{s.description}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Info Card */}
            <div className="glass-card glass-card-md p-6 bg-[#4F46E5]/5">
              <h4 className="text-sm font-medium text-white mb-2">
                Why this matters
              </h4>
              <p className="text-sm text-[#A7ACB8] leading-relaxed">
                Your academic performance and strand help us identify courses 
                where you&apos;re most likely to succeed.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  handleSave();
                  onContinue();
                }}
                disabled={!hasGrades}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Assessment
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleSave}
                className="btn-secondary w-full justify-center"
              >
                <Save className="w-4 h-4" />
                Save Progress
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
