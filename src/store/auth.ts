import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from '../types';

const VALID_CREDENTIALS = {
  username: 'naval.ravikant',
  password: '05111974'
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      username: null,
      login: (username: string, password: string) => {
        if (
          username === VALID_CREDENTIALS.username &&
          password === VALID_CREDENTIALS.password
        ) {
          set({ isAuthenticated: true, username });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ isAuthenticated: false, username: null });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);