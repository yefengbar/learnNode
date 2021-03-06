const indexCollection = function (db, callback) {
    db.collection('documents').createIndex(
        {"a": 1},
        null,
        function (err, results) {
            console.log(results);
            callback();
        }
    );
};
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

const dbName = 'myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    insertDocuments(db, function () {
        indexCollection(db, function () {
            client.close();
        });
    });
});