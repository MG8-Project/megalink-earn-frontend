import API from './Api';

const endpointStatus = process.env.REACT_APP_API_STATUS;

const status = async () => {
	const newWalletsTodayResponse = await API.get(`${endpointStatus}/newWalletsToday`);
	const totalWalletsResponse = await API.get(`${endpointStatus}/totalWallets`);
	const totalTransactionsResponse = await API.get(`${endpointStatus}/totalTransactions`);
	const transactionsTodayResponse = await API.get(`${endpointStatus}/totalTransactions`);
	const spinCountResponse = await API.get(`${endpointStatus}/spinCount`);
	const totalPointsResponse = await API.get(`${endpointStatus}/totalPoints`);
	const MG8DroppedResponse = await API.get(`${endpointStatus}/MG8Dropped`);
	const BNBRewardedResponse = await API.get(`${endpointStatus}/BNBRewarded`);
	return {
		totalTransactions: totalTransactionsResponse.data, 
		totalWallets: totalWalletsResponse.data,
		transactionsToday: transactionsTodayResponse.data,
		newWalletsToday: newWalletsTodayResponse.data,
		spinCount: spinCountResponse.data,
		totalPoints: totalPointsResponse.data,
		MG8Dropped: MG8DroppedResponse.data,
		BNBRewarded: BNBRewardedResponse.data,
	};
}	
const ApiStatus = {
	status,
};
  
export default ApiStatus;
