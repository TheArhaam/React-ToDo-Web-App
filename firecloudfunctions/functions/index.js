const functions = require('firebase-functions');
const app = require('express')();
const { getToDoLists, postToDoList, editToDoList, deleteToDoList } = require('./API/todolists')
const { postToDo, getToDos, editToDo, deleteToDo } = require('./API/todos')
const { postNewUser, postExistingUser } = require('./API/user')
const { auth } = require('./util/auth')

// RETURN JSON RESPONSES IF YOU HAVE PROBLEMS
// WITH THE RESPONSE LATER

// FOR USER
app.post('/user/new', postNewUser);
app.post('/user/existing',postExistingUser);

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
app.post('/todos/:todoid', editToDo);
app.delete('/todos', deleteToDo)

exports.api = functions.https.onRequest(app);