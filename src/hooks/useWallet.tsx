import {useCallback, useEffect, useState} from "react";
import {useAuthStore} from "../store/authStore";
import {ethers, getAddress} from "ethers";
import {OPBNB_CONFIG} from "../constants";

export const useWallet = () => {
    const setWalletAddress = useAuthStore((state) => state.setUserAccount);
    const logout = useAuthStore((state) => state.logout);
    const login = useAuthStore((state) => state.login);
    const [currentAccount, setCurrentAccount] = useState<string | null>(null);

    const connectWallet = useCallback(async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{chainId: OPBNB_CONFIG.chainId}],
                });
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.getSigner(0);
                if (await accounts.getAddress() !== null) {
                    setWalletAddress(getAddress(await accounts.getAddress()));
                    setCurrentAccount(getAddress(await accounts.getAddress()));
                    return getAddress(await accounts.getAddress());
                }

                return;
            } catch (error: any) {
                try {
                    switch (error.code) {
                        case 4902:
                            await window.ethereum.request({
                                method: 'wallet_addEthereumChain',
                                params: [
                                    {
                                        chainId: OPBNB_CONFIG.chainId,
                                        chainName: OPBNB_CONFIG.chainName,
                                        nativeCurrency: {
                                            name: OPBNB_CONFIG.symbol,
                                            symbol: OPBNB_CONFIG.symbol,
                                            decimals: 18
                                        },
                                        rpcUrls: OPBNB_CONFIG.rpcUrls,
                                        blockExplorerUrls: OPBNB_CONFIG.blockExplorerUrls
                                    },
                                ],
                            });
                            return;
                        case 4001:
                            alert('User refused to connect.');
                            return;
                        default:
                            alert('An error occurred while connecting.');
                            console.error(error);
                            return;
                    }

                } catch (addError: any) {
                    if (addError.code === 4902) {
                        try {
                            await window.ethereum.request({
                                method: 'wallet_addEthereumChain',
                                params: [
                                    {
                                        chainId: OPBNB_CONFIG.chainId,
                                        chainName: OPBNB_CONFIG.chainName,
                                        nativeCurrency: {
                                            name: OPBNB_CONFIG.symbol,
                                            symbol: OPBNB_CONFIG.symbol,
                                            decimals: 18
                                        },
                                        rpcUrls: OPBNB_CONFIG.rpcUrls,
                                        blockExplorerUrls: OPBNB_CONFIG.blockExplorerUrls
                                    },
                                ],
                            });
                        } catch (addError: any) {
                            if (addError.code === 4001) {
                                alert('User refused to connect.');
                                return;
                            }

                            alert('Refused to add network.');
                            console.error(addError);
                            return;
                        }
                    }
                }
            }
        }
    }, [setWalletAddress]);

    useEffect(() => {
        const handleAccountsChanged = (accounts: string[]) => {
            if (accounts.length === 0) {
                logout();
                window.location.reload();
                setCurrentAccount(null);
            } else {
                const newAccount = accounts[0];
                if (currentAccount == null || newAccount == null) {
                    logout();
                    window.location.reload();
                    return
                }
                if (getAddress(currentAccount) !== getAddress(newAccount)) {
                    logout();
                    window.location.reload();
                    setWalletAddress(getAddress(newAccount));
                    setCurrentAccount(getAddress(newAccount));
                }
            }
        };
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", handleAccountsChanged);
            return () => {
                window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
            };
        }
    }, [setWalletAddress, logout, currentAccount, login]);

    return {
        walletAddress: useAuthStore(
            (state: { userAccount: any }) => state.userAccount
        ),
        connectWallet,
    };
};
