const functions = require('firebase-functions');
const app = require('express')();
const { getToDoLists } = require('./API/todolists')
const {postNewUser} = require('./API/user')
// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
app.get('/todolists',getToDoLists);
app.post('/user',postNewUser)
exports.api = functions.https.onRequest(app);