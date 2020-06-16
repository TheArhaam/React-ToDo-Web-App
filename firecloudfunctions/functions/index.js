const functions = require('firebase-functions');
const app = require('express')();
const { getToDoLists, postToDoList, editToDoList, deleteToDoList } = require('./API/todolists')
const { postToDo, getToDos, editToDo, deleteToDo } = require('./API/todos')
const { postNewUser, postExistingUser } = require('./API/user')
const { auth } = require('./util/auth')

// RETURN JSON RESPONSES IF YOU HAVE PROBLEMS
// WITH THE RESPONSE LATER
// FIX THE RESPONSES

// FOR USER
app.post('/user/new', postNewUser);
app.post('/user/existing',postExistingUser);

// FOR TODOLISTS
app.post('/todolists', auth, postToDoList);
app.get('/todolists', auth, getToDoLists);
app.post('/todolists/:listId', auth, editToDoList);
app.delete('/todolists', auth, deleteToDoList);
// Use this if you have problems calling the API from reactjs
// app.delete('/todolists/:toDoListId',deleteToDoList); 

// FOR TODOS
app.post('/todos', auth, postToDo);
app.get('/todos', auth, getToDos);
app.post('/todos/:todoid', auth, editToDo);
app.delete('/todos', auth, deleteToDo)

exports.api = functions.https.onRequest(app);