import API from './Api';

const endpoint = process.env.REACT_APP_API_GAME;

const personalRnk  = async (userId: string) => {
	return API
	.get(`${endpoint}/personalRnk`, {params: {userId: userId}})
	.then((res) => res.data);
}
const teamRnk = async (userId: string) => {
	return API
	.get(`${endpoint}/teamRnk`, {params: {userId: userId}})
	.then((res) => res.data);
}
const leaderboard = async (type: string, userId: string) => {

	if (type === "individual") {
		return personalRnk(userId);
	} else if (type === "team") {
		return teamRnk(userId);
	}
}

const leaderboardAPI = {
	leaderboard,
};

export default leaderboardAPI;