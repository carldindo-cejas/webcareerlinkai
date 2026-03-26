import { useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';

// Landing Sections
import HeroSection from '@/sections/HeroSection';
import JourneySection from '@/sections/JourneySection';
import RIASECSection from '@/sections/RIASECSection';
import RecommendationsSection from '@/sections/RecommendationsSection';
import AIGuidanceSection from '@/sections/AIGuidanceSection';
import HowItWorksSection from '@/sections/HowItWorksSection';
import SuccessStoriesSection from '@/sections/SuccessStoriesSection';
import AptivaSection from '@/sections/AptivaSection';
import FinalCTASection from '@/sections/FinalCTASection';

// Pages
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import ProfilePage from '@/pages/ProfilePage';
import AssessmentPage from '@/pages/AssessmentPage';
import ResultsPage from '@/pages/ResultsPage';
import ChatPage from '@/pages/ChatPage';

// Utils
import { generateRecommendations, getTopRIASECCodes } from '@/utils/recommendationEngine';
import type { RIASECScores, SCCTAnswer } from '@/types';
import jsPDF from 'jspdf';

gsap.registerPlugin(ScrollTrigger);

// Landing Page Component
function LandingPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  useEffect(() => {
    // Initialize global snap after all ScrollTriggers are created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.20 },
          delay: 0,
          ease: 'power2.out',
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <main className="relative">
      <HeroSection 
        onStartAssessment={() => onNavigate('signup')} 
        onLearnMore={() => {
          const element = document.getElementById('how-it-works');
          element?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
      <JourneySection onCreateProfile={() => onNavigate('profile')} />
      <RIASECSection onPreviewQuestions={() => onNavigate('assessment')} />
      <RecommendationsSection onSeeExample={() => onNavigate('results')} />
      <AIGuidanceSection onTryChat={() => onNavigate('chat')} />
      <div id="how-it-works">
        <HowItWorksSection />
      </div>
      <SuccessStoriesSection />
      <AptivaSection 
        onOpenChat={() => onNavigate('chat')} 
        onLearnMore={() => onNavigate('chat')} 
      />
      <FinalCTASection onGetStarted={() => onNavigate('signup')} />
    </main>
  );
}

// Main App Content
function AppContent() {
  const [currentPage, setCurrentPage] = useState('landing');
  const { 
    user, 
    isAuthenticated, 
    login, 
    signup, 
    loginAsGuest, 
    logout,
    profile,
    updateGrades,
    updateStrand,
    updateRIASECScores,
    updateSCCTAnswers,
    recommendations,
    setRecommendations,
    hasCompletedAssessment,
    setHasCompletedAssessment,
  } = useAuth();

  // Handle navigation
  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  // Handle assessment completion
  const handleAssessmentComplete = useCallback((scores: RIASECScores, answers: SCCTAnswer[]) => {
    updateRIASECScores(scores);
    updateSCCTAnswers(answers);
    
    // Generate recommendations
    if (profile) {
      const updatedProfile = { ...profile, riasecScores: scores, scctAnswers: answers };
      const recs = generateRecommendations(updatedProfile);
      setRecommendations(recs);
      setHasCompletedAssessment(true);
    }

    // Navigate to results after a short delay
    setTimeout(() => {
      setCurrentPage('results');
    }, 2000);
  }, [profile, updateRIASECScores, updateSCCTAnswers, setRecommendations, setHasCompletedAssessment]);

  // Handle report download
  const handleDownloadReport = useCallback(() => {
    if (!profile || !user) return;

    const doc = new jsPDF();
    const topCodes = getTopRIASECCodes(profile.riasecScores);

    // Title
    doc.setFontSize(24);
    doc.text('CareerLinkAI Assessment Report', 20, 30);

    // User Info
    doc.setFontSize(12);
    doc.text(`Name: ${user.name}`, 20, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 58);

    // RIASEC Profile
    doc.setFontSize(16);
    doc.text('RIASEC Profile', 20, 80);
    doc.setFontSize(12);
    doc.text(`Top Codes: ${topCodes.join('')}`, 20, 92);
    doc.text(`Dominant Type: ${topCodes[0]}`, 20, 100);

    // Scores
    doc.setFontSize(14);
    doc.text('Scores:', 20, 115);
    doc.setFontSize(10);
    let y = 125;
    Object.entries(profile.riasecScores).forEach(([type, score]) => {
      doc.text(`${type}: ${score}%`, 20, y);
      y += 8;
    });

    // Recommendations
    doc.setFontSize(16);
    doc.text('Top Course Recommendations', 20, y + 10);
    y += 25;
    
    doc.setFontSize(10);
    recommendations.slice(0, 5).forEach((rec, index) => {
      doc.text(`${index + 1}. ${rec.course.name} (${rec.score}% match)`, 20, y);
      y += 8;
      doc.text(`   ${rec.course.description.substring(0, 80)}...`, 20, y);
      y += 12;
    });

    doc.save('careerlink-assessment-report.pdf');
  }, [profile, user, recommendations]);

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;

      case 'login':
        return (
          <LoginPage
            onLogin={login}
            onNavigate={handleNavigate}
            onGuestLogin={() => {
              loginAsGuest();
              handleNavigate('profile');
            }}
          />
        );

      case 'signup':
        return (
          <SignupPage
            onSignup={signup}
            onNavigate={handleNavigate}
            onGuestLogin={() => {
              loginAsGuest();
              handleNavigate('profile');
            }}
          />
        );

      case 'profile':
        return (
          <ProfilePage
            profile={profile}
            onUpdateGrades={updateGrades}
            onUpdateStrand={updateStrand}
            onContinue={() => handleNavigate('assessment')}
          />
        );

      case 'assessment':
        return (
          <AssessmentPage
            onComplete={handleAssessmentComplete}
          />
        );

      case 'results':
        if (!hasCompletedAssessment || !profile) {
          return (
            <div className="min-h-screen bg-[#070A12] flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl text-white mb-4">No Results Yet</h2>
                <p className="text-[#A7ACB8] mb-6">Complete the assessment to see your recommendations</p>
                <button onClick={() => handleNavigate('assessment')} className="btn-primary">
                  Take Assessment
                </button>
              </div>
            </div>
          );
        }
        return (
          <ResultsPage
            riasecScores={profile.riasecScores}
            recommendations={recommendations}
            onRetake={() => handleNavigate('assessment')}
            onDownloadReport={handleDownloadReport}
          />
        );

      case 'chat':
        return (
          <ChatPage
            userName={user?.name || 'Student'}
            riasecProfile={profile ? getTopRIASECCodes(profile.riasecScores).join('') : undefined}
          />
        );

      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation - only show on landing page */}
      {currentPage === 'landing' && (
        <Navigation
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isAuthenticated={isAuthenticated}
          onLogout={() => {
            logout();
            handleNavigate('landing');
          }}
        />
      )}

      {/* Page Content */}
      {renderPage()}
    </div>
  );
}

// Main App with Auth Provider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
