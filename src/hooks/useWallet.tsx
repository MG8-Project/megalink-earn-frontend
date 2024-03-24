import {useCallback, useEffect, useState} from "react";
import {useAuthStore} from "../store/authStore";
import {ethers, getAddress} from "ethers";

export const useWallet = () => {
    const currentUserAccount = useAuthStore((state) => state.userAccount);
    const setWalletAddress = useAuthStore((state) => state.setUserAccount);
    const logout = useAuthStore((state) => state.logout);
    const [currentAccount, setCurrentAccount] = useState<string | null>(
        currentUserAccount
    );

    const connectWallet = useCallback(async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.getSigner(0);
                setWalletAddress(getAddress(await accounts.getAddress()));
                setCurrentAccount(getAddress(await accounts.getAddress()));

                return getAddress(await accounts.getAddress());
            } catch (error) {
                return null;
            }
        } else {
            return null;
        }
    }, [setWalletAddress]);

    useEffect(() => {
        if (window.ethereum) {
            void connectWallet();

            const handleAccountsChanged = (accounts: string[]) => {
                if (accounts.length === 0) {
                    logout();
                } else if (currentAccount !== accounts[0]) {
                    logout();
                }
                setCurrentAccount(accounts[0]);
            };
            window.ethereum?.on("accountsChanged", handleAccountsChanged);
            return () => {
                window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
            };
        }
    }, [connectWallet, setWalletAddress, logout, currentAccount]);

    return {
        walletAddress: useAuthStore(
            (state: { userAccount: any }) => state.userAccount
        ),
        connectWallet,
    };
};
