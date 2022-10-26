const express = require('express')
const http = require("http")
const route = require('./routes/routes')
const fs = require("fs");
const { response } = require('express');
const { sendIntern } = require('./controller/notification')
var _ = require('lodash'); 
//const sequelize = require("./database/database")

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.redirect('/view/index.html')
})

app.get("/download", (req, res) => {
    var file = fs.readFileSync(__dirname + "\\download\\smartlock.apk", 'binary');

    //res.setHeader('Content-Length', ;
    res.setHeader('Content-Type', 'application/apk');
    res.setHeader('Content-Disposition', 'attachment; filename=smartlock.apk');
    res.write(file, 'binary');
    res.end();
})

app.get('/hell', (req, res) => {

    const parser = port.pipe(new Readline({ delimiter: '\n' }));
    // Read the port data
    port.on("open", () => {
        console.log('serial port open');
    });
    parser.on('data', data => {
        console.log('got word from arduino:', data);
    });
    port.write('LED', (err) => {
        if (err) {
            res.send("err")
            return console.log('Error on write: ', err.message);
        }
        console.log('message written');

        res.send("Porta Aberta")
    });

})

app.use('/view', express.static(__dirname + '\\view'));

app.use('/api', route)

app.use((request, response, next) => {
    response.status(404).send()
})

app.use((error, request, response, next) => {
    response.status(500).json({
        error
    })
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})


const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const port = new SerialPort('\\\\.\\COM3', { autoOpen: false, baudRate: 9600 });
if (!port.isOpen) {
    port.open(function (err) {
        if (err) {
            console.log('Error opening port: ', err.message)
        }
    })
}

var allowed = true;
var count = 0;
const parser = port.pipe(new Readline({ delimiter: '\n' }));
// Read the port data
port.on("open", () => {
    console.log('serial port open');
});
parser.on('data', data => {
    if (data == 1) {
        count++;
        if(count>30 && allowed){
            count=0;
            allowed=false;
            
            sendIntern("Arcana Bell", "Alguém se encontra na Campainha Arduíno")

            setTimeout(() => {
                allowed=true;
            }, 500);
        }
    }
});

