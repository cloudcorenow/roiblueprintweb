import React, { useEffect, useMemo, useReducer, useRef } from "react";
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  about: {
    whatIs:
      "ROI BLUEPRINT is a specialized consulting firm that helps healthcare practices improve operations through documented R&D activities while potentially qualifying for valuable tax benefits. Our systematic approach transforms practices through innovation and process optimization.",
    whoWeWorkWith:
      "We primarily work with healthcare practices including medical practices, ABA therapy centers, dental practices, and other healthcare service providers. We specialize in practices with 15-100+ employees looking to optimize operations and innovate their service delivery.",
    different:
      "Unlike traditional consultants, our services are structured as Qualified Research Expenditures (QRE) under IRS guidelines. This means your investment in operational improvements may generate its own tax benefits. Additionally, we don't just provide recommendations—we implement, document, and optimize alongside your team throughout the year.",
  },
  rdCredits: {
    what:
      "R&D tax credits are federal and state tax incentives designed to reward companies for investing in innovation and process improvement. These credits can significantly reduce your tax liability and, in some cases, provide cash refunds.",
    qualify:
      "Many healthcare practices qualify without realizing it. Activities like developing new treatment protocols, optimizing operational workflows, implementing new technologies, and improving patient care processes may all qualify as R&D. We help identify and document these activities according to IRS standards.",
    howMuch:
      "The amount varies based on qualifying activities, practice size, and state programs. Small practices (15-25 employees) might see $30,000-$50,000 in annual benefits, while larger practices (75-100 employees) could see $150,000-$250,000 or more. These figures include both operational improvements and potential tax benefits.",
    guaranteed:
      "Tax benefits vary based on qualifying R&D activities, state programs, and individual circumstances. We document R&D work according to IRS standards, but actual benefits depend on IRS approval. Innovation and operational improvements are the primary goals—potential tax benefits are a bonus.",
  },
  services: {
    methodology:
      "Our proprietary approach follows three phases: Research (Months 1-2) where we analyze operations and identify opportunities; Optimize (Months 2-10) where we implement and refine improvements; and Innovate (Months 10-12) where we deploy proven solutions and plan future initiatives. Throughout all phases, we document activities for potential R&D tax credit qualification.",
    engagement:
      "Our standard engagement is 12 months, which allows us to implement meaningful changes, measure results, and document activities properly. We believe sustainable transformation requires ongoing partnership, not just a one-time assessment.",
    implementation:
      "We work alongside your team to implement improvements, provide training, customize systems, and ensure smooth integration. We don't just hand you a report—we're there with you through testing, refinement, and deployment.",
    disruption:
      "Our approach is designed to enhance, not disrupt, your operations. We work within your existing workflows and make changes incrementally. Most implementations happen during strategic planning sessions and off-peak hours to minimize disruption.",
  },
  investment: {
    cost:
      "Investment varies based on practice size and complexity. Small practices (15-25 employees) typically invest $75,000-$100,000 annually, while larger practices (75-100 employees) invest $200,000-$300,000. This investment often generates returns through operational improvements and potential tax benefits.",
    payForItself:
      "Many clients see their investment offset through a combination of operational improvements and potential tax benefits. For example, up to 65% of our fees may qualify as QRE, potentially generating additional tax benefits. Combined with efficiency gains and revenue improvements, the service often becomes self-funding.",
    roi:
      "Beyond potential tax benefits, clients typically see improved operational efficiency, reduced administrative burden, enhanced patient/client satisfaction, better staff productivity, and increased revenue capacity. Many practices report 2-3x ROI when considering all benefits combined.",
    paymentPlans:
      "Yes, we structure engagements with flexible payment terms that align with your cash flow. Contact us to discuss options that work for your practice.",
  },
  gettingStarted: {
    rightForMe:
      "If you're looking to improve operations, facing administrative challenges, considering new technology implementations, or seeking to optimize workflows, we can likely help. Schedule a consultation to discuss your specific needs and goals.",
    consultation:
      "We'll discuss your practice operations, challenges, and goals. We'll explain how our methodology applies to your situation and outline potential opportunities for improvement and R&D documentation. There's no obligation, and the consultation is complimentary.",
    howQuickly:
      "Once we've completed our initial assessment and you've decided to move forward, we can typically begin within 2-4 weeks. We'll work with your schedule to ensure a smooth onboarding process.",
    information:
      "During our initial phase, we'll need access to operational documentation, financial systems, workflow processes, and key team members. We'll provide a detailed checklist during onboarding to make the process straightforward.",
  },
  workingTogether: {
    timeRequired:
      "We design our engagements to be efficient with your time. Expect monthly strategic planning sessions (2-4 hours), weekly email updates, and quarterly check-ins. We handle the heavy lifting of documentation and implementation.",
    training:
      "Yes, comprehensive training is included in all engagements. We provide video-based training for new systems, workflows, and processes to ensure your team can sustain improvements long-term.",
    notSatisfied:
      "We're committed to your success. If at any point you're not seeing value, we'll work together to adjust our approach or part ways professionally. Most clients extend their engagements beyond the initial 12 months because they see consistent results.",
    allStates:
      "Yes, we work with practices nationwide. Our approach adapts to various state regulations and programs, and we're experienced in maximizing both federal and state-specific benefits.",
  },
} as const;

