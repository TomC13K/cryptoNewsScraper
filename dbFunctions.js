const mongoose = require('mongoose');
const NewsArticles = require("./model/NewsModel");

require('dotenv').config()

const mongoUSER = process.env.DB_USER
const mongoPW = process.env.DB_PW
const mongoDB = process.env.DB_NAME

async function connectToMongoAtlasDB() {
    //connection string from Atlas
    //mongodb+srv://<username>:<password>@cryptonewscluster.d9dsf.mongodb.net/<dbname>?retryWrites=true&w=majority
    await mongoose.connect(
        `mongodb+srv://${mongoUSER}:${mongoPW}@cryptonewscluster.d9dsf.mongodb.net/${mongoDB}?retryWrites=true&w=majority`,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    );
    console.log("connected to remote DB")
}

async function addDataToDB(data) {
    console.log("Adding data to DB...");
    const newsModel = new NewsArticles(data);
    
    console.log("Saving data to DB...");
    await newsModel.save();
    
    console.log("\x1b[32m%s\x1b[0m", "Data successfully saved in DB !");
}


module.exports.connectToMongoAtlasDB = connectToMongoAtlasDB;
module.exports.addDataToDB = addDataToDB;  