import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AptivaSectionProps {
  onOpenChat: () => void;
  onLearnMore: () => void;
}

export default function AptivaSection({ onOpenChat, onLearnMore }: AptivaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textBlock = textBlockRef.current;
    const card = cardRef.current;
    const bubbles = bubblesRef.current;

    if (!section || !textBlock || !card || !bubbles) return;

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

      // Message bubbles stagger
      const bubbleElements = bubbles.querySelectorAll('.message-bubble');
      scrollTl.fromTo(bubbleElements,
        { y: '10vh', scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, stagger: 0.05, ease: 'power2.out' },
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

      scrollTl.fromTo(bubbleElements,
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, stagger: 0.03, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned gradient-mesh-alt z-[80]"
    >
      {/* Left Text Block */}
      <div
        ref={textBlockRef}
        className="absolute top-1/2 -translate-y-1/2
                   left-[5vw] w-[90vw] md:left-[7vw] md:w-[36vw]
                   max-w-[480px] opacity-0"
      >
        <div className="micro-label mb-4 flex items-center gap-2">
          <Bot className="w-3.5 h-3.5 text-[#4F46E5]" />
          APTIVA AI
        </div>
        
        <h2 className="text-[clamp(32px,3.2vw,48px)] font-light text-white mb-6">
          Meet <span className="text-[#4F46E5]">Aptiva</span>
        </h2>
        
        <p className="text-[#A7ACB8] text-base md:text-lg leading-relaxed mb-8">
          Your personal career assistant. Ask about courses, careers, and 
          planning—anytime.
        </p>
        
        <div className="flex items-center gap-4">
          <button onClick={onOpenChat} className="btn-primary">
            <MessageCircle className="w-4 h-4" />
            Open Chat
          </button>
          <button onClick={onLearnMore} className="btn-ghost">
            Learn more
          </button>
        </div>
      </div>

      {/* Right Chat Card */}
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
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=1000&fit=crop"
            alt="Student studying"
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-75"
          />
          <div className="absolute inset-0 bg-[#4F46E5]/10 mix-blend-overlay" />
          
          {/* Chat UI Header Line */}
          <div className="absolute top-0 inset-x-0 h-px bg-white/[0.12]" />
          
          {/* Message Bubbles */}
          <div
            ref={bubblesRef}
            className="absolute left-[7%] bottom-[10%] flex flex-col gap-3 w-[86%]"
          >
            {/* User Message */}
            <div className="message-bubble self-end max-w-[85%]
                            px-4 py-3 rounded-2xl rounded-br-md
                            bg-[#4F46E5] text-white text-sm opacity-0">
              What courses fit an Investigative–Social profile?
            </div>
            
            {/* AI Response */}
            <div className="message-bubble self-start max-w-[90%]
                            px-4 py-3 rounded-2xl rounded-bl-md
                            bg-white/[0.1] backdrop-blur-md
                            border border-white/[0.12] text-white/90 text-sm opacity-0">
              Here are top matches: BS Psychology, BS Nursing, BS Biology…
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
