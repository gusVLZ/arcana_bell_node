const functions = require("firebase-functions");
var admin = require("firebase-admin");

exports.sendNotification = functions.https.onRequest((req, res) => {
    var serviceAccount = {
        "type": "service_account",
        "project_id": "arcanabell-6c682",
        "private_key_id": "69bf558e4652b3847deca8a7292c5da995880ce5",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCUQjH9EK/vx2py\nq786G8mFRvZnqwrVegPMMwEASMIsgObuVNoHk5ZtQf/P83zBJJcsfhzrCKqqBJ01\n3Xx7k9JhrBB3gZ7cOJP4JMPzKKhGaHAAnm9ZKaa+v4kerJ6aS2YWucN0GU5vqGvl\nj3tIkN420A+G5+9zMz+xuDp9B3NLn4QniSoCIlOyr08cijPLECgPPI/dNpqzOBah\n5lj6UD9eS2VsHRKsARyImLRF7POfXyJQqvKUhj2BxaeXaSC/zOKrNs6XXVYrN6VD\nyawMIQf2USkBhVEix6vdw9nvlsypN51MGAufoRxe+0ruf2Jry9hYHAB6psSk7LHZ\na7Oju9QfAgMBAAECggEABp3xtzbAc3Y2BQovTbuhweYJ51SV9jMs6jc4ize0GuJh\n7C8zT/VBWH0CmthmMASfDqhOSBsp6s6r6ZSKEsXlNODGF19cpL2NtRyG9lpRMFtG\n7HAlzhfyzj6kMw9HQOGum8MMuyjJ/GfK8QL3YKS+ljmxB7dgU4btB9SOH7huZ+iU\nSFBkpNeC/8N8FqToMHTW4GVlxCXZlGWf70pjD+UvdazKpZcoM4pZRUH1NhsNb9am\nVKe5ZJo4XCliRDc/fHecGp5rhbb1iRp9AOdDKaXkdjt8kjdF50w/+F0A2ELbZQI/\nMkq7XZVSdu8I4hDtL3TALz91zbHOryOGGP2qQ44hGQKBgQDLb3bOsbAL3sPgif6y\n1x7+3t0TLpVZALaqscvsEyyftbPus4PBDXYXIqvVqoH3Wcbhy8G9GpAFuWuO/5Th\nxeQUkx1G85fhRiU/u3NXyRZU/9odfqGpzmc1XKSTlA58YXCBPEBI4bPX1ZXItjPh\n+qL2iD4h3bZkqOORozYRkEBSOwKBgQC6kPphKFkWneBqzDjPg+mEdADGU9D6yIsF\nG5K8hcsyLno0FXnquH0fKfQBWPdSfW0AbUaAoPFR6whmsnpjPCeYbGyprHs3cweI\n218pu/3S5apZhNQQevXWov7JRDC8HlLzZ6INdSLqBGhptIEhXD9oEeON0Tko2cvt\nfekHlORjbQKBgQDDxj/ih/MwaS+9vW8j8ov8oMLF+/Vz0pD30eS6CnXOONGw7Ibl\n2SuE9jPBirZKMNaJY0nNz2s8ZwVQdztyzrtA5ZauOiw2egfMvnswxu673ACuk7fG\nL0D5hG9JKpmKL0dSx4Xh3XryQbRElLt3RHlhoRmSA8jMNA/Ujumwm06bEwKBgQCZ\n1mIfKz4KwDQE3FEcDBHJ/j2FTCfOIv8/PvVILqrWvixWNj9JpMbHo7hoRAvsITB4\nYaL4/bz/Z2aOCC2TFk8wCHexkWAo4NkdqIZXy4QJGwfUuQqEbF+6lLyzCV+GPxr3\nSkT+A9C+VtQiFY1FDOPb1KRmlFclsDHPqzsz3TpWIQKBgHjH/P0O87V46FXa08J1\n8//Z/jiW0wsV8QTl0K8NOkpiqFNDzXj8gewB5fkhNhsK2+7YQTMR9WI8nr9lyC8Y\nAtxCi0cNTQuOyD3jDiSK/M+NtQOA9v/B55bW6wT5Onpnn8nXSaO+UbLPaHpcj/0J\nMdD0XmEpKKU/kcYgfGBJdUfs\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-ztch5@arcanabell-6c682.iam.gserviceaccount.com",
        "client_id": "106141659498509819863",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ztch5%40arcanabell-6c682.iam.gserviceaccount.com"
    }
    try {

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://arcanabell-6c682-default-rtdb.firebaseio.com"
        });

    } catch (e) {
        console.log(e)
    }

    const notification_options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };
    const options = notification_options
    try {


        const bellMac = req.body.topic.split("_")[1]


        functions.logger.log("Recebido notificação da campainha: ", bellMac);
        admin.firestore().collection("bell").doc(bellMac).get().then(async bell => {

            functions.logger.log("Consulta no firestore retornou: ", bell.get("description"));

            const historyItem = await admin.firestore().collection("bell_history").add({
                bell: bellMac,
                title: bell.get("description"),
                users: bell.get("users"),
                datetime: admin.firestore.Timestamp.now()
            });

            const message = {
                notification: {
                    id: historyItem.id,
                    title: `ArcanaBell`,
                    body: `Alguém se encontra na campainha ${bell.get("description")}`
                }
            };
            await admin.messaging().sendToTopic(req.body.topic, message, options).then(response => {
                res.json({ result: `Notificação enviada com sucesso!` });
            }).catch(error => {
                functions.logger.error("Erro: ", error);
                console.log(error);
                res.json({ result: `Algo deu errado :(` });
            });

        });
    } catch (error) {
        functions.logger.error("Erro: ", error);
        res.json({ result: `Algo deu errado :(` });
    }
});