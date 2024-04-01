import {create} from "zustand";
import {createJSONStorage, devtools, persist} from "zustand/middleware";
import Cookies from "js-cookie";

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
                logout: () => set((state) => {
                    localStorage.clear();
                    console.log(document.cookie.split(";"));
                    Cookies.remove('token', {
                        path: '/game'
                    });
                    Cookies.remove('refreshToken', {
                        path: '/game'
                    });
                    Cookies.remove('userAccount', {
                        path: '/game'
                    });
                    return {isLoggedIn: false, userAccount:null}
                }),
                setUserAccount: (address: string) => set((state) => ({userAccount: address})),
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
