import React, { createContext, useContext, useState, useEffect } from 'react';
import Web3 from 'web3'; 


const WalletContext = createContext();
export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [web3, setWeb3] = useState(null); 
  const [accounts, setAccounts] = useState([]); 
  const [connected, setConnected] = useState(false); 

  useEffect(() => {
    const connectTowallet = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
          const accounts = await web3Instance.eth.getAccounts();
          setAccounts(accounts);
          setConnected(true);
        } catch (error) {
          console.error('Error connecting to wallet:', error);
        }
      } else {
        console.error('wallet not detected.');
      }
    };

    connectTowallet();

    return () => {
      if (web3 && web3.currentProvider && web3.currentProvider.disconnect) {
        web3.currentProvider.disconnect();
        setWeb3(null);
        setAccounts([]);
        setConnected(false);
      }
    };
  }, [web3]);

  return (
    <WalletContext.Provider value={{ web3, accounts, connected }}>
      {children}
    </WalletContext.Provider>
  );
};
