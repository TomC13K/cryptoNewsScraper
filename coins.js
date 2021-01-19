require('dotenv').config()

const altCoins = process.env.ALTCOINS.split(",");
const topCoins = process.env.TOPCOINS.split(",");
const searchTopCoins = [];



if (topCoins[topCoins.length - 1] === "") {
    topCoins.pop();
}


splitCoinNameCode = (coinWithCode) => {
    const coinArray = coinWithCode.split("-");

    const coinNameVar = coinArray[0].toLowerCase();
    const coinCodeVar = coinArray[1].toUpperCase();

    return JSON.stringify({
        coinName: coinNameVar,
        codeCode: coinCodeVar
    });
}


topCoins.forEach(coin => {
    searchTopCoins.push(JSON.parse(splitCoinNameCode(coin)));
});

//console.log(searchTopCoins);