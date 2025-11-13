import { create } from 'zustand';

import { User } from '@/app/auth/auth.type';
import { getStorageItem } from '@/utils/storage';

interface State {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;

  user: User | null;
  setUser: (user: User | null) => void;
}

const useAuthStore = create<State>((set) => ({
  isLogged: getStorageItem('token') ? true : false,
  user: null,
  setIsLogged: (isLogged: boolean) => set((state) => ({ ...state, isLogged })),
  setUser: (user: User | null) => set({ user })
}));

export { useAuthStore };
