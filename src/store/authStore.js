import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isGuest: false,
  isAuthenticated: false,
  
  login: (userData) => set({
    user: userData,
    isGuest: false,
    isAuthenticated: true,
  }),
  
  loginAsGuest: () => set({
    user: null,
    isGuest: true,
    isAuthenticated: true,
  }),
  
  logout: () => set({
    user: null,
    isGuest: false,
    isAuthenticated: false,
  })
}));
