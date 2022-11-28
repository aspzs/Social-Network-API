const addDateSuffix = (date) => {
    let dateStr =date.toString();

    //Getting last char of dateString
    const lastChar = dateStr.charAt(dateStr.length - 1);

    if(lastChar === '1' && dateStr !== '11'){
        dateStr = `${dateStr}st`;
    } else if (lastChar === '2' && dateStr !== '12') {
        dateStr = `${dateStr}nd`; 
    } else if (lastChar === '3' && dateStr !== '13') {
        dateStr = `${dateStr}rd`;
    } else {
        dateStr = `${dateStr}th`;
    }

    return dateStr;
};

module.exports = (
    timeStamp, 
    { monthLength = 'short', dateSuffix = true} = {}
) => {
    let months;

    if(monthLength === 'short') {
        months = {
            0: 'Jan',
            1: 'Feb',
            2: 'Mar',
            3: 'Apr',
            4: 'May',
            5: 'Jun',
            6: 'Jul',
            7: 'Aug',
            8: 'Sept',
            9: 'Oct',
            10: 'Nov',
            11: 'Dec'
        };
    } else {
        months = {
            0: 'January',
            1: 'Febrary',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'August',
            8: 'September',
            9: 'October',
            10: 'November',
            11: 'December'
        };
    }

    const dateObj = new Date(timeStamp);
    const formattedMonth = months[dateObj.getMonth()];

    const dayOfMonth = dateSuffix ? addDateSuffix(dateObj.getDate()) : dateObj.getDate();

    const year = dateObj.getFullYear();

    let hour = dateObj.getHours() > 12 ? Math.floor(dateObj.getHours() -12) : dateObj.getHours();

    if (hour === 0) {
        hour = 12;
    }

    const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();

    //Set am or pm

    let periodOfDay;

    if(dateObj.getHours() >= 12){
        periodOfDay = 'pm';
    } else {
        periodOfDay = 'am';
    }

    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay} `;

    return formattedTimeStamp;
}