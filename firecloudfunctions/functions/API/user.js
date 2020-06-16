// FOR USER
const { admin, firedb } = require('../util/admin')
const config = require('../util/firebaseconfig');
const firebase = require('firebase');
firebase.initializeApp(config);

// FOR REGISTERING A NEW USER
exports.postNewUser = (request, response) => {
    var email = request.body.email;
    var password = request.body.pass;
    var token, uid;
    console.log("POST NEW USER");
    console.log("email: " + email);
    console.log("password: " + password);

    firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((data) => {
            uid = data.user.uid;
            // console.log("uid: " + uid);
            return data.user.getIdToken();
        })
        .then((idtoken) => {
            token = idtoken;
            // console.log("token: " + token)
            return firedb.ref()
                .child('Users')
                .child(uid)
                .set({ todolists: 'null' })
                .catch((err) => { response.send('Error: ' + err) });
        })
        .then(() => {
            return response.json({ token });
        })
        .catch((err) => {
            if (err.code === 'auth/email-already-in-use') {
                return response.status(400).json({ message: 'Email already in use' });
            } else {
                return response.status(500).json({ message: 'Something went wrong, please try again' });
            }
        });

    // response.send('User added');
}

// FOR LOGGING IN
exports.postExistingUser = (request, response) => {
    var email = request.body.email;
    var password = request.body.pass;
    var uid;

    firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then((data) => {
            uid = data.user.uid;
            return data.user.getIdToken();
        })
        .then((token) => {
            return response.json({ token, uid });
        })
        .catch((error) => {
            console.error(error);
            return response.status(403).json({ general: 'wrong credentials, please try again' });
        });

}

