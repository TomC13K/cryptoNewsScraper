const mongoose = require("mongoose");

const NewsArticlesSchema = new mongoose.Schema({
    newsTitle: String,
    newsUrl: String,
    newsDate: String,
    isTodayDate: Boolean,
    isYesterdayDate: Boolean,
    newsText:String
});

const NewsArticles = mongoose.model("NewsArticles", NewsArticlesSchema);
module.exports = NewsArticles;