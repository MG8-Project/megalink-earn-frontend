import API from './api';

const endpoint = '/infiniteSpin/game';

const getUserId = async (userAccount) => {
	return API
	.get(`${endpoint}/personalRnk`, {params: {userAccount: userAccount}})
	.then((res) => res.data);
}
const getTeamCode = async (userId) => {
	return API
	.get('/infiniteSpin/mega8/personal/getUserIdByAccount', {params: {userId: userId}})
	.then((res) => res.data);
}
const personalRnk  = async (userId) => {
	return API
	.get(`${endpoint}/personalRnk`, {params: {userId: userId}})
	.then((res) => res.data);
}
const teamRnk = async (teamCode) => {
	return API
	.get(`${endpoint}/teamRnk`, {params: {teamCode: teamCode}},
		{headers: { 'Content-Type': 'application/json' }})
	.then((res) => res.data);
}
const leaderboard = async (type, userAccount) => {
	const userID = getUserId(userAccount);
	const teamInco = getTeamCode(userID);
	
	if (type === "individual") {
		return personalRnk(userID);
	} else if (type === "team") {
		return teamRnk(teamInco.teamCode);
	}
}

const leaderboardAPI = {
	leaderboard,
};

export default leaderboardAPI;