const QUICK_RESPONSES = [
  "What is ROI Blueprint?",
  "What are R&D tax credits?",
  "Do I qualify?",
  "How much can I save?",
  "What's your methodology?",
  "How much does it cost?",
  "Schedule consultation",
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

export default function Chatbot({ persistKey, className, title = "ROI Blueprint Assistant" }: ChatbotProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

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
        "👋 Hi! I'm your ROI BLUEPRINT assistant. I can help you understand how we help healthcare practices improve operations and potentially qualify for R&D tax credits. What would you like to know?",
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

  const handleQuickResponse = (response: string) => {
    if (response === "Go to contact page") {
      navigate("/contact");
      closeChat();
      return;
    }
    processUserMessage(response);
  };

  // ==== Intent handling ====
  const processUserMessage = (message: string) => {
    const lower = normalize(message);
    addMessage(message, false);

    // About ROI Blueprint
    if (/(what\s*(is|are)|about).*roi\s*blueprint/.test(lower) || lower === "what is roi blueprint?") {
      return addBotMessage(
        `${KNOWLEDGE_BASE.about.whatIs}\n\nWould you like to know more about who we work with or what makes us different?`,
        ["Who do you work with?", "What makes you different?", "Schedule consultation"]
      );
    }

    if (/(who.*work|clients|practices)/.test(lower)) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.about.whoWeWorkWith}\n\nWould you like to learn about our methodology or schedule a consultation?`,
        ["What's your methodology?", "Schedule consultation", "How much can I save?"]
      );
    }

    if (/(different|why\s*choose|makes\s*you)/.test(lower)) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.about.different}\n\nInterested in learning how this could work for your practice?`,
        ["Yes, tell me more", "What's the process?", "How much does it cost?"]
      );
    }

    // R&D Tax Credits
    if (/(what).*(r&d|credit|tax\s*credit)/.test(lower) || lower.includes("what are r&d")) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.rdCredits.what}\n\nWould you like to know if your practice qualifies?`,
        ["Do I qualify?", "How much can I save?", "Are they guaranteed?"]
      );
    }

    if (/(qualify|eligible|does\s*my\s*practice)/.test(lower) || lower.includes("do i qualify")) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.rdCredits.qualify}\n\nMany healthcare practices have qualifying activities without realizing it. Would you like to explore if your practice qualifies?`,
        ["Yes, check if I qualify", "How much can I save?", "Schedule consultation"]
      );
    }

    if (/(save|amount|how much|savings)/.test(lower)) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.rdCredits.howMuch}\n\nWould you like to schedule a consultation to get a more specific estimate for your practice?`,
        ["Schedule consultation", "What's your methodology?", "Tell me about costs"]
      );
    }

    if (/(guaranteed|sure|certain|promise)/.test(lower)) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.rdCredits.guaranteed}\n\nWould you like to learn more about our process and methodology?`,
        ["What's your methodology?", "Schedule consultation", "Who do you work with?"]
      );
    }

    // Services & Process
    if (/(methodology|process|approach|how.*work)/.test(lower) || lower.includes("what's your methodology")) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.services.methodology}\n\nWould you like to know more about implementation or schedule a consultation?`,
        ["Tell me about implementation", "How long is engagement?", "Schedule consultation"]
      );
    }

    if (/(engagement|how\s*long|duration|timeline)/.test(lower)) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.services.engagement}\n\nWould you like to learn about the implementation process?`,
        ["What does implementation involve?", "Will this disrupt operations?", "Schedule consultation"]
      );
    }

    if (/(implementation|involve|what\s*happens)/.test(lower)) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.services.implementation}\n\nWould you like to know how this affects your daily operations?`,
        ["Will this disrupt operations?", "How much time required?", "Schedule consultation"]
      );
    }

    if (/(disrupt|disruption|operations|interfere)/.test(lower)) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.services.disruption}\n\nWould you like to discuss how we can work with your specific schedule?`,
        ["Schedule consultation", "How much time required?", "What's the ROI?"]
      );
    }

    // Investment & ROI
    if (/(cost|price|fee|invest|how much does)/.test(lower)) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.investment.cost}\n\nWould you like to know more about ROI and payment options?`,
        ["Can it pay for itself?", "What kind of ROI?", "Payment plans available?"]
      );
    }

    if (/(pay\s*for\s*itself|self-funding|offset|worth\s*it)/.test(lower)) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.investment.payForItself}\n\nWould you like to explore specific ROI for your practice?`,
        ["What kind of ROI?", "Schedule consultation", "Tell me more"]
      );
    }

    if (/(roi|return|benefit|value)/.test(lower) && /(expect|get|see)/.test(lower)) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.investment.roi}\n\nWould you like to schedule a consultation to discuss specific benefits for your practice?`,
        ["Schedule consultation", "How much does it cost?", "Tell me more"]
      );
    }

    if (/(payment|plan|terms|financing)/.test(lower)) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.investment.paymentPlans}\n\nWould you like to schedule a consultation to discuss payment options?`,
        ["Schedule consultation", "How much does it cost?", "What's the ROI?"]
      );
    }

    // Getting Started
    if (/(right\s*for\s*me|good\s*fit|should\s*i)/.test(lower)) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.gettingStarted.rightForMe}\n\nWould you like to schedule a complimentary consultation?`,
        ["Schedule consultation", "Tell me about consultation", "I have more questions"]
      );
    }

    if (/(schedule|consultation|meeting|talk\s*to)/.test(lower)) {
      dispatch({ type: "SET_STAGE", value: "scheduling" });
      return addBotMessage(
        "Perfect! I'd love to connect you with our team. To schedule your consultation, I'll need a few details:\n\nWhat's your name?"
      );
    }

    if (/(initial\s*consultation|first\s*meeting|what\s*happens)/.test(lower)) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.gettingStarted.consultation}\n\nWould you like to schedule your complimentary consultation now?`,
        ["Schedule consultation", "How quickly can we start?", "What information needed?"]
      );
    }

    if (/(how\s*quickly|how\s*soon|when\s*start|get\s*started)/.test(lower)) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.gettingStarted.howQuickly}\n\nReady to schedule your initial consultation?`,
        ["Schedule consultation", "What information needed?", "I have more questions"]
      );
    }

    if (/(information|documents|need\s*from|prepare)/.test(lower)) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.gettingStarted.information}\n\nWould you like to get started with a consultation?`,
        ["Schedule consultation", "How quickly can we start?", "I have more questions"]
      );
    }

    // Working Together
    if (/(time\s*require|time\s*commitment|how\s*much\s*time)/.test(lower)) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.workingTogether.timeRequired}\n\nWould you like to know more about training and support?`,
        ["Will you train staff?", "Schedule consultation", "What if not satisfied?"]
      );
    }

    if (/(train|training|teach|learn)/.test(lower)) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.workingTogether.training}\n\nWould you like to learn more about our engagement process?`,
        ["What's your methodology?", "Schedule consultation", "How much time required?"]
      );
    }

    if (/(not\s*satisfied|unhappy|guarantee|what\s*if)/.test(lower)) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.workingTogether.notSatisfied}\n\nWould you like to schedule a consultation to discuss how we ensure success?`,
        ["Schedule consultation", "Tell me more", "I have more questions"]
      );
    }

    if (/(all\s*states|nationwide|my\s*state|location)/.test(lower)) {
      return addBotMessage(
        `${KNOWLEDGE_BASE.workingTogether.allStates}\n\nReady to explore how we can help your practice?`,
        ["Schedule consultation", "Do I qualify?", "How much can I save?"]
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