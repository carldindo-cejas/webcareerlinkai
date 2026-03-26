import { useState, useEffect } from 'react';
import { Sparkles, Menu, X, User, ChevronRight } from 'lucide-react';

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
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when page changes
  useEffect(() => {
    setTimeout(() => {
      setIsMobileMenuOpen(false);
    }, 0);
  }, [currentPage]);

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
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-200
                  ${isScrolled 
                    ? 'bg-[#070A12]/80 backdrop-blur-xl border-b border-white/[0.06]' 
                    : 'bg-transparent'
                  }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#4F46E5] flex items-center justify-center
                            transition-transform duration-200 group-hover:scale-105">
              <Sparkles className="w-4 h-4 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-white font-medium text-sm sm:text-base hidden xs:inline">CareerLinkAI</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.page, link.section)}
                className={`nav-link text-sm transition-colors duration-200 ${currentPage === link.page ? 'text-white' : 'text-[#A7ACB8] hover:text-white'}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNavClick('profile')}
                  className="flex items-center gap-2 text-[#A7ACB8] hover:text-white transition-colors duration-200 text-sm"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={onLogout}
                  className="btn-secondary text-xs sm:text-sm py-2 px-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('login')}
                  className="text-[#A7ACB8] hover:text-white transition-colors duration-200 text-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavClick('signup')}
                  className="btn-primary text-xs sm:text-sm py-2 px-4"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Right Side */}
          <div className="lg:hidden flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => handleNavClick('profile')}
                className="p-2 text-[#A7ACB8] hover:text-white transition-colors sm:hidden"
              >
                <User className="w-5 h-5" />
              </button>
            )}
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white transition-transform duration-200 hover:bg-white/10 rounded-lg"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#070A12]/95 backdrop-blur-xl border-t border-white/[0.06] animate-in fade-in fill-mode-forwards duration-200">
          <div className="px-4 sm:px-6 py-3 sm:py-4 space-y-1 sm:space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.page, link.section)}
                className="block w-full text-left text-[#A7ACB8] hover:text-white hover:bg-white/5 transition-colors duration-200 py-2 px-3 rounded-lg text-sm sm:text-base"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 sm:pt-4 border-t border-white/[0.06] space-y-2">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => handleNavClick('profile')}
                    className="block w-full text-left text-[#A7ACB8] hover:text-white hover:bg-white/5 transition-colors duration-200 py-2 px-3 rounded-lg text-sm sm:text-base flex items-center justify-between"
                  >
                    Profile
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onLogout}
                    className="btn-secondary w-full justify-center text-xs sm:text-sm py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavClick('login')}
                    className="block w-full text-left text-[#A7ACB8] hover:text-white hover:bg-white/5 transition-colors duration-200 py-2 px-3 rounded-lg text-sm sm:text-base flex items-center justify-between"
                  >
                    Login
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleNavClick('signup')}
                    className="btn-primary w-full justify-center text-xs sm:text-sm py-2"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}    </nav>
  );
}
