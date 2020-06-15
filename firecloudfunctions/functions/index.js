const functions = require('firebase-functions');
const app = require('express')();
const { getToDoLists, postToDoList } = require('./API/todolists')
const {postNewUser} = require('./API/user')


app.get('/todolists',getToDoLists);
app.post('/user',postNewUser);
app.post('/todolists',postToDoList);
exports.api = functions.https.onRequest(app);