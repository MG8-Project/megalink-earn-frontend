import API from './Api';

// const endpointAdmin = process.env.REACT_APP_API_ADMIN;
const endpointUser = process.env.REACT_APP_API_USER;

const login = async ( userAccount: string ) => {
  return API
    .post(`${endpointUser}/login`, { userAccount })
    .then((res) => res.data.success);
};
const getUserId = async ( userAccount: string ) => {
  return "10";
  // return API
  //   .post(endpointAdmin, { userAccount })
  //   .then((res) => res.data.success);
};
const ApiPoints = {
	login,
  getUserId,
};
  
export default ApiPoints;
