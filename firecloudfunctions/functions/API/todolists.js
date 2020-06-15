const { db } = require('./admin')

// TO GET TODO LISTS
exports.getToDoLists = (request, response) => {
    var uid = request.body.uid;

    todolists = []

    db.ref().child('Users').child(uid)
    return response.json(todolists);
}

// TO ADD NEW TODOLIST
exports.postToDoList = (request, response) => {
    var uid = request.body.uid;
    var id = request.body.id;
    var name = request.body.name;
    var addedTime = new Date().toISOString();

    db.ref()
        .child('Users')
        .child(uid)
        .child('todolists')
        .child(id)
        .set({ name: name, addedTime: addedTime })
        .catch((err) => { response.send('Error: ' + err) });

    response.send('ToDoList added');
}