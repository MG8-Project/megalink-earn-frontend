import React from 'react';
import { useState } from "react";

function Wallet () {
	const [walletAddress, setWalletAddress] = useState("");

	async function requestAccount() {
		console.log("Requesting account...");
		if (window.ethereum) {
			console.log("detected");
			try {
				const accounts = await window.ethereum.request({
					method: "eth_requestAccounts",
				});
				setWalletAddress(accounts[0]);
			} catch (err) {
				console.log("Error connecting...");
			}
		} else {
			console.log("Meta Mask not detected");
		}
	}
	return (
		<div className='mainDiv'>
			<h1>Do you have one of these coins?</h1>
			{ walletAddress ? (
			<p>Wallet Address: {walletAddress}</p>
			) : (
			<button className='button' onClick={requestAccount}>Connect Wallet</button>
			)}
		</div>
  );
}

export default Wallet;
