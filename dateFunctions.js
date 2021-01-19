
exports.isToday = date => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };                //https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
    const today = new Date().toLocaleDateString("en-UK", options);

    const returnDate = (today === date) ? true : false;
    return returnDate;
}
exports.isYesterday = date => {
    const datePassed = new Date(date);
    datePassed.setHours(0, 0, 0, 0);

    const yesterday = new Date();
    yesterday.setHours(0, 0, 0, 0);
    yesterday.setDate(yesterday.getDate() - 1);

    const returnDate = (datePassed.valueOf() === yesterday.valueOf()) ? true : false;
    return returnDate;
}