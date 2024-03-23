import styled from "styled-components";
import {DailyRewardList} from "../../constants";
import {useAuthStore} from "../../store/authStore";
import {BrowserProvider, Contract, ethers, toBeHex} from "ethers";
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

export const DOMAIN_SEPARATOR: Domain = {
    chainId: 5611,
    name: "Forwarder",
    verifyingContract: process.env.REACT_APP_CONTRACT_FORWARDER,
    version: "1"
}

const Reward = () => {
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const walletAddress = useAuthStore(state => state.userAccount);
    const [receivedStatus, setReceivedStatus] = useState([0, 0, 0, 0, 0, 0, 0]);

    const signTypedData = async () => {
        try {
            if (!isLoggedIn) {
                alert("Please login first.")
                return;
            }
            const currentTimestamp = Math.floor(new Date().getTime() / 1000);
            const oneWeekInSeconds = 60;
            const futureTimestamp = currentTimestamp + oneWeekInSeconds;
            const uint48Value = ethers.toNumber(futureTimestamp);

            const chainId = await window.ethereum.request({method: "eth_chainId"});

            if (chainId.toString() !== DOMAIN_SEPARATOR.chainId.toString()) {
            // FIXME: 추후 Mainnet 정보로 변경
                await window.ethereum.request({
                    "method": "wallet_addEthereumChain",
                    "params": [
                        {
                            "chainId": toBeHex(DOMAIN_SEPARATOR.chainId.toString()).toString(),
                            "chainName": "opBNB",
                            "rpcUrls": [
                                "https://opbnb-testnet-rpc.bnbchain.org"
                            ],
                            "iconUrls": [
                                "https://docs.bnbchain.org/opbnb-docs/img/logo.svg",
                            ],
                            "nativeCurrency": {
                                "name": "tBNB",
                                "symbol": "tBNB",
                                "decimals": 18
                            },
                            "blockExplorerUrls": [
                                "https://testnet.opbnbscan.com/"
                            ]
                        }
                    ]
                });

                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{chainId: toBeHex(DOMAIN_SEPARATOR.chainId.toString()).toString()}]
                })
            }

            const provider = new BrowserProvider(window.ethereum);
            const forwarder = new Contract(process.env.REACT_APP_CONTRACT_FORWARDER, ForwarderAbi, provider);
            const nonce = await forwarder.nonces(walletAddress);
            const dailyAttendance = new Contract(process.env.REACT_APP_CONTRACT_DAILY_ATTENDANCE, DailyAttendanceAbi, provider);
            const message = {
                from: walletAddress,
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
            const params = [walletAddress, typedData]
            const signature = await window.ethereum.request({method, params});
            const param = {
                userAccount: walletAddress,
                signature,
                ...message,
            }

            await API.post(process.env.REACT_APP_API_PERSONAL_CHECK, param, {
                headers: {
                    "Authorization": "application/json",
                }
            });

            alert("Successfully checked in.")
        } catch (error) {
            alert("Something went wrong. Please try again later.")
            console.error(error)
        }
    };

    useEffect(() => {
        const fetchReceivedStatus = async () => {
            try {
                const response = await ApiDaily.myTotalLogin(walletAddress);
                setReceivedStatus(response);
            } catch (error) {
                console.error('Error fetching received status:', error);
            }
        };

        if (isLoggedIn) {
            void fetchReceivedStatus();
        }
        return () => {
        };
    }, [isLoggedIn, walletAddress]);
    return (
        <RewardWrapper>
            {DailyRewardList.map((item, index) => (
                <RewardContainer key={item.id} onClick={() => {
                    receivedStatus[index] === 1 ? signTypedData() : alert("You can only get the reward of the previous day.")
                }} style={{
                    border: isLoggedIn && receivedStatus[index] === 1 ? "2px solid white" : "2px solid transparent",
                    padding: "10px",
                    borderRadius: "10px",
                }}>
                    <RewardTitle>{item.title}</RewardTitle>
                    <RewardImage src={receivedStatus[index] === 1 ? mega8 : mg8gray} alt=""/>
                    <RewardPrice>{item.point}</RewardPrice>
                    {/* <RewardRequest onClick={signTypedData}>Get</RewardRequest> */}
                </RewardContainer>
            ))}
        </RewardWrapper>
    );
};

export default Reward;

const RewardWrapper = styled.div`
    display: flex;
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
    font-weight: 700;
    font-size: 18px;
`;
const RewardPrice = styled.div`
    font-weight: 600;
    font-size: 14px;
`;

const RewardImage = styled.img`
    width: 64px;
    margin-top: 24px;
    margin-bottom: 28px;
`;
