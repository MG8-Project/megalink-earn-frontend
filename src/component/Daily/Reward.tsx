import styled from "styled-components";
import {DailyRewardList, OPBNB_CONFIG} from "../../constants";
import {useAuthStore} from "../../store/authStore";
import {BrowserProvider, Contract, ethers, getAddress} from "ethers";
import {ForwarderAbi} from "../../typechain-types/contracts/Forwarder";
import {DailyAttendanceAbi} from "../../typechain-types/contracts/DailyAttendance";
import API from "../../apis/Api";
import {useEffect, useState} from "react";
import ApiDaily from "../../apis/ApiDaily";
import {mega8, mg8gray} from "../../assets/images";

export type Domain = {
    chainId: number;
    name: string;
    verifyingContract: string;
    version: string;
}

interface MyTotalLoginsResponse {
    resultCode: string;
    msg: string;
    todayIndex: number;
    attendedList: number[]
}

export const DOMAIN_SEPARATOR: Domain = {
    chainId: Number(OPBNB_CONFIG.chainId),
    name: "Forwarder",
    verifyingContract: process.env.REACT_APP_CONTRACT_FORWARDER,
    version: "1"
}

const Reward = () => {
        const isLoggedIn = useAuthStore(state => state.isLoggedIn);
        const [isFetch, setIsFetch] = useState(false);
        const walletAddress = useAuthStore(state => state.userAccount);
        const [receivedStatus, setReceivedStatus] = useState<{ todayIndex: number, attendedList: number[] }>({
            todayIndex: 0,
            attendedList: [0, 0, 0, 0, 0, 0, 0]
        });
        const isReward = (index: number) => {
            return isLoggedIn && receivedStatus.attendedList !== undefined && receivedStatus.attendedList[index] !== 0
        }
        const isTodayCheckAvailable = (index: number) => {
            return index === receivedStatus.todayIndex
        }
        const signTypedData = async () => {
            try {
                if (!isLoggedIn) {
                    alert("Please login first.")
                    return;
                }

                const provider = new BrowserProvider(window.ethereum);
                const dailyAttendance = new Contract(process.env.REACT_APP_CONTRACT_DAILY_ATTENDANCE, DailyAttendanceAbi, provider);
                const forwarder = new Contract(process.env.REACT_APP_CONTRACT_FORWARDER, ForwarderAbi, provider);
                const currentTimestamp = Math.floor(new Date().getTime() / 1000);
                const oneWeekInSeconds = 60;
                const futureTimestamp = currentTimestamp + oneWeekInSeconds;
                const uint48Value = ethers.toNumber(futureTimestamp);

                const chainId = await window.ethereum.request({method: "eth_chainId"});

                if (chainId.toString() !== DOMAIN_SEPARATOR.chainId.toString()) {
                    // FIXME: 추후 Mainnet 정보로 변경
                    if (window.ethereum) {
                        try {
                            await window.ethereum.request({
                                method: 'wallet_switchEthereumChain',
                                params: [{chainId: OPBNB_CONFIG.chainId}],
                            });
                        } catch (error: any) {
                            if (error.code === 4902) {
                                try {
                                    await window.ethereum.request({
                                        method: 'wallet_addEthereumChain',
                                        params: [
                                            {
                                                chainId: OPBNB_CONFIG.chainId,
                                                chainName: OPBNB_CONFIG.chainName,
                                                nativeCurrency: {
                                                    name: OPBNB_CONFIG.symbol,
                                                    symbol: OPBNB_CONFIG.symbol,
                                                    decimals: 18
                                                },
                                                rpcUrls: OPBNB_CONFIG.rpcUrls,
                                                blockExplorerUrls: OPBNB_CONFIG.blockExplorerUrls
                                            },
                                        ],
                                    });
                                } catch (addError) {
                                    alert('Refused to add network.');
                                    console.error(addError);
                                    return;
                                }
                            } else if (error.code === 4001) {
                                alert('Network switch refused.');
                            } else {
                                alert('An error occurred while switching networks.');
                                console.error(error);
                            }
                        }
                    }
                }

                const nonce = await forwarder.nonces(walletAddress);

                const alreadyCheckedIn = await dailyAttendance.checkedInToday(walletAddress)
                if (alreadyCheckedIn) {
                    alert("You already checked in today.")
                    return;
                }

                const message = {
                    from: getAddress(walletAddress),
                    to: process.env.REACT_APP_CONTRACT_DAILY_ATTENDANCE,
                    value: "0",
                    gas: "50000",
                    nonce: nonce.toString(),
                    deadline: uint48Value.toString(),
                    data: dailyAttendance.interface.encodeFunctionData("checkIn", undefined),
                }
                const typedData = JSON.stringify({
                    domain: DOMAIN_SEPARATOR,
                    message: message,
                    primaryType: "ForwardRequest",
                    types: {
                        EIP712Domain: [
                            {name: "name", type: "string"},
                            {name: "version", type: "string"},
                            {name: "chainId", type: "uint256"},
                            {name: "verifyingContract", type: "address"},
                        ],
                        ForwardRequest: [
                            {name: "from", type: "address"},
                            {name: "to", type: "address"},
                            {name: "value", type: "uint256"},
                            {name: "gas", type: "uint256"},
                            {name: "nonce", type: "uint256"},
                            {name: "deadline", type: "uint48"},
                            {name: "data", type: "bytes"},
                        ],
                    }
                })
                const method = "eth_signTypedData_v4";
                const params = [getAddress(walletAddress), typedData]
                const signature = await window.ethereum.request({method, params});
                const param = {
                    userAccount: getAddress(walletAddress),
                    signature,
                    ...message,
                }

                const res = await API.post(process.env.REACT_APP_API_PERSONAL_CHECK, param, {
                    headers: {
                        "Authorization": "application/json",
                    }
                });
                if (res && res.data.resultCode === '1') {
                    setIsFetch(true);
                } else {
                    throw new Error(res && res.data.msg);
                }
            } catch (error) {
                console.error(error)
            }
        };

        useEffect(() => {
            const fetchReceivedStatus = async () => {
                try {
                    const response: MyTotalLoginsResponse = await ApiDaily.myTotalLogin(walletAddress);
                    const data = {
                        todayIndex: response.todayIndex,
                        attendedList: response.attendedList
                    }
                    setReceivedStatus(data);
                } catch (error) {
                    console.error('Error fetching received status:', error);
                }
            };
            if (isLoggedIn) {
                void fetchReceivedStatus();
            }
            return () => {
            };
        }, [isLoggedIn, walletAddress, isFetch]);


        return (
            <RewardWrapper>
                {DailyRewardList.map((item, index) => (
                    <RewardContainer
                        key={item.id}
                        onClick={isLoggedIn && isTodayCheckAvailable(index) ? () => void signTypedData() : null}
                        style={{
                            cursor: isLoggedIn && isTodayCheckAvailable(index) ? 'pointer' : 'default',
                            border: isLoggedIn && isTodayCheckAvailable((index)) ? "2px solid white" : "2px solid transparent",
                        }}>
                        <RewardTitle>{item.title}</RewardTitle>
                        <RewardImage
                            src={isReward(index) ? mega8 : mg8gray}
                            alt=""/>
                        <RewardPrice>{item.point}</RewardPrice>
                        {/* <RewardRequest onClick={signTypedData}>Get</RewardRequest> */}
                    </RewardContainer>
                ))}
            </RewardWrapper>
        );
    }
;

export default Reward;

const RewardWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const RewardContainer = styled.div`
  width: 80px;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RewardTitle = styled.div`
  font-weight: 500;
  font-size: 18px;
  margin-top: 11px;
  line-height: normal;
`;
const RewardPrice = styled.div`
  width: 42px;
  height: 17px;
  font-weight: 600;
  font-size: 14px;
  line-height: normal;
`;

const RewardImage = styled.img`
  width: 60px;
  height: 60px;
  margin-top: 24px;
  margin-bottom: 28px;
`;
