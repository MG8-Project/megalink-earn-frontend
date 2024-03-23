import API from "./Api";

const endpoint = process.env.REACT_APP_API_PERSONAL;
const statusEndpoint = process.env.REACT_APP_API_STATUS;

const myTotalLogin = async (userAccount: string) => {
    return API
        .post(`${endpoint}/myTotalLogin`, {userAccount: userAccount})
        .then((res) => res.data)
        .catch((error) => {
            console.error("Fetching myTotalLogin failed: ", error);
            throw error;
        });
}
const myParticipationTicket = async (userAccount: string) => {
    return API.post(`${endpoint}/myParticipationTicket`, {
        userAccount: userAccount,
    })
        .then((res) => res.data)
        .catch((error) => {
            throw error;
        });
}
const dailyPool = async () => {
    return API
        .get(`${statusEndpoint}/dailyPool`)
        .then((res) => parseInt(res.data));
}

const myPoint = async (userAccount: string) => {
    return API.post(`${endpoint}/totalPoints`, {userAccount: userAccount})
        .then(res => res.data)
        .catch((error) => {
            throw error;
        })
}

const ApiDaily = {
    myParticipationTicket,
    myTotalLogin,
    dailyPool,
    myPoint,
};

export default ApiDaily;
