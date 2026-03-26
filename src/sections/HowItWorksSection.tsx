import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UserCircle, ClipboardList, Lightbulb, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: '01',
    title: 'Create your profile',
    description: 'Add your strand and grades.',
    icon: UserCircle,
  },
  {
    number: '02',
    title: 'Take the assessment',
    description: 'RIASEC + follow-up questions.',
    icon: ClipboardList,
  },
  {
    number: '03',
    title: 'Get recommendations',
    description: 'Courses and careers ranked for you.',
    icon: Lightbulb,
  },
  {
    number: '04',
    title: 'Chat with Aptiva',
    description: 'Ask questions and plan your next move.',
    icon: MessageSquare,
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(header,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Cards stagger animation
      const cardElements = cards.querySelectorAll('.step-card');
      gsap.fromTo(cardElements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-flowing bg-[#070A12] relative z-[60] py-24"
    >
      {/* Subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]
                      bg-[#4F46E5]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <div className="micro-label mb-4">PROCESS</div>
          <h2 className="text-[clamp(32px,3.6vw,52px)] font-light text-white mb-4">
            How it <span className="text-[#4F46E5]">works</span>
          </h2>
          <p className="text-[#A7ACB8] text-lg max-w-md mx-auto">
            From assessment to action in four simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="step-card glass-card glass-card-md p-6 opacity-0
                         hover:bg-white/[0.05] transition-colors duration-300"
            >
              {/* Top highlight line */}
              <div className="absolute inset-x-0 top-0 h-px
                              bg-gradient-to-r from-transparent via-[#4F46E5]/50 to-transparent" />
              
              {/* Step Number */}
              <div className="mono text-2xl text-[#4F46E5] mb-4">{step.number}</div>
              
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-[#4F46E5]/10 
                              flex items-center justify-center mb-4">
                <step.icon className="w-5 h-5 text-[#4F46E5]" />
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-medium text-white mb-2">{step.title}</h3>
              <p className="text-sm text-[#A7ACB8] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
