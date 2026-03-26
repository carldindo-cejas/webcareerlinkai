import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, UserCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface JourneySectionProps {
  onCreateProfile: () => void;
}

export default function JourneySection({ onCreateProfile }: JourneySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const textBlock = textBlockRef.current;
    const thumb = thumbRef.current;

    if (!section || !card || !textBlock || !thumb) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=90%',
          pin: true,
          scrub: 0.3,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(card,
        { x: '-60vw', rotateY: 18, opacity: 0 },
        { x: 0, rotateY: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(textBlock,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(thumb,
        { y: '12vh', scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'power2.out' },
        0.1
      );

      // SETTLE (30% - 70%) - hold positions

      // EXIT (70% - 100%)
      scrollTl.fromTo(card,
        { x: 0, y: 0, rotateY: 0, opacity: 1 },
        { x: '-18vw', y: '10vh', rotateY: -10, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(textBlock,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(thumb,
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned gradient-mesh-alt z-20"
    >
      {/* Left Card */}
      <div
        ref={cardRef}
        className="glass-card absolute top-1/2 -translate-y-1/2
                   left-[5vw] w-[90vw] md:left-[7vw] md:w-[44vw]
                   max-w-[560px] h-[62vh] max-h-[640px]
                   overflow-hidden opacity-0"
        style={{ perspective: '1000px' }}
      >
        <div className="relative w-full h-full">
          {/* Main Image */}
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=1000&fit=crop"
            alt="Student workspace"
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-75"
          />
          <div className="absolute inset-0 bg-[#4F46E5]/10 mix-blend-overlay" />
          
          {/* Caption Thumbnail */}
          <div
            ref={thumbRef}
            className="absolute right-[6%] bottom-[8%] w-[38%] aspect-[16/10]
                       rounded-xl overflow-hidden border border-white/[0.08]
                       shadow-2xl opacity-0"
          >
            <img
              src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=250&fit=crop"
              alt="Student typing"
              className="w-full h-full object-cover grayscale brightness-80"
            />
            <div className="absolute inset-0 bg-[#4F46E5]/10 mix-blend-overlay" />
          </div>
        </div>
      </div>

      {/* Right Text Block */}
      <div
        ref={textBlockRef}
        className="absolute top-1/2 -translate-y-1/2
                   left-[5vw] w-[90vw] md:left-[58vw] md:w-[34vw]
                   max-w-[460px] opacity-0"
      >
        <div className="micro-label mb-4 flex items-center gap-2">
          <UserCircle className="w-3.5 h-3.5 text-[#4F46E5]" />
          ONBOARDING
        </div>
        
        <h2 className="text-[clamp(32px,3.2vw,48px)] font-light text-white mb-6">
          Start Your <span className="text-[#4F46E5]">Journey</span>
        </h2>
        
        <p className="text-[#A7ACB8] text-base md:text-lg leading-relaxed mb-8">
          Create your profile in minutes. Add your academic track and grades so 
          recommendations are built around what you can actually pursue.
        </p>
        
        <button onClick={onCreateProfile} className="btn-ghost group">
          Create a profile
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
