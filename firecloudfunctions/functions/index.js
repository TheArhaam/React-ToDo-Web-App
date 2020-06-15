const functions = require('firebase-functions');
const app = require('express')();
const { getToDoLists, postToDoList, deleteToDoList, editToDoList } = require('./API/todolists')
const { postToDo, getToDos } = require('./API/todos')
const { postNewUser } = require('./API/user')

// RETURN JSON RESPONSES IF YOU HAVE PROBLEMS
// WITH THE RESPONSE LATER

// FOR USER
app.post('/user', postNewUser);

// FOR TODOLISTS
app.post('/todolists', postToDoList);
app.get('/todolists', getToDoLists);
app.post('/todolists/:listId', editToDoList);
app.delete('/todolists', deleteToDoList);
// Use this if you have problems calling the API from reactjs
// app.delete('/todolists/:toDoListId',deleteToDoList); 

// FOR TODOS
app.post('/todos', postToDo);
app.get('/todos', getToDos);


exports.api = functions.https.onRequest(app);