import {useCallback, useEffect, useState} from "react";
import {useAuthStore} from "../store/authStore";
import {ethers, getAddress} from "ethers";

export const useWallet = () => {
    // const currentUserAccount = useAuthStore((state) => state.userAccount);
    const setWalletAddress = useAuthStore((state) => state.setUserAccount);
    const logout = useAuthStore((state) => state.logout);
    const [currentAccount, setCurrentAccount] = useState<string | null>(
        null
    );

    const connectWallet = useCallback(async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.getSigner(0);
                const address = getAddress(await accounts.getAddress());
                setWalletAddress(getAddress(await accounts.getAddress()));
                setCurrentAccount(getAddress(await accounts.getAddress()));

                return address;
            } catch (error) {
                return null;
            }
        } else {
            return null;
        }
    }, [setWalletAddress]);

    useEffect(() => {
        const handleAccountsChanged = (accounts: string[]) => {
            if (accounts.length === 0) {
                logout();
                setCurrentAccount(null);
            } else {
                const newAccount = accounts[0];
                if (currentAccount !== newAccount) {
                    setWalletAddress(newAccount);
                    setCurrentAccount(newAccount);
                }
            }
        };
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", handleAccountsChanged);
            return () => {
                window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
            };
        }
    }, [setWalletAddress, logout, currentAccount]);

    return {
        walletAddress: useAuthStore(
            (state: { userAccount: any }) => state.userAccount
        ),
        connectWallet,
    };
};
