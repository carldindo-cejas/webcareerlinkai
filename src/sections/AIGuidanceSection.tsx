import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AIGuidanceSectionProps {
  onTryChat: () => void;
}

export default function AIGuidanceSection({ onTryChat }: AIGuidanceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textBlock = textBlockRef.current;
    const card = cardRef.current;
    const bubble = bubbleRef.current;

    if (!section || !textBlock || !card || !bubble) return;

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

      scrollTl.fromTo(bubble,
        { y: '12vh', scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'power2.out' },
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

      scrollTl.fromTo(bubble,
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
      className="section-pinned gradient-mesh z-50"
    >
      {/* Left Text Block */}
      <div
        ref={textBlockRef}
        className="absolute top-1/2 -translate-y-1/2
                   left-[5vw] w-[90vw] md:left-[7vw] md:w-[36vw]
                   max-w-[480px] opacity-0"
      >
        <div className="micro-label mb-4 flex items-center gap-2">
          <MessageSquare className="w-3.5 h-3.5 text-[#4F46E5]" />
          AI GUIDANCE
        </div>
        
        <h2 className="text-[clamp(32px,3.2vw,48px)] font-light text-white mb-6">
          AI <span className="text-[#4F46E5]">Guidance</span>
        </h2>
        
        <p className="text-[#A7ACB8] text-base md:text-lg leading-relaxed mb-8">
          Ask anything. Compare courses, plan your path, and get honest, 
          personalized advice—like a counselor available 24/7.
        </p>
        
        <button onClick={onTryChat} className="btn-ghost group">
          Try the chat
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Right Card */}
      <div
        ref={cardRef}
        className="glass-card absolute top-1/2 -translate-y-1/2
                   left-[5vw] w-[90vw] md:left-[52vw] md:w-[42vw]
                   max-w-[580px] h-[62vh] max-h-[640px]
                   overflow-hidden opacity-0"
        style={{ perspective: '1000px' }}
      >
        <div className="relative w-full h-full">
          {/* Main Image */}
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=1000&fit=crop"
            alt="Student with laptop"
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-75"
          />
          <div className="absolute inset-0 bg-[#4F46E5]/10 mix-blend-overlay" />
          
          {/* Chat Bubble */}
          <div
            ref={bubbleRef}
            className="absolute left-[7%] bottom-[10%] w-[72%] min-h-[84px]
                       px-4 py-4 rounded-2xl rounded-bl-md
                       bg-white/[0.1] backdrop-blur-md
                       border border-white/[0.12] opacity-0"
          >
            <div className="absolute left-0 top-0 w-1 h-full bg-[#4F46E5] rounded-l-2xl" />
            <p className="text-sm text-white/90 leading-relaxed pl-3">
              &ldquo;I&apos;m interested in both design and coding—which path fits me best?&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
