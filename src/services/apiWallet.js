import API from '../services/api';

const login = async (userAccount, signature) => {
	return API
	  .post("/user/login", { userAccount })
	  .then((res) => res.data.success);
};


const WalletAPI = {
	login,
};

export default WalletAPI;