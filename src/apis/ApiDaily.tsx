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
  return API.post(`${endpoint}/myParticipationTicket?userAccount`, {
    userAccount: userAccount,
  })
    .then((res) => res.data)
    .catch((error) => {
      console.error("Fetching myParticipationTicket failed: ", error);
      throw error;
    });
}
const dailyPool = async () => {
  const BNBAmount:string = process.env.REACT_APP_BNBAMOUNT;
	return API
	.get(`${statusEndpoint}/BNBRewarded`)
	.then((res) => res.data / parseInt(BNBAmount));
}

const ApiDaily = {
	myParticipationTicket,
  myTotalLogin,
  dailyPool,
};
  
export default ApiDaily;
