import create from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  preferences: {
    language: string;
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Simulate API call
        const mockUser: User = {
          id: '1',
          email,
          name: 'John Doe',
          preferences: {
            language: 'en',
            theme: 'light',
            notifications: true,
          },
        };
        set({ user: mockUser, isAuthenticated: true });
      },
      signup: async (email: string, password: string, name: string) => {
        // Simulate API call
        const mockUser: User = {
          id: '1',
          email,
          name,
          preferences: {
            language: 'en',
            theme: 'light',
            notifications: true,
          },
        };
        set({ user: mockUser, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      updateUser: (data) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);