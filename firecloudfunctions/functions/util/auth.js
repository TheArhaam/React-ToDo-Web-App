const { admin, firedb } = require('./admin');

exports.auth = (request, response, next) => {
    let idToken;

    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
        idToken = request.headers.authorization.split('Bearer ')[1];
        console.log('iDToken: '+idToken);
    } else {
        console.error('No token found');
        return response.json({ error: 'Unauthorized' });
    }

    admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
            request.user = decodedToken;
            // return firedb.collection('users').where('userId', '==', request.user.uid).limit(1).get();
            return firedb.ref().child('Users').child(request.user.uid).once('value').then((snapshot) => { return snapshot });
        })
        .then((data) => {
            // request.user.username = data.docs[0].data().username;
            // request.user.imageUrl = data.docs[0].data().imageUrl;
            request.user.username = data.key;
            return next();
        })
        .catch((err) => {
            console.error('Error while verifying token', err);
            return response.json(err);
        });

    // return response.send("AUTH DONE");
};