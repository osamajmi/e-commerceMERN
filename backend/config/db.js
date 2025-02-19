
const {MongoClient} = require("mongodb")

const Client = new MongoClient(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = Client;