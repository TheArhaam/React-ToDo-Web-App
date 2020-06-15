// FOR TODOS
const { firedb } = require('./admin')

// TO ADD NEW TODO
exports.postToDo = (request, response) => {
    var uid = request.body.uid;
    var listid = request.body.listid;
    var todoid = request.body.todoid;
    var text = request.body.text;
    var addedTime = new Date().toISOString();

    firedb.ref()
        .child('Users')
        .child(uid)
        .child('todolists')
        .child(listid)
        .child('todos')
        .child(todoid)
        .set({ text: text, addedTime: addedTime, done: 'false' })
        .catch((err) => { response.send('Error: ' + err) });

    response.send('ToDo added');
}