import API from "./Api";

const endpoint = process.env.REACT_APP_API_PERSONAL;

const myParticipationTicket = async (userAccount: string) => {
  return API.post(`${endpoint}/myParticipationTicket?userAccount`, {
    userAccount: userAccount,
  })
    .then((res) => res.data)
    .catch((error) => {
      console.error("Fetching myParticipationTicket failed: ", error);
      throw error;
    });
};

const ApiDaily = {
  myParticipationTicket,
};

export default ApiDaily;
