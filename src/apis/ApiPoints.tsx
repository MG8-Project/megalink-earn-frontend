import API from './Api';

const endpointUser = process.env.REACT_APP_API_USER;

const login = async (userAccount: string) => {
    const response = await API.post(`${endpointUser}/login`, {userAccount});
    const data = response.data;

    switch (data.resultCode) {
        case "1":
            return data;
        default:
            throw new Error("Unknown error occurred. Please try again.");
    }
};

const join = async (userAccount: string) => {
    return API.post(`${endpointUser}/join`, {userAccount})
}

const ApiPoints = {
    login,
    join
};

export default ApiPoints;
