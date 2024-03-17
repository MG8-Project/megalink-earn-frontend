import API from './api';

const endpoint = '/infiniteSpin/mega8';

const myTotalLogin = async (userAccount) => {
	return API
	.post(`${endpoint}/personal/myTotalLogin`, {userAccount: userAccount}, 
		{headers: { 'Content-Type': 'application/json' }})
	.then((res) => res.data);
}
const myParticipationTicket = async (userAccount) => {
	return API
	.post(`${endpoint}/personal/myParticipationTicket`, {userAccount: userAccount},
		{headers: { 'Content-Type': 'application/json' }})
	.then((res) => res.data);
}
const dailyPool = async () => {
	// return API
	// .get(`${endpoint}/dailypool`)
	// .then((res) => res.data);
	return 10000000;
}
const dailyAPI = {
	myTotalLogin,
	myParticipationTicket,
	dailyPool,
};

export default dailyAPI;