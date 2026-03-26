import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onStartAssessment: () => void;
  onLearnMore: () => void;
}

export default function HeroSection({ onStartAssessment, onLearnMore }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const orb = orbRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const cta = ctaRef.current;
    const image = imageRef.current;

    if (!section || !card || !orb || !headline || !subheadline || !cta || !image) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Orb entrance
      loadTl.fromTo(orb,
        { scale: 0.92, rotation: -8, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 0.55, duration: 0.9 },
        0
      );

      // Card entrance
      loadTl.fromTo(card,
        { y: 18, scale: 0.98, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.8 },
        0.1
      );

      // Headline words entrance
      const words = headline.querySelectorAll('.word');
      loadTl.fromTo(words,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.04 },
        0.2
      );

      // Subheadline + CTAs
      loadTl.fromTo([subheadline, cta],
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        0.4
      );

      // Image
      loadTl.fromTo(image,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6 },
        0.5
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=90%',
          pin: true,
          scrub: 0.3,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set(card, { y: 0, opacity: 1 });
            gsap.set(orb, { rotation: 0, scale: 1, opacity: 0.55 });
            gsap.set(image, { x: 0, opacity: 1 });
          }
        }
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(card,
        { y: 0, opacity: 1 },
        { y: '-22vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(orb,
        { rotation: 0, scale: 1, opacity: 0.55 },
        { rotation: 18, scale: 1.08, opacity: 0.2, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(image,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned gradient-mesh z-10 flex items-center justify-center"
    >
      {/* Orb Graphic */}
      <div
        ref={orbRef}
        className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 
                   w-[min(110vw,1400px)] aspect-square pointer-events-none opacity-0"
      >
        <div className="relative w-full h-full">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border border-[#4F46E5]/20 animate-pulse-glow" />
          {/* Middle ring */}
          <div className="absolute inset-[15%] rounded-full border border-[#4F46E5]/30" />
          {/* Inner glow */}
          <div className="absolute inset-[30%] rounded-full bg-gradient-radial from-[#4F46E5]/20 via-transparent to-transparent blur-2xl" />
          {/* Core */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                          w-32 h-32 rounded-full bg-[#4F46E5]/30 blur-xl" />
        </div>
      </div>

      {/* Main Card */}
      <div
        ref={cardRef}
        className="glass-card w-[min(86vw,1100px)] h-[min(52vh,520px)] 
                   absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2
                   flex overflow-hidden opacity-0"
      >
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center px-[6%] py-8">
          {/* Micro Label */}
          <div className="micro-label mb-4 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
            AI CAREER GUIDANCE
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-[clamp(36px,4vw,56px)] font-light text-white leading-tight mb-4"
          >
            <span className="word inline-block">Discover</span>{' '}
            <span className="word inline-block">Your</span>{' '}
            <span className="word inline-block text-[#4F46E5]">Future</span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="text-[#A7ACB8] text-base md:text-lg max-w-[44ch] mb-8 leading-relaxed opacity-0"
          >
            A two-step assessment that matches your strengths, interests, and academics 
            to real courses and careers—powered by AI.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex items-center gap-4 opacity-0">
            <button onClick={onStartAssessment} className="btn-primary">
              Start Assessment
              <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={onLearnMore} className="btn-ghost">
              Learn more
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div
          ref={imageRef}
          className="hidden md:flex w-[34%] max-w-[360px] items-center justify-center p-4 opacity-0"
        >
          <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden
                          shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=800&fit=crop"
              alt="Student planning future"
              className="w-full h-full object-cover grayscale brightness-90
                         hover:grayscale-[0.7] transition-all duration-500"
            />
            {/* Indigo overlay */}
            <div className="absolute inset-0 bg-[#4F46E5]/10 mix-blend-overlay" />
          </div>
        </div>
      </div>
    </section>
  );
}
