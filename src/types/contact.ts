export interface PrequalificationQuestion {
  question: string;
  qualifyingResponse: boolean;
  nonQualifyingMessage: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;
