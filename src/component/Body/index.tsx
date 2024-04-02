import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Wallet from "../Wallet";
import Status from "../Status";
import Daily from "../Daily";
import Spin from "../Spin";
import LeaderBoard from "../LeaderBorad";
import API from "../../apis/Api";

interface Response {
    status: string;
    data: {
        resultCode: string,
        msg: string,
        paused: boolean
    }
}

const Body = () => {
    const [isAirDropPaused, setIsAirDropPaused] = useState(false);
    useEffect(() => {
        const fetchIsAirdropPaused = async () => {
            try {
                const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/infiniteSpin/mega8/airdrop/isPaused`
                const res: Response = await API.get(API_ENDPOINT)
                setIsAirDropPaused(res.data.paused)
            } catch (err) {
                console.error(err)
            }
        }
        void fetchIsAirdropPaused()
    }, []);
    return (
        <BodyWrapper>
            <Spin/>
            <Daily/>
            <LeaderBoard/>
            {isAirDropPaused ? null : <Wallet/>}
            <Status/>
        </BodyWrapper>
    );
};

export default Body;
const BodyWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 320px;
`;
