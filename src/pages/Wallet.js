import React from 'react';
import { useWallet } from '../hook/walletContext';

function Wallet () {
	const { web3, accounts, connected } = useWallet(); // Metamask 커스텀 훅 사용

	const connectToMetamask = async () => {
	  if (!connected && window.ethereum) {
		try {
		  await window.ethereum.request({ method: 'eth_requestAccounts' });
		  const accounts = await web3.eth.getAccounts();
		  console.log('Connected accounts:', accounts);
		} catch (error) {
		  console.error('Error connecting to Metamask:', error);
		}
	  } else {
		console.error('Metamask not detected or already connected.');
	  }
	};
	return (
		<div className='mainDiv'>
			<h1>Do you have one of these coins?</h1>
			{ accounts ? (
			<p>Wallet Address: {accounts}</p>
			) : (
			<button className='button' onClick={connectToMetamask}>Connect Wallet</button>
			)}
		</div>
  );
}

export default Wallet;
