import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, Trash2, Smartphone, ShieldCheck, Heart, AlertCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function MobiAIAdvisor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I am MobiAI, your direct advisor. Ask me anything about our devices—whether you need the ultimate camera, a high-capacity budget flagship, or direct advice on selecting the perfect phone!"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to show the latest replies
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (customPrompt?: string) => {
    const messageText = customPrompt || inputMessage;
    if (!messageText.trim()) return;

    if (!customPrompt) {
      setInputMessage('');
    }

    const newMessages = [...messages, { role: 'user', content: messageText } as Message];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/advisor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error('Advisor route connection error');
      }

      const result = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: result.text || 'No response returned' }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'I apologized, but I had trouble reaching our servers. Please check your network connection or try asking again.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hello! I am MobiAI, your direct advisor. Ask me anything about our devices—whether you need the ultimate camera, a high-capacity budget flagship, or direct advice on selecting the perfect phone!"
      }
    ]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickPrompts = [
    { label: "📸 Camera King", prompt: "Recommend a phone with the absolute best camera/photo performance." },
    { label: "💰 Budget Options", prompt: "What is your best budget model under ₹25,000?" },
    { label: "⚡ High Performance", prompt: "Recommend a high performance phone for multitasking and storage." },
    { label: "🤳 Selfie & Influence", prompt: "Which phone is ideal for selfie enthusiasts and content creators?" }
  ];

  return (
    <section id="ai-advisor" className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 border-t border-slate-100 dark:border-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-4 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 scroll-none" />
            <span>MobiSphere AI Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
            MobiAI Smart Device Advisor
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm sm:text-base font-medium">
            Not sure which device fits your life? Converse with our custom Gemini-guided assistant to match specs, budgets, and secure holds.
          </p>
        </div>

        {/* Advisor Module */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden flex flex-col h-[550px] relative">
          
          {/* Header Controls */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="p-2.5 bg-gradient-to-tr from-indigo-500 to-blue-600 rounded-xl text-white shadow-lg shadow-indigo-650/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Virtual Consultant</span>
                <span className="text-sm font-extrabold text-slate-805 dark:text-slate-105 flex items-center gap-1.5">
                  MobiAI Assistant
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-ping" />
                </span>
              </div>
            </div>

            <button
              onClick={clearChat}
              className="p-2 bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-slate-400 hover:text-rose-500 border border-slate-200 dark:border-slate-700 hover:border-rose-200 rounded-xl transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
              title="Clear discussion"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear Chat</span>
            </button>
          </div>

          {/* Quick-reply Suggestion tags */}
          <div className="px-4 py-3 bg-slate-100/50 dark:bg-slate-900/30 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider shrink-0 select-none mr-1">Quick advice:</span>
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q.prompt)}
                disabled={isLoading}
                className="bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-750 rounded-full px-3.5 py-1 text-xs font-semibold cursor-pointer shrink-0 transition-all shadow-sm flex items-center gap-1"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Chat scrolling board */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-50/40 dark:bg-slate-950/10">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar Icon */}
                <div className={`p-2 rounded-xl shrink-0 h-9 w-9 flex items-center justify-center ${
                  m.role === 'user' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-slate-150 dark:bg-slate-800 text-indigo-500 border border-slate-200/60 dark:border-slate-700/60'
                }`}>
                  {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Bubble Container */}
                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-105 dark:border-slate-705 shadow-sm'
                }`}>
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
              </div>
            ))}

            {/* Simulated typist bubble */}
            {isLoading && (
              <div className="flex gap-3 max-w-[85%] mr-auto">
                <div className="p-2 rounded-xl shrink-0 h-9 w-9 flex items-center justify-center bg-slate-150 dark:bg-slate-800 text-indigo-505 border border-slate-202/60 dark:border-slate-702/60">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-202 rounded-2xl rounded-tl-none border border-slate-105 dark:border-slate-705 shadow-sm flex items-center space-x-1.5 py-3 px-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-bounce" />
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Chat input pad */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-stretch gap-2 shrink-0">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
              placeholder="Ask MobiAI... (e.g. recommend a flagship screen under ₹50,000)"
              className="flex-1 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-800 dark:text-white rounded-xl px-4 py-3 text-xs sm:text-sm outline-none transition-all placeholder:text-slate-400"
            />
            
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputMessage.trim()}
              className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-100 dark:disabled:bg-slate-800/40 text-white disabled:text-slate-400 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center cursor-pointer select-none"
              title="Transmit query"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Assistant Policy Credentials tag */}
          <div className="py-2.5 border-t border-slate-100 dark:border-slate-850 bg-slate-50/80 dark:bg-slate-900/30 text-[10px] text-slate-400 dark:text-slate-500 font-medium px-6 text-center select-none shrink-0 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
            <span>MobiAI adheres to strict user policy guidelines for device catalog matches.</span>
          </div>

        </div>

      </div>
    </section>
  );
}
