import API from './Api';

const endpointStatus = process.env.REACT_APP_API_STATUS;

const getNewWalletsToday = async () => {
  try {
    const response = await API.get(`${endpointStatus}/newWalletsToday`);
    return response.data;
  } catch (error) {
    console.error('Error fetching new wallets today:', error);
    return '0';
  }
};

const getTotalWallets = async () => {
  try {
    const response = await API.get(`${endpointStatus}/totalWallets`);
    return response.data;
  } catch (error) {
    console.error('Error fetching total wallets:', error);
    return '0'; 
  }
};

const getTotalTransactions = async () => {
  try {
    const response = await API.get(`${endpointStatus}/totalTransactions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching total transactions:', error);
    return '0'; 
  }
};

const getTransactionsToday = async () => {
  try {
    const response = await API.get(`${endpointStatus}/transactionsToday`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions today:', error);
    return '0'; 
  }
};

const getSpinCount = async () => {
  try {
    const response = await API.get(`${endpointStatus}/spinCount`);
    return response.data;
  } catch (error) {
    console.error('Error fetching spin count:', error);
    return '0';
  }
};

const getTotalPoints = async () => {
  try {
    const response = await API.get(`${endpointStatus}/totalPoints`);
    return response.data;
  } catch (error) {
    console.error('Error fetching total points:', error);
    return '0';
  }
};

const getMG8Dropped = async () => {
  try {
    const response = await API.get(`${endpointStatus}/MG8Dropped`);
    return response.data;
  } catch (error) {
    console.error('Error fetching MG8 dropped:', error);
    return '0'; 
  }
};

const getBNBRewarded = async () => {
  try {
    const response = await API.get(`${endpointStatus}/BNBRewarded`);
    return response.data;
  } catch (error) {
    console.error('Error fetching BNB rewarded:', error);
    return '0'; 
  }
};

const status = async () => {
  return {
    totalTransactions: await getTotalTransactions(), 
    totalWallets: await getTotalWallets(),
    transactionsToday: await getTransactionsToday(),
    newWalletsToday: await getNewWalletsToday(),
    spinCount: await getSpinCount(),
    totalPoints: await getTotalPoints(),
    MG8Dropped: await getMG8Dropped(),
    BNBRewarded: await getBNBRewarded(),
  };
};

const ApiStatus = {
  status,
};

export default ApiStatus;
