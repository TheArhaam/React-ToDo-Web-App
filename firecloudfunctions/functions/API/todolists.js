// FOR TODOLISTS
const { firedb } = require('./admin')


// TO ADD NEW TODOLIST
exports.postToDoList = (request, response) => {
    var uid = request.body.uid;
    var id = request.body.id;
    var name = request.body.name;
    var addedTime = new Date().toISOString();

    firedb.ref()
        .child('Users')
        .child(uid)
        .child('todolists')
        .child(id)
        .set({ name: name, addedTime: addedTime ,todos: 'null'})
        .catch((err) => { response.send('Error: ' + err) });

    response.send('ToDoList added');
}

// TO GET TODO LISTS
exports.getToDoLists = (request, response) => {
    var uid = request.query.uid;

    firedb.ref()
        .child('Users')
        .child(uid)
        .child('todolists')
        .orderByChild('addedTime')
        .once('value')
        .then((snapshot) => {
            todolists = []
            snapshot.forEach((element) => {
                todolists.push({
                    id: element.key,
                    name: element.val().name,
                })
            });
            return response.json(todolists);
        })
        .catch((err) => {
            // console.log(err);
            response.send('Error: ' + err);
        });

}


// TO EDIT TODOLIST
exports.editToDoList = (request, response) => {
    var uid = request.body.uid;
    var id = request.body.id;
    var name = request.body.name;

    firedb.ref()
        .child('Users')
        .child(uid)
        .child('todolists')
        .child(id)
        .child('name')
        .set(name)
        .catch((err) => {
            // console.log(err);
            response.send('Error: ' + err);
        });

    response.send('List Updated');
}

// TO DELETE TODO LIST
exports.deleteToDoList = (request, response) => {
    var uid = request.query.uid;
    var id = request.query.id;

    firedb.ref()
        .child('Users')
        .child(uid)
        .child('todolists')
        .child(id)
        .remove()
        .catch((err) => {
            // console.log(err);
            response.send('Error: ' + err);
        });

    response.send('List Deleted');
}