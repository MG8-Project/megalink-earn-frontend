import styled from "styled-components";
import {useEffect, useState} from "react";

interface RemainTimeProps {
    remainTime: number;
}

const RemainTime = (props: RemainTimeProps) => {
    const {remainTime} = props;
    const convertTime = (time: number) => {
        const date = new Date(time);
        const hours = date.getHours().toString().padStart(2, '0'); // 두 자리 수로 표시하고 앞에 0을 채움
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }
    const [time, setTime] = useState(convertTime(remainTime))
    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentTime = timeStringToSeconds(time) - 1;
            setTime(secondsToTimeString(currentTime));
        }, 1000);
        return () => clearInterval(intervalId);
    }, [time]);
    const timeStringToSeconds = (timeString: string): number => {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    };
    const secondsToTimeString = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (<RemainWrapper>
        <StyledTitle>Remaining until Airdrop</StyledTitle>
        <TimeWrapper>{time}</TimeWrapper>
        <TimeWrapper></TimeWrapper>
    </RemainWrapper>)
}
export default RemainTime

const RemainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
`
const StyledTitle = styled.div`
`
const TimeWrapper = styled.div`
    padding: 10px;

`