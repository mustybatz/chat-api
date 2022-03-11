const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL;

const Database = {
    dbInstance: null,
    connect: () => {
        return new Promise((accept, reject) => {
            MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
                if (err) {
                    console.error(err);
                    reject(new Error('Error connecting to database'));
                } else {
                    this.dbInstance = client.db();
                    accept(client); // ya termine
                }
            }); //Error-first callback
        });
    },
    collection: (name) => {
        return this.dbInstance.collection(name);
    }
};

module.exports = Database;