function getUTCTime(){


    var now = new Date;
    let offsetMinute = now.getTimezoneOffset()

    // alert(offsetMinute)
    // var utc_timestamp = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() , 
    // now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
    //return utc_timestamp;

    return Date.now() - offsetMinute * 60 * 1000
    
}

function getTodayIdx(){

    return (new Date(Date.now() + (((new Date).getTimezoneOffset()) * 60 * 1000) + 9 * 60 * 1000 * 60).getDay() + 3) % 7;

}


function getNextUTCTime(offset){

    if(!offset) offset = 0;

    let nowTime = getUTCTime() + offset * 1000;

    //0시 = 0 * 60 * 60 * 1000, 12시 = 12 * 60 * 60 * 1000

    let dayDivider = 1000 * 60 * 60 * 24;

    let halfDivider = 1000 * 60 * 60 * 12;

    let remainderDayTime = nowTime%dayDivider;
    
    
    let remainRechargeTime = 9999999;

    if(remainderDayTime > halfDivider) //0시 충전 예정
    {
        remainRechargeTime = dayDivider - remainderDayTime;
    }
    else //12시 충전 예정
    {
        remainRechargeTime = halfDivider - remainderDayTime;
    }

    
    return Math.ceil(remainRechargeTime / 1000)

    
    


}


function getSecMeterToTime(sec){

    let secTime = (Math.floor(sec%60)+"").padStart(2, "0");
    sec = Math.floor(sec/60);
    let minTime = (sec%60+"").padStart(2, "0");
    sec = Math.floor(sec/60);
    let hourTime = (sec%60+"").padStart(2, "0");
  
    return hourTime + ":" + minTime + ":" + secTime
  
  
  }