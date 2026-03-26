import { useState, useEffect } from 'react';
import { Sparkles, Menu, X, User } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export default function Navigation({ currentPage, onNavigate, isAuthenticated, onLogout }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'How it works', page: 'landing', section: 'how-it-works' },
    { label: 'Assessment', page: 'assessment' },
    { label: 'Chat', page: 'chat' },
  ];

  const handleNavClick = (page: string, section?: string) => {
    onNavigate(page);
    if (section) {
      setTimeout(() => {
        const element = document.getElementById(section);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300
                  ${isScrolled 
                    ? 'bg-[#070A12]/80 backdrop-blur-xl border-b border-white/[0.06]' 
                    : 'bg-transparent'
                  }`}
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#4F46E5] flex items-center justify-center
                            transition-transform group-hover:scale-105">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-medium">CareerLinkAI</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.page, link.section)}
                className={`nav-link ${currentPage === link.page ? 'text-white' : ''}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNavClick('profile')}
                  className="flex items-center gap-2 text-[#A7ACB8] hover:text-white transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm">Profile</span>
                </button>
                <button
                  onClick={onLogout}
                  className="btn-secondary text-sm py-2 px-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('login')}
                  className="nav-link"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavClick('signup')}
                  className="btn-primary text-sm py-2 px-4"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#070A12]/95 backdrop-blur-xl border-t border-white/[0.06]">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.page, link.section)}
                className="block w-full text-left text-[#A7ACB8] hover:text-white py-2"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4 border-t border-white/[0.06] space-y-3">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => handleNavClick('profile')}
                    className="block w-full text-left text-[#A7ACB8] hover:text-white py-2"
                  >
                    Profile
                  </button>
                  <button
                    onClick={onLogout}
                    className="btn-secondary w-full justify-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavClick('login')}
                    className="block w-full text-left text-[#A7ACB8] hover:text-white py-2"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavClick('signup')}
                    className="btn-primary w-full justify-center"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
