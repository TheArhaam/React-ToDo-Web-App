const functions = require('firebase-functions');
const app = require('express')();
var cors = require('cors');
app.use(cors());
const { getToDoLists, postToDoList, editToDoList, deleteToDoList } = require('./API/todolists')
const { postToDo, getToDos, postToDoDone, editToDo, deleteToDo } = require('./API/todos')
const { postNewUser, postExistingUser } = require('./API/user')
const { auth } = require('./util/auth')

// FOR USER
app.post('/user/new', postNewUser);
app.post('/user/existing', postExistingUser);

// FOR TODOLISTS
app.post('/todolists', auth, postToDoList);
app.get('/todolists', auth, getToDoLists);
app.post('/todolists/edit', auth, editToDoList);
app.delete('/todolists', auth, deleteToDoList);

// FOR TODOS
app.post('/todos', auth, postToDo);
app.get('/todos', auth, getToDos);
app.post('/todos/done',auth,postToDoDone)
app.post('/todos/edit', auth, editToDo);
app.delete('/todos', auth, deleteToDo)

exports.api = functions.https.onRequest(app);