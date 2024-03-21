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

import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface State {
  isLoggedIn: boolean;
  userAccount: string | null;
  userId: string;
  login: (userAccount: string, userId: string) => void;
  logout: () => void;
  setUserAccount: (address: string) => void;
  setUserId: (userId: string) => void;
}

export const useAuthStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        isLoggedIn: false,
        userAccount: null,
        userId: null,
        login: (userAccount: string, userId: string) =>
          set((state) => ({ isLoggedIn: true, userAccount, userId })),
        logout: () =>
          set((state) => ({
            isLoggedIn: false,
            userAccount: null,
            userId: null,
          })),
        setUserAccount: (address: string) =>
          set((state) => ({ userAccount: address })),
        setUserId: (userId: string) => set((state) => ({ userId: userId })),
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => localStorage),
        // 현재 zustand에서 지원하는 getStorage 메서드가 사라지고 storage로 통합되어 바꾼 코드입니다.
        // storage의 기본값으로 localStorage가 설정되어 있어 위 코드가 없어도 정상작동하나, 일단 기존 코드대로 작성해 놓았습니다.
        // getStorage: () => localStorage,
      }
    )
  )
);
