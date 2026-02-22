export type CandidateStatus = 'Top Match' | 'Strong' | 'Review' | 'Reject' | 'Pending' | 'Advanced' | 'Rejected' | 'Interviewing';

export interface InterviewEvent {
  candidateName: string;
  date: string;
  time: string;
}

export interface Candidate {
  name: string;
  role: string;
  score: number;
  summary: string;
  status: CandidateStatus;
  avatarUrl: string;
  breakdown: {
    'Experience': number;
    'Skills': number;
    'Education': number;
    'Keywords': number;
  };
}
