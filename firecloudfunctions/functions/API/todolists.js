const { db } = require('./admin')

// TO GET TODO LISTS
exports.getToDoLists = (request, response) => {
    todolists = [
        { 'id': '1', 'name': 'College work' },
        { 'id': '2', 'name': 'House work' },
        { 'id': '3', 'name': 'Workout' },
    ]

    return response.json(todolists);
}

// TO ADD NEW TODOLIST
exports.postToDoList = (request, response) => {
    var uid = request.body.uid;
    var id = request.body.id;
    var name = request.body.name;
    var addedTime = request.body.addedTime;

    db.ref()
        .child('Users')
        .child(uid)
        .child('todolists')
        .child(id)
        .set({ name: name, addedTime: addedTime })
        .catch((err) => { response.send('Error: ' + err) });

    response.send('ToDoList added');
}