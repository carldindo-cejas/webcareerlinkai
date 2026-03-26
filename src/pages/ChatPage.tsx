import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Lightbulb } from 'lucide-react';
import type { ChatMessage } from '@/types';

interface ChatPageProps {
  userName: string;
  riasecProfile?: string;
}

const SUGGESTED_QUESTIONS = [
  "What does my RIASEC profile mean?",
  "Compare my top 2 course recommendations",
  "What careers can I pursue with BS Psychology?",
  "How do I prepare for my chosen course?",
  "What scholarships are available?",
];

export default function ChatPage({ userName, riasecProfile }: ChatPageProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello ${userName}! I'm Aptiva, your AI career assistant. I can help you understand your assessment results, compare courses, and answer questions about your career path. What would you like to know?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI response generation
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const lowerMsg = userMessage.toLowerCase();

    // Context-aware responses
    if (lowerMsg.includes('riasec') || lowerMsg.includes('profile')) {
      return riasecProfile 
        ? `Based on your ${riasecProfile} profile, you have a unique combination of interests. Your dominant type suggests you enjoy ${getProfileDescription(riasecProfile)}. This profile aligns well with courses that require both analytical thinking and creative problem-solving.`
        : 'Your RIASEC profile is based on Holland\'s theory of career choice. It measures six personality types: Realistic, Investigative, Artistic, Social, Enterprising, and Conventional. Would you like to take the assessment to discover your profile?';
    }

    if (lowerMsg.includes('compare') || lowerMsg.includes('difference')) {
      return 'When comparing courses, consider these factors:\n\n1. **Curriculum** - What subjects will you study?\n2. **Career outcomes** - What jobs can you get?\n3. **Your strengths** - Which aligns with your skills?\n4. **Market demand** - Which has better job prospects?\n\nWould you like me to compare specific courses from your recommendations?';
    }

    if (lowerMsg.includes('prepare') || lowerMsg.includes('ready')) {
      return 'To prepare for your chosen course:\n\n1. **Strengthen fundamentals** - Review core subjects\n2. **Read introductory materials** - Get familiar with the field\n3. **Connect with students** - Join online communities\n4. **Explore related content** - Watch videos, read articles\n5. **Set clear goals** - Know what you want to achieve\n\nWhich course are you planning to take? I can give more specific advice.';
    }

    if (lowerMsg.includes('career') || lowerMsg.includes('job')) {
      return 'Career planning is an exciting journey! Based on your profile, I recommend:\n\n1. **Research thoroughly** - Learn about day-to-day responsibilities\n2. **Talk to professionals** - Informational interviews are valuable\n3. **Consider internships** - Gain real-world experience\n4. **Build a network** - Connect with people in your field\n5. **Stay flexible** - Be open to related opportunities\n\nWhat specific career are you curious about?';
    }

    if (lowerMsg.includes('scholarship') || lowerMsg.includes('financial')) {
      return 'There are several scholarship options for Filipino students:\n\n1. **CHED Scholarships** - Government-funded programs\n2. **Private foundations** - Ayala, SM, Megaworld foundations\n3. **School-based scholarships** - Academic and athletic\n4. **Corporate scholarships** - Company-sponsored programs\n5. **International scholarships** - Study abroad opportunities\n\nI recommend checking with your target schools for specific scholarship programs they offer.';
    }

    // Default response
    return `That's a great question! As your career assistant, I'm here to help you navigate your educational and career journey. 

Based on your assessment results, I can provide personalized guidance on:\n- Understanding your strengths and interests\n- Exploring suitable courses and careers\n- Comparing different options\n- Planning your academic path\n
Could you tell me more about what specific aspect you'd like to explore? Or feel free to ask about any of your recommended courses!`;
  };

  const getProfileDescription = (profile: string): string => {
    const descriptions: Record<string, string> = {
      'R': 'hands-on work with tools, machines, and practical problems',
      'I': 'research, analysis, and solving complex problems',
      'A': 'creative expression and original thinking',
      'S': 'helping others and working with people',
      'E': 'leadership, persuasion, and business ventures',
      'C': 'organization, data, and systematic work',
    };
    return descriptions[profile[0]] || 'a variety of interesting activities';
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const response = await generateResponse(userMessage.content);

    const aiMessage: ChatMessage = {
      id: `ai_${Date.now()}`,
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="min-h-screen bg-[#070A12] pt-20 pb-6 px-6 flex flex-col">
      {/* Background glow */}
      <div className="fixed bottom-1/4 right-1/4
                      w-[400px] h-[400px] rounded-full
                      bg-[#4F46E5]/5 blur-[200px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#4F46E5]/10 flex items-center justify-center">
            <Bot className="w-6 h-6 text-[#4F46E5]" />
          </div>
          <div>
            <h1 className="text-xl font-medium text-white">Aptiva</h1>
            <p className="text-sm text-[#A7ACB8]">Your AI Career Assistant</p>
          </div>
        </div>

        {/* Chat Container */}
        <div className="glass-card glass-card-md flex-1 flex flex-col overflow-hidden min-h-[500px]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                                ${message.role === 'user' 
                                  ? 'bg-[#4F46E5]' 
                                  : 'bg-[#4F46E5]/20'}`}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-[#4F46E5]" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line
                              ${message.role === 'user'
                                ? 'bg-[#4F46E5] text-white rounded-br-md'
                                : 'bg-white/[0.05] text-[#F3F5FF] border border-white/[0.08] rounded-bl-md'
                              }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#4F46E5]/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#4F46E5]" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white/[0.05] border border-white/[0.08] rounded-bl-md">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#4F46E5] animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-[#4F46E5] animate-bounce animation-delay-100" />
                    <div className="w-2 h-2 rounded-full bg-[#4F46E5] animate-bounce animation-delay-200" />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length < 3 && (
            <div className="px-6 pb-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-[#4F46E5]" />
                <span className="text-xs text-[#A7ACB8]">Suggested questions</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08]
                               text-xs text-[#A7ACB8] hover:bg-white/[0.08] hover:text-white
                               transition-colors text-left"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-white/[0.06]">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Aptiva anything..."
                className="flex-1 input-glass"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="btn-primary px-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
