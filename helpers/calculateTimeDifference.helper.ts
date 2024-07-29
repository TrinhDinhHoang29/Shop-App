export const calculateTimeDifference = (pastTime)=> {
    const pastDate:any = new Date(pastTime);
    const currentDate:any = new Date();
  
    const differenceInMilliseconds = currentDate - pastDate;
  
    const millisecondsInSecond = 1000;
    const millisecondsInMinute = millisecondsInSecond * 60;
    const millisecondsInHour = millisecondsInMinute * 60;
    const millisecondsInDay = millisecondsInHour * 24;
  
    const days = Math.floor(differenceInMilliseconds / millisecondsInDay);
    const hours = Math.floor((differenceInMilliseconds % millisecondsInDay) / millisecondsInHour);
    const minutes = Math.floor((differenceInMilliseconds % millisecondsInHour) / millisecondsInMinute);
  
    if(days>0)
        return `${days}d`;
    else if (hours>0)
        return `${hours}h`;
    else 
        return `${minutes}m`;
}