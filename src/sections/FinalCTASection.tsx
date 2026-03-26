import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FinalCTASectionProps {
  onGetStarted: () => void;
}

export default function FinalCTASection({ onGetStarted }: FinalCTASectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const glow = glowRef.current;

    if (!section || !card || !glow) return;

    const ctx = gsap.context(() => {
      // Card entrance animation
      gsap.fromTo(card,
        { y: 40, scale: 0.98, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Glow scale animation
      gsap.fromTo(glow,
        { scale: 0.95 },
        {
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-flowing bg-[#0B0E1F] relative z-[90] py-24"
    >
      {/* Radial Glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[600px] h-[600px] rounded-full
                   bg-[#4F46E5]/10 blur-[150px] pointer-events-none"
      />

      <div className="max-w-[720px] mx-auto px-6 relative">
        {/* CTA Card */}
        <div
          ref={cardRef}
          className="glass-card p-10 md:p-14 text-center opacity-0"
        >
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-[#4F46E5]/10 
                          flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-7 h-7 text-[#4F46E5]" />
          </div>
          
          {/* Headline */}
          <h2 className="text-[clamp(28px,3vw,44px)] font-light text-white mb-4">
            Ready to find your <span className="text-[#4F46E5]">path</span>?
          </h2>
          
          {/* Subheadline */}
          <p className="text-[#A7ACB8] text-lg mb-8 max-w-md mx-auto">
            Take the assessment and talk to Aptiva—free.
          </p>
          
          {/* CTA Button */}
          <button onClick={onGetStarted} className="btn-primary text-base px-8 py-4">
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
          
          {/* Footer microcopy */}
          <p className="text-[#A7ACB8]/60 text-sm mt-6">
            No account required to preview.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-[1200px] mx-auto px-6 mt-20 pt-10 border-t border-white/[0.06]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#4F46E5] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-medium">CareerLinkAI</span>
          </div>
          
          {/* Links */}
          <div className="flex items-center gap-6">
            <a href="#" className="nav-link text-sm">Privacy</a>
            <a href="#" className="nav-link text-sm">Terms</a>
            <a href="#" className="nav-link text-sm">Contact</a>
          </div>
          
          {/* Copyright */}
          <p className="text-[#A7ACB8]/50 text-sm">
            © 2024 CareerLinkAI. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
