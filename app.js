const express = require('express')
const http = require("http")
const route = require('./routes/routes')
const { response } = require('express');
const { sendIntern } = require('./controller/notification')
var _ = require('lodash'); 

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
