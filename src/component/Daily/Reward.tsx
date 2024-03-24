/* FIXME:
1. 출석체크시 오늘 체크 가능 여부
2. 지갑 잠그고 로그인 => alert 문구 변경
3. 지갑 바꾸고 로그인
* */

import styled from "styled-components";
import {DailyRewardList} from "../../constants";
import {useAuthStore} from "../../store/authStore";
import {BrowserProvider, Contract, ethers, toBeHex} from "ethers";
import {ForwarderAbi} from "../../typechain-types/contracts/Forwarder";
import {DailyAttendanceAbi} from "../../typechain-types/contracts/DailyAttendance";
import API from "../../apis/Api";
import {useCallback, useEffect, useMemo, useState} from "react";
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

// export type Message = {}

const Reward = () => {
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const walletAddress = useAuthStore(state => state.userAccount);
    const [receivedStatus, setReceivedStatus] = useState([0, 0, 0, 0, 0, 0, 0]);
    // FIXME: lastCheckIn 사용하는곳 찾아보고 추가하기
    const [lastCheckIn, setLastCheckIn] = useState(0);
    const provider = useMemo(() => {
        return new BrowserProvider(window.ethereum);
    }, []);

    const dailyAttendance = useMemo(() => {
        return new Contract(process.env.REACT_APP_CONTRACT_DAILY_ATTENDANCE, DailyAttendanceAbi, provider);
    }, [provider]);
    const forwarder = useMemo(() => {
        return new Contract(process.env.REACT_APP_CONTRACT_FORWARDER, ForwarderAbi, provider);
    }, [provider])


    const getLastCheckIn = useCallback(async () => {
        try {
            const lastCheckedIn = await dailyAttendance.getLastCheckIn(walletAddress);
            const date = new Date(Number(lastCheckedIn) * 1000);
            setLastCheckIn(date.getTime());
        } catch (error) {
            // FIXME: handle error
            console.error(error);
        }
    }, [walletAddress, dailyAttendance]);
    void getLastCheckIn();

    useEffect(() => {
        if (isLoggedIn) {
            void getLastCheckIn();
        }
        return () => {
        };
    }, [isLoggedIn, getLastCheckIn]);


    const isTodayCheckAvailable = (totalCheck: number) => {
        return totalCheck === receivedStatus.reduce((a, b) => a + b)
    }
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

            const nonce = await forwarder.nonces(walletAddress);

            const checkInAvailable = await dailyAttendance.checkedInToday(walletAddress)
            if (!checkInAvailable) {
                alert("You already checked in today.")
                return;
            }

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
                <RewardContainer
                    key={item.id}
                    onClick={isLoggedIn && isTodayCheckAvailable(index) ? () => void signTypedData() : null}
                    style={{
                        cursor: isLoggedIn && isTodayCheckAvailable(index) ? 'pointer' : 'default',
                        border: isLoggedIn && isTodayCheckAvailable((index)) ? "2px solid white" : "2px solid transparent",
                    }}>
                    <RewardTitle>{item.title}</RewardTitle>
                    <RewardImage src={isLoggedIn && receivedStatus.reduce((a, b) => a + b) > index ? mega8 : mg8gray}
                                 alt=""/>
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
    padding: 10px;
    border-radius: 10px;
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
