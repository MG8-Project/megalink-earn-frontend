import API from './Api';

const endpointUser = process.env.REACT_APP_API_USER;
const endpointAdmin = process.env.REACT_APP_API_ADMIN;

const login = async (userAccount: string) => {
  try {
    const response = await API.post(`${endpointUser}/login`, { userAccount });
    const data = response.data;

    switch(data.resultCode) {
      case "1":
        console.log(data.msg);
        return data;
      case "2":
        throw new Error(data.msg);
      case "40":
        throw new Error(data.msg);
      default:
        throw new Error("알 수 없는 에러가 발생하였습니다.");
    }
  } catch (error) {
    console.error(`로그인 처리 중 에러가 발생하였습니다: ${error}`);
    throw error;
  }
};

const getUserId = async ( userAccount: string ) => {
  return API
    .post(endpointAdmin, { userAccount })
    .then((res) => res.data.success);
};
const ApiPoints = {
	login,
  getUserId,
};
  
export default ApiPoints;
