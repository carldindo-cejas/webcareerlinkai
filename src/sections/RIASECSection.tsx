import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ClipboardList } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface RIASECSectionProps {
  onPreviewQuestions: () => void;
}

const RIASEC_CHIPS = ['R', 'I', 'A', 'S', 'E', 'C'];

export default function RIASECSection({ onPreviewQuestions }: RIASECSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textBlock = textBlockRef.current;
    const card = cardRef.current;
    const chips = chipsRef.current;

    if (!section || !textBlock || !card || !chips) return;

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
      scrollTl.fromTo(textBlock,
        { x: '-45vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(card,
        { x: '55vw', rotateY: -16, opacity: 0 },
        { x: 0, rotateY: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      // Chips stagger
      const chipElements = chips.querySelectorAll('.riasec-chip');
      scrollTl.fromTo(chipElements,
        { y: '8vh', scale: 0.9, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, stagger: 0.02, ease: 'power2.out' },
        0.12
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(textBlock,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(card,
        { x: 0, y: 0, rotateY: 0, opacity: 1 },
        { x: '18vw', y: '10vh', rotateY: 12, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(chipElements,
        { y: 0, opacity: 1 },
        { y: '6vh', opacity: 0, stagger: 0.01, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned gradient-mesh z-30"
    >
      {/* Left Text Block */}
      <div
        ref={textBlockRef}
        className="absolute left-[7vw] top-1/2 -translate-y-1/2
                   w-[36vw] max-w-[480px] opacity-0"
      >
        <div className="micro-label mb-4 flex items-center gap-2">
          <ClipboardList className="w-3.5 h-3.5 text-[#4F46E5]" />
          ASSESSMENT
        </div>
        
        <h2 className="text-[clamp(32px,3.2vw,48px)] font-light text-white mb-6">
          RIASEC <span className="text-[#4F46E5]">Assessment</span>
        </h2>
        
        <p className="text-[#A7ACB8] text-base md:text-lg leading-relaxed mb-8">
          A 48-question evaluation based on Holland&apos;s theory. We map your 
          personality to real academic and career pathways.
        </p>
        
        <button onClick={onPreviewQuestions} className="btn-ghost group">
          Preview the questions
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Right Card */}
      <div
        ref={cardRef}
        className="glass-card absolute left-[52vw] top-1/2 -translate-y-1/2
                   w-[42vw] max-w-[580px] h-[62vh] max-h-[640px]
                   overflow-hidden opacity-0"
        style={{ perspective: '1000px' }}
      >
        <div className="relative w-full h-full">
          {/* Main Image */}
          <img
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=1000&fit=crop"
            alt="Student taking assessment"
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-75"
          />
          <div className="absolute inset-0 bg-[#4F46E5]/10 mix-blend-overlay" />
          
          {/* RIASEC Chips */}
          <div
            ref={chipsRef}
            className="absolute left-[7%] bottom-[10%] flex flex-col gap-3"
          >
            <span className="text-xs text-white/60 mono uppercase tracking-wider">
              Your profile codes
            </span>
            <div className="flex gap-2">
              {RIASEC_CHIPS.map((chip, index) => (
                <div
                  key={chip}
                  className={`riasec-chip ${index > 2 ? 'riasec-chip-inactive' : ''} opacity-0`}
                >
                  {chip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
