const { db } = require('./admin')

// TO GET TODO LISTS
exports.getToDoLists = (request, response) => {
    var uid = request.query.uid;

    db.ref()
        .child('Users')
        .child(uid)
        .child('todolists')
        .orderByChild('addedTime')
        .once('value')
        .then((snapshot) => {
            todolists = []
            snapshot.forEach((element) => {
                todolists.push({
                    id: element.val().id,
                    name: element.val().name,
                    addedTime: element.val().addedTime
                })
            });
            return response.json(todolists);
        })
        .catch((err) => {
            // console.log(err);
            response.send('Error: ' + err);
        });

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