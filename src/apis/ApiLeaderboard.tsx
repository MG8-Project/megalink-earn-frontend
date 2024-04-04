import API from './Api';

const endpoint = process.env.REACT_APP_API_PERSONAL;

const personalRnk  = async (userAccount:string) => {
	return API
	.post(`${endpoint}/personalRnk`, {userAccount: userAccount})
	.then((res) => res.data);
}
const teamRnk = async (userAccount: string) => {
	return API
	.post(`${endpoint}/teamRnk`, {userAccount: userAccount})
	.then((res) => res.data);
}
const leaderboard = async (type: string, userAccount: string) => {

	if (type === "individual") {
		return personalRnk(userAccount);
	} else if (type === "team") {
		return teamRnk(userAccount);
	}
}

const leaderboardAPI = {
	leaderboard,
};

export default leaderboardAPI;