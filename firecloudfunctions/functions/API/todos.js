// FOR TODOS
const { firedb } = require('../util/admin')

// TO ADD NEW TODO
exports.postToDo = (request, response) => {
    var uid = request.body.uid;
    var listid = request.body.listid;
    var todoid = request.body.todoid;
    var text = request.body.text;
    var addedTime = new Date().toISOString();

    console.log(request.user.username);

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

// TO GET TODOS
exports.getToDos = (request, response) => {
    var uid = request.query.uid;
    var listid = request.query.listid;

    firedb.ref()
        .child('Users')
        .child(uid)
        .child('todolists')
        .child(listid)
        .child('todos')
        .orderByChild('addedTime')
        .once('value')
        .then((snapshot) => {
            todos = []
            snapshot.forEach((element) => {
                console.log('element key' + element.key);
                console.log('element name' + element.val().name);
                console.log('element addedTime' + element.val().addedTime);
                todos.push({
                    id: element.key,
                    text: element.val().text,
                })
            });
            return response.json(todos);
        })
        .catch((err) => {
            // console.log(err);
            response.send('Error: ' + err);
        });
}

// TO EDIT TODO
exports.editToDo = (request, response) => {
    var uid = request.body.uid;
    var listid = request.body.listid;
    var todoid = request.body.todoid;
    var text = request.body.text;

    firedb.ref()
        .child('Users')
        .child(uid)
        .child('todolists')
        .child(listid)
        .child('todos')
        .child(todoid)
        .child('text')
        .set(text)
        .catch((err) => { response.send('Error: ' + err) });

    response.send('ToDo Updated');
}

// TO DELETE TODO
exports.deleteToDo = (request, response) => {
    var uid = request.body.uid;
    var listid = request.body.listid;
    var todoid = request.body.todoid;

    
    firedb.ref()
        .child('Users')
        .child(uid)
        .child('todolists')
        .child(listid)
        .child('todos')
        .child(todoid)
        .remove()
        .catch((err) => { response.send('Error: ' + err) });

    response.send('ToDo Deleted');
}