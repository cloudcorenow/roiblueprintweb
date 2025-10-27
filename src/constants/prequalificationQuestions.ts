import { PrequalificationQuestion } from "../types/contact";

export const prequalificationQuestions: PrequalificationQuestion[] = [
  {
    question: "Is your practice a US-based taxable entity (not foreign or non-profit)?",
    qualifyingResponse: true,
    nonQualifyingMessage:
      "Thank you for your interest. Our ROI Blueprint™ program is designed specifically for US-based taxable entities. We'd be happy to direct you to our ROI Roadmap with resources that may be more applicable to your situation.",
  },
  {
    question: "Are you the decision-maker for strategic investments and operational improvements?",
    qualifyingResponse: true,
    nonQualifyingMessage:
      "Thank you for your time. Since strategic decisions require input from your partners/board, we'd like to direct you to our ROI Roadmap where you can gather information to present to your decision-makers.",
  },
  {
    question: "Does your practice have $1M+ annual revenue with at least $500K in combined staff wages and operational expenses?",
    qualifyingResponse: true,
    nonQualifyingMessage:
      "Thank you for exploring this opportunity. While your current revenue and expense levels are below our typical threshold, we'd like to direct you to our ROI Roadmap which includes strategies for building optimization foundations as you grow.",
  },
  {
    question:
      "Does your practice regularly develop clinical protocols, implement technology systems, create training programs, or improve operational processes?",
    qualifyingResponse: true,
    nonQualifyingMessage:
      "Thank you for your interest. Many practices don't realize that common activities like staff training development, process improvements, or technology implementations can qualify for substantial benefits. Please check out our ROI Roadmap to learn more about potential opportunities in your practice.",
  },
  {
    question:
      "Are you interested in systematically optimizing your practice operations in ways that could generate measurable financial benefits?",
    qualifyingResponse: true,
    nonQualifyingMessage:
      "Thank you for your time. Our ROI Roadmap includes information about systematic optimization approaches that might align better with your current business philosophy.",
  },
  {
    question: "Are you looking to implement operational improvements within the next 90 days?",
    qualifyingResponse: true,
    nonQualifyingMessage:
      "Thank you for considering our program. Our assessment process is designed for practices ready to implement improvements within 90 days. Please check out our ROI Roadmap for information you can review when you're ready to move forward.",
  },
];
