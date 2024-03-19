// import create from 'zustand';

// type State = {
//   isLoggedIn: boolean,
//   userAccount: string | null,
//   userId: string,
//   login: (userAccount: string, userId: string) => void,
//   logout: () => void,
//   setUserAccount: (address: string) => void,
//   setUserId: (userId: string) => void,
// };

// export const useAuthStore = create<State>((set) => ({
//   isLoggedIn: false,
//   userAccount: null,
//   userId: null,
//   login: (userAccount: string, userId: string) => set(() => ({ isLoggedIn: true, userAccount, userId })),
//   logout: () => set(() => ({ isLoggedIn: false, userAccount: null, userId: null })),
//   setUserAccount: (address: string) => set(() => ({ userAccount: address })),
//   setUserId: (userId: string) => set(() => ({ userId: userId })),
// }));


import create from 'zustand';
import { devtools, persist } from 'zustand/middleware'

interface State {
  isLoggedIn: boolean,
  userAccount: string | null,
  userId: string,
  login: (userAccount: string, userId: string) => void,
  logout: () => void,
  setUserAccount: (address: string) => void,
  setUserId: (userId: string) => void,
};

export const useAuthStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        isLoggedIn: false,
        userAccount: null,
        userId: null,
        login: (userAccount: string, userId: string) => set((state) => ({ isLoggedIn: true, userAccount, userId })),
        logout: () => set((state) => ({ isLoggedIn: false, userAccount: null, userId: null })),
        setUserAccount: (address: string) => set((state) => ({ userAccount: address })),
        setUserId: (userId: string) => set((state) => ({ userId: userId })),
      }),
      {
        name: "auth-storage",
        getStorage: () => localStorage,
      }
    )
  )
)

