import React, { useEffect, useMemo, useReducer, useRef } from "react";
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react";

/**
 * R&D Tax Credit Assistant — Refactored
 *
 * Key improvements vs. original:
 * - useReducer for predictable state updates
 * - crypto.randomUUID() ids (w/ fallback)
 * - Safer timestamp handling (number) + Intl formatting
 * - Robust cleanup for typing timers to avoid memory leaks
 * - a11y: live region, labels, aria-busy, keyboard focus management
 * - Optional localStorage persistence via `persistKey`
 * - Stricter types for ConversationStage
 * - Small intent engine + utilities to reduce duplication
 */

// ==== Types ====

type ConversationStage =
  | "greeting"
  | "qualification"
  | "scheduling"
  | "contact"
  | "qualified";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: number; // epoch ms for serialization safety
  options?: string[];
}

interface UserInfo {
  name?: string;
  email?: string;
  company?: string;
  industry?: string;
  revenue?: string;
}

interface ChatState {
  isOpen: boolean;
  isMinimized: boolean;
  messages: Message[];
  currentInput: string;
  isTyping: boolean;
  conversationStage: ConversationStage;
  userInfo: UserInfo;
}

// ==== Constants ====

const KNOWLEDGE_BASE = {
  rdCredits: {
    what:
      "R&D tax credits are federal incentives that provide dollar-for-dollar tax reductions for businesses investing in research and development. They typically provide 6-8% credit on qualified expenses.",
    who:
      "Any business conducting qualifying research activities can claim R&D credits - from software companies to manufacturers to healthcare practices.",
    how: "We identify your qualifying activities, document them properly, and prepare IRS Form 6765 to claim your credits.",
    amount:
      "Most businesses save $30K-50K annually, with some larger operations saving $100K+. The exact amount depends on your qualified research expenses.",
  },
  services: {
    assessment:
      "We provide assessments to determine if your business qualifies for R&D tax credits and estimate your potential savings.",
    documentation:
      "Our CPA and EA team creates IRS-compliant documentation packages that protect you during audits.",
    ongoing:
      "We provide ongoing compliance management through our ROI Blueprint Platform with automated tracking and alerts.",
  },
  company: {
    about:
      "ROI Blueprint specializes exclusively in healthcare R&D tax credits. We've delivered over $2M in combined savings with 15+ years of healthcare experience.",
    team:
      "Our team includes licensed CPAs, Enrolled Agents, and healthcare professionals who understand your industry.",
    results:
      "We've helped 200+ practices save an average of $30K-50K annually through our proven methodology.",
  },
} as const;

const QUICK_RESPONSES = [
  "What are R&D tax credits?",
  "Do I qualify?",
  "How much can I save?",
  "What's the process?",
  "Schedule consultation",
  "Get assessment",
] as const;

// ==== Helpers ====

const now = () => Date.now();
const makeId = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(now()));
const fmtTime = (ts: number) =>
  new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(ts);

const delay = (min = 1000, max = 2000) => Math.floor(min + Math.random() * (max - min));

const normalize = (s: string) => s.trim().toLowerCase();

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

// ==== Reducer ====

type Action =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "TOGGLE_MIN" }
  | { type: "SET_INPUT"; value: string }
  | { type: "SET_TYPING"; value: boolean }
  | { type: "SET_STAGE"; value: ConversationStage }
  | { type: "ADD_MESSAGE"; value: Message }
  | { type: "UPDATE_USER"; value: Partial<UserInfo> }
  | { type: "RESET" }
  | { type: "SET_MESSAGES"; value: Message[] };

