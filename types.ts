
export interface Job {
  id: string;
  title: string;
  company: string;
  salary: string;
  type: string;
  logo: string;
  description: string;
  requirements: string[];
  color: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: string;
}

export enum AppState {
  LANDING = 'LANDING',
  UPLOADING = 'UPLOADING',
  ANALYZING = 'ANALYZING',
  SWIPING = 'SWIPING',
  MATCHED = 'MATCHED',
}
