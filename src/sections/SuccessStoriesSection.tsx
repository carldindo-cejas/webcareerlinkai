import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote: "I finally had a list of courses that made sense for me.",
    name: "Maria",
    strand: "STEM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    offset: 0,
  },
  {
    quote: "Aptiva helped me compare options without the pressure.",
    name: "Josh",
    strand: "HUMSS",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    offset: 6,
  },
  {
    quote: "The assessment matched what I love with what I'm good at.",
    name: "Lea",
    strand: "ABM",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    offset: 3,
  },
];

export default function SuccessStoriesSection() {
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
      const cardElements = cards.querySelectorAll('.testimonial-card');
      gsap.fromTo(cardElements,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
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
      className="section-flowing bg-[#070A12] relative z-[70] py-24"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <div className="micro-label mb-4">STORIES</div>
          <h2 className="text-[clamp(32px,3.6vw,52px)] font-light text-white mb-4">
            Success <span className="text-[#4F46E5]">Stories</span>
          </h2>
          <p className="text-[#A7ACB8] text-lg max-w-md mx-auto">
            Students who found clarity—and their next step.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.name}
              className="testimonial-card glass-card glass-card-md p-6 opacity-0"
              style={{ marginTop: `${testimonial.offset}vh` }}
            >
              {/* Quote Icon */}
              <div className="w-10 h-10 rounded-xl bg-[#4F46E5]/10 
                              flex items-center justify-center mb-6">
                <Quote className="w-5 h-5 text-[#4F46E5]" />
              </div>
              
              {/* Quote */}
              <p className="text-white text-lg leading-relaxed mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden
                                ring-2 ring-[#4F46E5]/30">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover grayscale brightness-90"
                  />
                </div>
                <div>
                  <div className="text-white font-medium">{testimonial.name}</div>
                  <div className="text-sm text-[#A7ACB8]">{testimonial.strand}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
