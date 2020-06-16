const admin = require('firebase-admin');

admin.initializeApp();

const firedb = admin.database();

module.exports = { admin, firedb };