import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { User, UserProfile, Grades, SHSStrand, RIASECScores, SCCTAnswer, Recommendation } from '@/types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  loginAsGuest: () => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateGrades: (grades: Grades) => void;
  updateStrand: (strand: SHSStrand) => void;
  updateRIASECScores: (scores: RIASECScores) => void;
  updateSCCTAnswers: (answers: SCCTAnswer[]) => void;
  recommendations: Recommendation[];
  setRecommendations: (recs: Recommendation[]) => void;
  hasCompletedAssessment: boolean;
  setHasCompletedAssessment: (completed: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('careerlink_user');
    const savedProfile = localStorage.getItem('careerlink_profile');
    const savedRecs = localStorage.getItem('careerlink_recommendations');
    const savedCompleted = localStorage.getItem('careerlink_completed');
    
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error('Failed to parse user:', e);
      }
    }
    
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(parsedProfile);
      } catch (e) {
        console.error('Failed to parse profile:', e);
      }
    }

    if (savedRecs) {
      try {
        const parsedRecs = JSON.parse(savedRecs);
        setRecommendations(parsedRecs);
      } catch (e) {
        console.error('Failed to parse recommendations:', e);
      }
    }

    if (savedCompleted) {
      setHasCompletedAssessment(savedCompleted === 'true');
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('careerlink_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('careerlink_user');
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      localStorage.setItem('careerlink_profile', JSON.stringify(profile));
    } else {
      localStorage.removeItem('careerlink_profile');
    }
  }, [profile]);

  useEffect(() => {
    if (recommendations.length > 0) {
      localStorage.setItem('careerlink_recommendations', JSON.stringify(recommendations));
    }
  }, [recommendations]);

  useEffect(() => {
    localStorage.setItem('careerlink_completed', hasCompletedAssessment.toString());
  }, [hasCompletedAssessment]);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For demo, accept any valid-looking email
    if (email.includes('@') && password.length >= 6) {
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
        isGuest: false,
        createdAt: new Date(),
      };
      setUser(newUser);
      
      // Initialize empty profile
      setProfile({
        userId: newUser.id,
        grades: { math: {}, english: {}, science: {} },
        strand: 'GAS',
        riasecScores: { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 },
        scctAnswers: [],
        completedAssessments: [],
      });
      
      return true;
    }
    return false;
  }, []);

  const signup = useCallback(async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email.includes('@') && password.length >= 6 && name.length >= 2) {
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        isGuest: false,
        createdAt: new Date(),
      };
      setUser(newUser);
      
      setProfile({
        userId: newUser.id,
        grades: { math: {}, english: {}, science: {} },
        strand: 'GAS',
        riasecScores: { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 },
        scctAnswers: [],
        completedAssessments: [],
      });
      
      return true;
    }
    return false;
  }, []);

  const loginAsGuest = useCallback(() => {
    const guestUser: User = {
      id: `guest_${Date.now()}`,
      email: 'guest@careerlink.ai',
      name: 'Guest User',
      isGuest: true,
      createdAt: new Date(),
    };
    setUser(guestUser);
    
    setProfile({
      userId: guestUser.id,
      grades: { math: {}, english: {}, science: {} },
      strand: 'GAS',
      riasecScores: { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 },
      scctAnswers: [],
      completedAssessments: [],
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setProfile(null);
    setRecommendations([]);
    setHasCompletedAssessment(false);
    localStorage.removeItem('careerlink_user');
    localStorage.removeItem('careerlink_profile');
    localStorage.removeItem('careerlink_recommendations');
    localStorage.removeItem('careerlink_completed');
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile(prev => prev ? { ...prev, ...updates } : null);
  }, []);

  const updateGrades = useCallback((grades: Grades) => {
    setProfile(prev => prev ? { ...prev, grades } : null);
  }, []);

  const updateStrand = useCallback((strand: SHSStrand) => {
    setProfile(prev => prev ? { ...prev, strand } : null);
  }, []);

  const updateRIASECScores = useCallback((scores: RIASECScores) => {
    setProfile(prev => prev ? { ...prev, riasecScores: scores } : null);
  }, []);

  const updateSCCTAnswers = useCallback((answers: SCCTAnswer[]) => {
    setProfile(prev => prev ? { ...prev, scctAnswers: answers } : null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: !!user,
        login,
        signup,
        loginAsGuest,
        logout,
        updateProfile,
        updateGrades,
        updateStrand,
        updateRIASECScores,
        updateSCCTAnswers,
        recommendations,
        setRecommendations,
        hasCompletedAssessment,
        setHasCompletedAssessment,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
