const { db } = require('./admin')

exports.postNewUser = (request, response) => {
    var uid = String(request.body.uid);
    db.ref().child('Users').child(uid).set({ todolists: 'null' }).catch((err) => { response.send('Error: ' + err) });
    response.send('User added');
}
