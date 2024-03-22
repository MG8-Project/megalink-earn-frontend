import styled from "styled-components";
import {DayRewordList} from "../../constants";
import {useAuthStore} from "../../store/authStore";
import {Contract, BrowserProvider, ethers, toBeHex} from "ethers";
import {ForwarderAbi} from "../../typechain-types/contracts/Forwarder";
import { mega8, mg8gray} from "../../assets/images";
import {DailyAttendanceAbi} from "../../typechain-types/contracts/DailyAttendance";
import API from "../../apis/Api";
import { useEffect, useState } from "react";
import ApiDaily from "../../apis/ApiDaily";

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

export type Message = {}

const Reward = () => {
    const walletAddress = useAuthStore(state => state.userAccount);
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const signTypedData = async () => {
        try {
            // if (!isLoggedIn) {
            //     alert("Please login first.")
            //     return;
            // }
            const currentTimestamp = Math.floor(new Date().getTime() / 1000);
            const oneWeekInSeconds = 60;
            const futureTimestamp = currentTimestamp + oneWeekInSeconds;
            const uint48Value = ethers.toNumber(futureTimestamp);

            const chainId = await window.ethereum.request({method: "eth_chainId"});

            if (chainId.toString() !== DOMAIN_SEPARATOR.chainId.toString()) {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{chainId: toBeHex(DOMAIN_SEPARATOR.chainId.toString()).toString()}]
                })
            }

            const provider = new BrowserProvider(window.ethereum);
            const forwarder = new Contract(process.env.REACT_APP_CONTRACT_FORWARDER, ForwarderAbi, provider);
            const nonce = await forwarder.nonces(walletAddress);
            const dailyAttendance = new Contract(process.env.REACT_APP_CONTRACT_DAILY_ATTENDANCE, DailyAttendanceAbi, provider);
            const message =  {
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
                        { name: "name", type: "string" },
                        { name: "version", type: "string" },
                        { name: "chainId", type: "uint256" },
                        { name: "verifyingContract", type: "address" },
                    ],
                    ForwardRequest: [
                        { name: "from", type: "address" },
                        { name: "to", type: "address" },
                        { name: "value", type: "uint256" },
                        { name: "gas", type: "uint256" },
                        { name: "nonce", type: "uint256" },
                        { name: "deadline", type: "uint48" },
                        { name: "data", type: "bytes" },
                    ],
                }
            const res = await API.post(process.env.REACT_APP_API_PERSONAL_CHECK, {
                userAccount: walletAddress,
                param,
            }, {
                headers: {
                    "Authorization": "application/json",
                }
            });

            alert("Successfully checked in.\nYour transaction hash is " + res.data.txHash)
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
          fetchReceivedStatus();
        }
        return () => {
        };
      }, [isLoggedIn, walletAddress]);
    return (
        <RewardWrapper>
            {DayRewordList.map((item, index) => (
                <RewardContainer key={item.id} onClick={() => index === currentDay && signTypedData()}>
                    <RewardTitle>{item.title}</RewardTitle>
                    <RewardImage src={receivedStatus[index] === 1 ? mega8 : mg8gray} alt="" />
                    <RewardPrice>{item.point}</RewardPrice>
                    {/* <RewardRequest onClick={signTypedData}>Get</RewardRequest> */}
                </RewardContainer>
            ))}
        </RewardWrapper>
    );
};

export default Reward;

const RewardRequest = styled.button`
     align-items: center;
     justify-content: center;
     text-align: center;
     font-weight: 400;
     height: 40px;
     border-radius: 100px;
     border: 0.5px solid #656262;
     margin: auto;
     padding: 0 16px;
     font-size: 16px;
`;

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
