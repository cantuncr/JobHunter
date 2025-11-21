
import { create } from 'zustand';
import { AppState, Job, UserProfile } from '../types';
import { ALL_JOBS, MOCK_USER } from '../constants';

interface AppStore {
  currentState: AppState;
  tokens: number;
  jobs: Job[];
  currentJobIndex: number;
  likedJobs: Job[];
  rejectedJobs: Job[];
  userProfile: UserProfile;
  
  // Actions
  setAppState: (state: AppState) => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  initializeDeck: () => void;
  decrementToken: () => void;
  swipeRight: () => void;
  swipeLeft: () => void;
  superLike: () => void;
}

export const useStore = create<AppStore>((set, get) => ({
  currentState: AppState.LANDING,
  tokens: 5,
  jobs: [],
  currentJobIndex: 0,
  likedJobs: [],
  rejectedJobs: [],
  userProfile: MOCK_USER,

  setAppState: (state) => set({ currentState: state }),
  
  updateUserProfile: (data) => set((state) => ({
    userProfile: { ...state.userProfile, ...data }
  })),

  initializeDeck: () => {
    // Shuffle ALL_JOBS and take first 20
    const shuffled = [...ALL_JOBS].sort(() => 0.5 - Math.random());
    set({ 
      jobs: shuffled.slice(0, 20),
      currentJobIndex: 0,
      likedJobs: [],
      rejectedJobs: []
    });
  },
  
  decrementToken: () => set((state) => ({ tokens: Math.max(0, state.tokens - 1) })),
  
  swipeRight: () => {
    const { jobs, currentJobIndex, likedJobs } = get();
    if (currentJobIndex < jobs.length) {
      set({
        likedJobs: [...likedJobs, jobs[currentJobIndex]],
        currentJobIndex: currentJobIndex + 1
      });
    }
  },
  
  swipeLeft: () => {
    const { jobs, currentJobIndex, rejectedJobs } = get();
    if (currentJobIndex < jobs.length) {
      set({
        rejectedJobs: [...rejectedJobs, jobs[currentJobIndex]],
        currentJobIndex: currentJobIndex + 1
      });
    }
  },
  
  superLike: () => {
     const { jobs, currentJobIndex, likedJobs, tokens } = get();
     // Check token count before action (safety measure, though UI handles it too)
     if (tokens > 0 && currentJobIndex < jobs.length) {
        set({
            likedJobs: [...likedJobs, jobs[currentJobIndex]],
            currentJobIndex: currentJobIndex + 1,
            tokens: tokens - 1
        });
     }
  }
}));
