import { useState } from 'react';
import { Eye, EyeOff, ArrowRight, User, Mail, Lock, Sparkles } from 'lucide-react';

interface SignupPageProps {
  onSignup: (email: string, password: string, name: string) => Promise<boolean>;
  onNavigate: (page: string) => void;
  onGuestLogin: () => void;
}

export default function SignupPage({ onSignup, onNavigate, onGuestLogin }: SignupPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const success = await onSignup(email, password, name);
      if (!success) {
        setError('Failed to create account');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070A12] flex items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
      {/* Background glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] rounded-full
                      bg-[#4F46E5]/5 blur-[150px] sm:blur-[200px] pointer-events-none" />

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#4F46E5] flex items-center justify-center">
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
        </div>

        {/* Card */}
        <div className="glass-card p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-light text-white text-center mb-2">
            Create your account
          </h1>
          <p className="text-[#A7ACB8] text-center text-sm sm:text-base mb-6 sm:mb-8">
            Start your career discovery journey
          </p>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs sm:text-sm text-[#A7ACB8] mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A7ACB8]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="input-glass pl-11 text-sm"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs sm:text-sm text-[#A7ACB8] mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A7ACB8]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-glass pl-11 text-sm"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs sm:text-sm text-[#A7ACB8] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A7ACB8]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-glass pl-11 pr-11 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A7ACB8] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs sm:text-sm text-[#A7ACB8] mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A7ACB8]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-glass pl-11 text-sm"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm my-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/[0.08]" />
            <span className="text-[#A7ACB8] text-xs sm:text-sm">or</span>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>

          {/* Guest Login */}
          <button
            onClick={onGuestLogin}
            className="btn-secondary w-full justify-center text-sm"
          >
            <User className="w-4 h-4" />
            Continue as Guest
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-[#A7ACB8] text-xs sm:text-sm mt-6">
          Already have an account?{' '}
          <button
            onClick={() => onNavigate('login')}
            className="text-[#4F46E5] hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
