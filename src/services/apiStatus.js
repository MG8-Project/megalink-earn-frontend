import API from '../services/api';

const endpoint = '/infiniteSpin/mega8/status'

const status = async () => {
	const totalTransactionsResponse = await API.get(`${endpoint}/totalTransactions`);
	const totalWalletsResponse = await API.get(`${endpoint}/totalWallets`);
	const transactionsTodayResponse = await API.get(`${endpoint}/totalTransactions`);
	const newWalletsTodayResponse = await API.get(`${endpoint}/newWalletsToday`);
	const spinCountResponse = await API.get(`${endpoint}/spinCount`);
	// API 필요
	// const totalPointsResponse = await API.get(`${endpoint}/totalPoints`);
	// const MG8DroppedResponse = await API.get(`${endpoint}/MG8Dropped`);
	// const BNBRewardedResponse = await API.get(`${endpoint}/BNBRewarded`);
	
	return {
		totalTransactions: totalTransactionsResponse.data, 
		totalWallets: totalWalletsResponse.data,
		transactionsToday: transactionsTodayResponse.data,
		newWalletsToday: newWalletsTodayResponse.data,
		spinCount: spinCountResponse.data,
		// totalPoints: totalPointsResponse.data,
		// MG8Dropped: MG8DroppedResponse.data,
		// BNBRewarded: BNBRewardedResponse.data,
		totalPoints: 0,
		MG8Dropped: 0,
		BNBRewarded: 0,
	};
}

const statusAPI = {
	status
}

export default statusAPI;