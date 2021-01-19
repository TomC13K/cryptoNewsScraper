require('dotenv').config()

const minClickWait = process.env.WAIT_CLICK_MIN;
const maxClickWait = process.env.WAIT_CLICK_MAX;

function getRandomClickTime() {
    return Math.floor(Math.random() * (maxClickWait - minClickWait + 1)) * 1000 + minClickWait * 1000;
}

async function sleep() {
    return new Promise(resolve => setTimeout(resolve, getRandomClickTime()));
}

module.exports.sleep = sleep;                           //export async classes like this... exports.name doesnt works for some reason