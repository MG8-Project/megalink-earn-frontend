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
        const TokenInfo = {
            //204(opBNB Mainnet) == 0xcc, 5611(opBNB) == 0x15eb
            /**
             * Network Name: opBNB Mainnet
             * RPC URL: https://opBNB-mainnet-rpc.bnbchain.org
             * ChainID: 204
             * Symbol: BNB
             * Explorer: http://mainnet.opBNBscan.com/
             */
            //opBNB TestNet
            chainName: 'opBNB Testnet',
            chainId:'0x15eb',
            symbol: 'tBNB',
            rpcUrls: ['https://opbnb-testnet-rpc.bnbchain.org'],
            blockExplorerUrls: ['https://testnet.bscscan.com']
        }
        if (window.ethereum) {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: TokenInfo.chainId }],
                });
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.getSigner(0);
                setWalletAddress(getAddress(await accounts.getAddress()));
                setCurrentAccount(getAddress(await accounts.getAddress()));
                return getAddress(await accounts.getAddress());
            } catch (error: any) {
                if (error.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [
                                { 
                                    chainId: TokenInfo.chainId,
                                    chainName: TokenInfo.chainName,
                                    nativeCurrency: {
                                    name: TokenInfo.symbol,
                                    symbol:TokenInfo.symbol,
                                    decimals: 18
                                    },
                                    rpcUrls: TokenInfo.rpcUrls,
                                    blockExplorerUrls: TokenInfo.blockExplorerUrls
                                },
                            ],
                        });
                        } catch (addError) {
                            alert('Refused to add network.');
                            console.error(addError);
                            return null;
                        }
                    }
                    else if (error.code === 4001) {
                        alert('Network switch refused.');
                      } else {
                        alert('An error occurred while switching networks.');
                        console.error(error);
                      }
                }
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
