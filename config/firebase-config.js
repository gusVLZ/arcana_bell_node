var admin = require("firebase-admin");

var serviceAccount = require("../arcana-auth-firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://arcanabell-6c682-default-rtdb.firebaseio.com"
})

module.exports.admin = admin