const axios = require("axios");
const admin = require("../config/firebase-config").admin;
const {v4:uuidv4} = require('uuid');
  
const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

exports.send = async (req, res, next) => {
    const registrationToken = req.body.registrationToken
    const options = notification_options

    const message = {
        notification: {
          title: req.body.title,
          body: req.body.message
        }
    };

    admin.messaging().sendToTopic(req.body.topic, message, options).then( response => {
        res.status(200).send("Notificação enviada com sucesso!")
    }).catch( error => {
        console.log(error);
        res.status(500).send("Algo deu errado :(")
    });
    
    admin.firestore().collection("bell_history").add({
        Entrada: req.body.message.split(" ").reverse()[0],
        Hora: admin.firestore.Timestamp.now()
    })
}

exports.sendIntern = (title, message) => {
    const options = notification_options

    const messageObj = {
        notification: {
          title: title,
          body: message
        }
    };

    admin.messaging().sendToTopic("fcm_campainha", messageObj, options).then( response => {
        console.log("Notificação enviada com sucesso!")
    }).catch( error => {
        console.log(error);
        console.log("Algo deu errado :(")
    });
    
    admin.firestore().collection("BellHistory").add({
        Entrada: message.split(" ").reverse()[0],
        Hora: admin.firestore.Timestamp.now()
    })
}