function reducer(state: ChatState, action: Action): ChatState {
  switch (action.type) {
    case "OPEN":
      return { ...state, isOpen: true };
    case "CLOSE":
      return { ...state, isOpen: false };
    case "TOGGLE_MIN":
      return { ...state, isMinimized: !state.isMinimized };
    case "SET_INPUT":
      return { ...state, currentInput: action.value };
    case "SET_TYPING":
      return { ...state, isTyping: action.value };
    case "SET_STAGE":
      return { ...state, conversationStage: action.value };
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.value] };
    case "UPDATE_USER":
      return { ...state, userInfo: { ...state.userInfo, ...action.value } };
    case "SET_MESSAGES":
      return { ...state, messages: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const initialState: ChatState = {
  isOpen: false,
  isMinimized: false,
  messages: [],
  currentInput: "",
  isTyping: false,
  conversationStage: "greeting",
  userInfo: {},
};

// ==== Component Props ====

interface ChatbotProps {
  persistKey?: string; // if provided, messages & basic state are persisted
  className?: string;
  title?: string;
}

export default function Chatbot({ persistKey, className, title = "R&D Tax Credit Assistant" }: ChatbotProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ==== Persistence (optional) ====
  useEffect(() => {
    if (!persistKey) return;
    try {
      const raw = localStorage.getItem(persistKey);
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<ChatState>;
      if (saved.messages) dispatch({ type: "SET_MESSAGES", value: saved.messages });
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persistKey]);

  useEffect(() => {
    if (!persistKey) return;
    try {
      localStorage.setItem(
        persistKey,
        JSON.stringify({ messages: state.messages })
      );
    } catch {}
  }, [state.messages, persistKey]);

  // ==== Initial greeting ====
  useEffect(() => {
    if (state.isOpen && state.messages.length === 0) {
      addBotMessage(
        "👋 Hi! I'm your R&D tax credit assistant. I can help you understand if your business qualifies for substantial tax savings. What would you like to know?",
        [...QUICK_RESPONSES]
      );
    }
    // Focus input when chat opens
    if (state.isOpen && !state.isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isOpen, state.isMinimized]);

  // ==== Auto-scroll ====
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.messages.length]);

  // Cleanup typing timer on unmount
  useEffect(() => () => {
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
  }, []);

  // ==== Memoized data ====
  const quickResponses = useMemo(() => [...QUICK_RESPONSES], []);

  // ==== Message helpers ====
  const addMessage = (text: string, isBot: boolean, options?: string[]) => {
    const msg: Message = {
      id: makeId(),
      text,
      isBot,
      timestamp: now(),
      options,
    };
    dispatch({ type: "ADD_MESSAGE", value: msg });
  };

  const addBotMessage = (text: string, options?: string[]) => {
    dispatch({ type: "SET_TYPING", value: true });
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      addMessage(text, true, options);
      dispatch({ type: "SET_TYPING", value: false });
    }, delay());
  };

  const handleQuickResponse = (response: string) => processUserMessage(response);

  // ==== Intent handling ====
  const processUserMessage = (message: string) => {
    const lower = normalize(message);
    addMessage(message, false);

    // Primary intents
    if (/(what).*(r&d|credit)/.test(lower)) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.rdCredits.what}\n\nWould you like to know if your business qualifies?`,
        ["Yes, check if I qualify", "How much can I save?", "What's your process?"]
      );
    }

    if (/(qualify|eligible)/.test(lower)) {
      dispatch({ type: "SET_STAGE", value: "qualification" });
      return addBotMessage(
        "Great question! Most businesses that develop products, improve processes, or solve technical challenges qualify. Let me ask a few quick questions:\n\nWhat industry is your business in?",
        ["Healthcare/Medical", "Software/Technology", "Manufacturing", "Other"]
      );
    }

    if (/(save|amount|how much)/.test(lower)) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.rdCredits.amount}\n\nTo give you a more accurate estimate, what's your approximate annual revenue?`,
        ["Under $1M", "$1M - $5M", "$5M - $20M", "Over $20M"]
      );
    }

    if (/(process|how.*work|how does.*work)/.test(lower)) {
      return addBotMessage(
        "Our process is simple:\n\n1️⃣ Assessment to identify qualifying activities\n2️⃣ Professional documentation by our CPA/EA team\n3️⃣ Ongoing compliance management\n4️⃣ File with your tax return\n\nWould you like to start with an assessment?",
        ["Yes, start assessment", "Tell me about your team", "What are the costs?"]
      );
    }

    if (/(schedule|consultation|meeting)/.test(lower)) {
      dispatch({ type: "SET_STAGE", value: "scheduling" });
      return addBotMessage(
        "Perfect! I'd love to connect you with our team. To schedule your consultation, I'll need a few details:\n\nWhat's your name?"
      );
    }

    if (/(assessment|evaluate)/.test(lower)) {
      dispatch({ type: "SET_STAGE", value: "contact" });
      return addBotMessage(
        "Excellent! Our assessment typically takes 15-20 minutes and can identify $30K-50K+ in potential savings.\n\nWhat's the best way to reach you - email or phone?",
        ["Email", "Phone", "Either works"]
      );
    }

    if (/(team|who\s*(are|is)?)/.test(lower)) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.company.team}\n\nWould you like to learn more about our results or start your assessment?`,
        ["See results", "Start assessment", "Schedule consultation"]
      );
    }

    if (/(cost|price|fee)/.test(lower)) {
      return addBotMessage(
        "Our pricing is performance-based - you only pay for results you actually claim. We use a flat monthly rate plus year-end true-up structure.\n\nThe assessment has no obligations. Would you like to get started?",
        ["Yes, start assessment", "Tell me more about pricing", "Schedule consultation"]
      );
    }

    // Stage-specific flows
    switch (state.conversationStage) {
      case "qualification":
        return handleQualificationFlow(message);
      case "scheduling":
        return handleSchedulingFlow(message);
      case "contact":
        return handleContactFlow(message);
      case "qualified":
        return handleQualifiedFlow(message);
      default:
        return addBotMessage(
          "I'd be happy to help you with that! Here are some things I can assist you with:",
          [...quickResponses]
        );
    }
  };

  const handleQualificationFlow = (message: string) => {
    const industry = message.trim();
    dispatch({ type: "UPDATE_USER", value: { industry } });

    const lower = normalize(message);
    if (lower.includes("yes, we do these activities")) {
      dispatch({ type: "SET_STAGE", value: "qualified" });
      return addBotMessage(
        "Excellent! Based on your responses, your business likely qualifies for significant R&D tax credits. \n\nTypical savings for businesses like yours range from $30K-50K annually. \n\nWould you like to get an assessment to see your exact potential?",
        ["Yes, get assessment", "How does the assessment work?", "What information do you need?"]
      );
    }

    if (lower.includes("not sure")) {
      return addBotMessage(
        "No problem! Let me help clarify. R&D activities include:\n\n• Creating new products or improving existing ones\n• Developing custom software or systems\n• Solving technical problems or challenges\n• Testing new processes or methodologies\n\nDoes any of this sound like work your business does?",
        ["Yes, that sounds like us", "Still not sure", "Tell me more examples"]
      );
    }

    return addBotMessage(
      `Great! ${industry} businesses often have excellent R&D opportunities. \n\nDo you spend time on any of these activities?\n• Developing new products/services\n• Improving existing processes\n• Solving technical challenges\n• Custom software development`,
      [
        "Yes, we do these activities",
        "Not sure",
        "Tell me more about qualifying activities",
      ]
    );
  };

  const handleSchedulingFlow = (message: string) => {
    const { name, email } = state.userInfo;
    if (!name) {
      dispatch({ type: "UPDATE_USER", value: { name: message.trim() } });
      return addBotMessage("Nice to meet you! What's your email address?");
    }
    if (!email) {
      const maybeEmail = message.trim();
      dispatch({ type: "UPDATE_USER", value: { email: maybeEmail } });
      if (!isEmail(maybeEmail)) {
        return addBotMessage(
          "Hmm, that doesn't look like a valid email. Could you double-check and resend?"
        );
      }
      return addBotMessage("Perfect! What's your company name?");
    }

    if (!state.userInfo.company) {
      dispatch({ type: "UPDATE_USER", value: { company: message.trim() } });
      return addBotMessage(
        `Thanks ${state.userInfo.name}! I've got your information. Our team will reach out within 24 hours to schedule your consultation.\n\nIn the meantime, would you like me to send you our R&D tax credit guide?`,
        ["Yes, send the guide", "No thanks", "I have other questions"]
      );
    }
  };

  const handleContactFlow = (_message: string) => {
    return addBotMessage(
      "Perfect! I'll make sure our team reaches out to you soon. \n\nTo complete your assessment request, please visit our contact page where you can provide additional details about your business.",
      ["Go to contact page", "I have more questions", "Thank you"]
    );
  };

  const handleQualifiedFlow = (message: string) => {
    const lower = normalize(message);
    if (lower.includes("yes, get") || lower.includes("assessment")) {
      dispatch({ type: "SET_STAGE", value: "scheduling" });
      return addBotMessage(
        "Perfect! Our assessment takes about 15-20 minutes and will identify your specific R&D opportunities.\n\nTo get started, I'll need your contact information. What's your name?"
      );
    }
    if (lower.includes("how does")) {
      return addBotMessage(
        "Our assessment process is simple:\n\n1️⃣ 15-minute phone call to discuss your activities\n2️⃣ We identify qualifying R&D expenses\n3️⃣ Calculate your potential credit amount\n4️⃣ Provide detailed savings estimate\n\nReady to get started?",
        ["Yes, let's start", "What information do you need?", "Schedule for later"]
      );
    }
    if (lower.includes("information")) {
      return addBotMessage(
        "We'll need basic information about:\n\n• Your business activities and projects\n• Approximate employee costs for R&D work\n• Any materials or supplies used\n• Software development or technical work\n\nDon't worry - we'll guide you through everything! Ready to begin?",
        ["Yes, I'm ready", "I need to gather information first", "Schedule consultation"]
      );
    }
  };

  // ==== UI Handlers ====
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const msg = state.currentInput.trim();
    if (!msg || state.isTyping) return;
    dispatch({ type: "SET_INPUT", value: "" });
    processUserMessage(msg);
    // Return focus to input for faster chatting
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const openChat = () => dispatch({ type: "OPEN" });
  const closeChat = () => dispatch({ type: "CLOSE" });
  const toggleMinimize = () => dispatch({ type: "TOGGLE_MIN" });

  // ==== Render ====
  if (!state.isOpen) {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className ?? ""}`}>
        <button
          onClick={openChat}
          className="bg-primary-500 hover:bg-primary-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
        <div className="absolute -top-2 -left-2 w-3 h-3 bg-success-500 rounded-full animate-ping" />
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className ?? ""}`}>
      <div
        className={`bg-white rounded-2xl shadow-2xl border border-neutral-200 transition-all duration-300 flex flex-col ${
          state.isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
        }`}
        role="dialog"
        aria-labelledby="chatbot-title"
        aria-describedby="chatbot-desc"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-t-2xl flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" aria-hidden />
            </div>
            <div>
              <h3 id="chatbot-title" className="font-semibold" style={{ color: "#e6fd47" }}>
                {title}
              </h3>
              <p id="chatbot-desc" className="text-xs text-primary-100">
                Online now
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMinimize}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label={state.isMinimized ? "Maximize" : "Minimize"}
            >
              {state.isMinimized ? (
                <Maximize2 className="w-4 h-4" aria-hidden />
              ) : (
                <Minimize2 className="w-4 h-4" aria-hidden />
              )}
            </button>
            <button
              onClick={closeChat}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" aria-hidden />
            </button>
          </div>
        </div>

        {!state.isMinimized && (
          <>
            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4"
              role="log"
              aria-live="polite"
              aria-relevant="additions"
              aria-busy={state.isTyping}
            >
              {state.messages.map((message) => (
                <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[80%] ${message.isBot ? "order-2" : "order-1"}`}>
                    <div className={`flex items-start gap-2 ${message.isBot ? "" : "flex-row-reverse"}`}>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.isBot ? "bg-primary-100 text-primary-600" : "bg-neutral-100 text-neutral-600"
                        }`}
                        aria-hidden
                      >
                        {message.isBot ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                      </div>
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          message.isBot ? "bg-neutral-100 text-neutral-800" : "bg-primary-500 text-white"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        {message.options && (
                          <div className="mt-3 space-y-2">
                            {message.options.map((option, index) => (
                              <button
                                key={index}
                                onClick={() => handleQuickResponse(option)}
                                className="block w-full text-left px-3 py-2 text-xs bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className={`text-xs text-neutral-500 mt-1 ${message.isBot ? "ml-8" : "mr-8 text-right"}`}>
                      {fmtTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {state.isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center" aria-hidden>
                      <Bot className="w-3 h-3" />
                    </div>
                    <div className="bg-neutral-100 rounded-2xl px-4 py-2" aria-live="polite">
                      <div className="flex space-x-1" aria-label="Assistant is typing">
                        <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                        <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-neutral-200 bg-white flex-shrink-0">
              <form onSubmit={onSubmit} className="flex gap-2">
                <label htmlFor="chatbot-input" className="sr-only">
                  Type your message
                </label>
                <input
                  ref={inputRef}
                  id="chatbot-input"
                  type="text"
                  value={state.currentInput}
                  onChange={(e) => dispatch({ type: "SET_INPUT", value: e.target.value })}
                  placeholder={state.isTyping ? "Assistant is typing..." : "Type your message..."}
                  className="flex-1 px-4 py-3 border-2 border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm disabled:bg-neutral-50 disabled:text-neutral-400"
                  disabled={state.isTyping}
                  autoComplete="off"
                  aria-disabled={state.isTyping}
                />
                <button
                  type="submit"
                  disabled={!state.currentInput.trim() || state.isTyping}
                  className="px-4 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" aria-hidden />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}