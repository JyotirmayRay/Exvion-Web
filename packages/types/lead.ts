export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  projectType?: string;
  stage?: string;
  budget: string;
  timeline: string;
  description?: string;
  score: number;
  status: LeadStatus;
  source?: string;
  createdAt: Date;
  updatedAt: Date;
  answers: LeadAnswer[];
  notes: Note[];
}

export interface LeadAnswer {
  id: string;
  leadId: string;
  question: string;
  answer: string;
}

export interface Note {
  id: string;
  leadId: string;
  content: string;
  createdAt: Date;
}

export enum LeadStatus {
  NEW = 'NEW',
  QUALIFIED = 'QUALIFIED',
  CONTACTED = 'CONTACTED',
  CALL_BOOKED = 'CALL_BOOKED',
  PROPOSAL_SENT = 'PROPOSAL_SENT',
  CLOSED = 'CLOSED',
  REJECTED = 'REJECTED',
}
