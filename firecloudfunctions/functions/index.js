const functions = require('firebase-functions');
const app = require('express')();
const { getToDoLists, postToDoList, deleteToDoList, editToDoList } = require('./API/todolists')
const {postNewUser} = require('./API/user')

// RETURN JSON RESPONSES IF YOU HAVE PROBLEMS
// WITH THE RESPONSE LATER

// FOR TODOLISTS
app.get('/todolists',getToDoLists);
app.post('/todolists',postToDoList);
app.delete('/todolists',deleteToDoList);
app.post('/todolists/:listId',editToDoList);
// Use this if you have problems calling the API from reactjs
// app.delete('/todolists/:toDoListId',deleteToDoList); 

// FOR USER
app.post('/user',postNewUser);

exports.api = functions.https.onRequest(app);