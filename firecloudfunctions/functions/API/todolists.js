const { db } = require('./admin')

exports.getToDoLists = (request, response) => {
    todolists = [
        { 'id': '1', 'name': 'College work' },
        { 'id': '2', 'name': 'House work' },
        { 'id': '3', 'name': 'Workout' },
    ]
    return response.json(todolists);
}

exports.postToDoList = (request, response) => {
    var uid = request.body.uid;
    var id = request.body.id;
    var name = request.body.name;
    db.ref().child('Users').child(uid).child('todolists').child(id).set({ name: name }).catch((err) => { response.send('Error: ' + err) });
    response.send('ToDoList added');
}