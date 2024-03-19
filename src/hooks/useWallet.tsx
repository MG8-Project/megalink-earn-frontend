import { useCallback, useEffect } from 'react';
import Web3 from 'web3';
import { useAuthStore } from '../store/authStore';

export const useWallet = () => {
  const setWalletAddress = useAuthStore(state => state.setUserAccount);

  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.requestAccounts();
        setWalletAddress(accounts[0]);
        return accounts[0];
      } catch (error) {
        console.error("메타마스크 연동 실패:", error);
        return null;
      }
    } else {
      alert("메타마스크를 설치해주세요.");
      return null;
    }
  }, [setWalletAddress]); 

  useEffect(() => {
    connectWallet();

    const handleAccountsChanged = (accounts: string[]) => {
      setWalletAddress(accounts[0]);
    };
    window.ethereum?.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, [connectWallet, setWalletAddress]);

  return { walletAddress: useAuthStore(state => state.userAccount), connectWallet };
};
