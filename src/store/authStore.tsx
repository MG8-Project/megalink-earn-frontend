import create from 'zustand';
import { devtools, persist } from 'zustand/middleware'

interface State {
  isLoggedIn: boolean,
  userAccount: string | null,
  login: (userAccount: string) => void,
  logout: () => void,
  setUserAccount: (address: string) => void,
};

export const useAuthStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        isLoggedIn: false,
        userAccount: null,
        login: (userAccount: string) => set((state) => ({ isLoggedIn: true, userAccount })),
        logout: () => set((state) => ({ isLoggedIn: false, userAccount: null })),
        setUserAccount: (address: string) => set((state) => ({ userAccount: address })),
      }),
      {
        name: "auth-storage",
        getStorage: () => localStorage,
      }
    )
  )
)
