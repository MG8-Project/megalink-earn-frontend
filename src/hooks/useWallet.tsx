import {useCallback, useEffect, useState} from "react";
import Web3 from "web3";
import {useAuthStore} from "../store/authStore";
import {METAMASK_LINK_FAILED, METAMASK_NOT_INSTALLED} from "../constants";

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
                const web3 = new Web3(window.ethereum);
                const accounts = await web3.eth.requestAccounts();
                setWalletAddress(accounts[0]);
                setCurrentAccount(accounts[0]);

                return accounts[0];
            } catch (error) {
                console.error("Metamask linkage failed:", error);
                alert(METAMASK_LINK_FAILED);
                return null;
            }
        } else {
            alert(METAMASK_NOT_INSTALLED);
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
