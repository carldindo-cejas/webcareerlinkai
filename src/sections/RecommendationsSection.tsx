import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Lightbulb, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface RecommendationsSectionProps {
  onSeeExample: () => void;
}

const EXAMPLE_COURSES = [
  { name: 'BS Computer Science', icon: '💻' },
  { name: 'BS Psychology', icon: '🧠' },
  { name: 'BS Architecture', icon: '🏗️' },
];

export default function RecommendationsSection({ onSeeExample }: RecommendationsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const textBlock = textBlockRef.current;
    const list = listRef.current;

    if (!section || !card || !textBlock || !list) return;

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

      // List items stagger
      const listItems = list.querySelectorAll('.course-item');
      scrollTl.fromTo(listItems,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, ease: 'power2.out' },
        0.12
      );

      // SETTLE (30% - 70%) - hold

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

      scrollTl.fromTo(listItems,
        { y: 0, opacity: 1 },
        { y: '6vh', opacity: 0, stagger: 0.02, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned gradient-mesh-alt z-40"
    >
      {/* Left Card */}
      <div
        ref={cardRef}
        className="glass-card absolute top-1/2 -translate-y-1/2
                   left-[5vw] w-[90vw] md:left-[7vw] md:w-[44vw]
                   max-w-[580px] h-[62vh] max-h-[640px]
                   overflow-hidden opacity-0"
        style={{ perspective: '1000px' }}
      >
        <div className="relative w-full h-full">
          {/* Main Image */}
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop"
            alt="Student with laptop"
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-75"
          />
          <div className="absolute inset-0 bg-[#4F46E5]/10 mix-blend-overlay" />
          
          {/* Course List */}
          <div
            ref={listRef}
            className="absolute left-[7%] bottom-[10%] flex flex-col gap-3"
          >
            <span className="text-xs text-white/60 mono uppercase tracking-wider mb-1">
              Top recommendations
            </span>
            {EXAMPLE_COURSES.map((course) => (
              <div
                key={course.name}
                className="course-item flex items-center gap-3 px-4 py-2.5
                           bg-white/[0.08] backdrop-blur-sm rounded-xl
                           border border-white/[0.08] opacity-0"
              >
                <div className="w-8 h-8 rounded-full bg-[#4F46E5]/20 
                                flex items-center justify-center text-sm">
                  <GraduationCap className="w-4 h-4 text-[#4F46E5]" />
                </div>
                <span className="text-sm text-white font-medium">{course.name}</span>
              </div>
            ))}
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
          <Lightbulb className="w-3.5 h-3.5 text-[#4F46E5]" />
          RECOMMENDATIONS
        </div>
        
        <h2 className="text-[clamp(32px,3.2vw,48px)] font-light text-white mb-6">
          Smart <span className="text-[#4F46E5]">Recommendations</span>
        </h2>
        
        <p className="text-[#A7ACB8] text-base md:text-lg leading-relaxed mb-8">
          Get a ranked list of courses and careers with clear reasons—tailored 
          to your profile, grades, and strand.
        </p>
        
        <button onClick={onSeeExample} className="btn-ghost group">
          See example results
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
