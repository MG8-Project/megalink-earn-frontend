import API from './Api';

const endpoint = process.env.REACT_APP_API_GAME;

const personalRnk  = async () => {
	return API
	.get(`${endpoint}/personalRnk`)
	.then((res) => res.data);
}
const teamRnk = async () => {
	return API
	.get(`${endpoint}/teamRnk`)
	.then((res) => res.data);
}
const leaderboard = async (type: string) => {

	if (type === "individual") {
		return personalRnk();
	} else if (type === "team") {
		return teamRnk();
	}
}

const leaderboardAPI = {
	leaderboard,
};

export default leaderboardAPI;