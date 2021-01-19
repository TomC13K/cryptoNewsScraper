isYesterday = date => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    //const dateString = date;
    const datePassed = new Date(date);
    datePassed.setHours(0,0,0,0);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setHours(0,0,0,0);
    //const older = new Date();

    yesterday.setDate(yesterday.getDate() - 1);
   // older.setDate(older.getDate() - 2);
    //yesterday.toLocaleDateString("en-UK", options);

    const returnDate = (datePassed.valueOf() === yesterday.valueOf()) ? true : false;

    console.log("today  " + today );
    console.log("passed " + dateString + "\n");
    console.log(">> " + datePassed);
    console.log(">> " + yesterday);
    //console.log(older);
    console.log(returnDate);

    return returnDate;
}

//isYesterday('Jan 17, 2021');
//isYesterday('Jan 15, 2021');



isToday = date => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };                //https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
    const today = new Date().toLocaleDateString("en-UK", options);
    const returnDate = (today === date) ? true : false;
    console.log(returnDate);
    console.log(date);
    console.log(today);
    return returnDate;
}

//isToday('Jan 18, 2021');