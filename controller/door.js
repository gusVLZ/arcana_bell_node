const axios = require("axios");

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const logTable = require("../model/logTable");

const port = new SerialPort('\\\\.\\COM4', {autoOpen:false, baudRate: 9600 });
if(!port.isOpen){
    port.open(function (err) {
        if (err) {
          console.log('Error opening port: ', err.message)
        }
    })
}

exports.logTabela = async (req, res, next) => {
    console.log("Tentou logar")
    var resp = false;
    logTable.findAll({
        limit:20,
        order:[
            ["id","DESC"]
        ]
    }).then(u=>{
        resp = u.length > 0;
        if(resp){
            res.status(200).send(u);
        }else{
            res.status(401).send("Credenciais inválidas")
        }
    }).catch(err=>{
        res.status(500).send("Erro no servidor")
    })
}

exports.openDoor = async (req, res, next) => {
    let username = req.params.username;
    if(!port.isOpen){
        port.open(function (err) {
            if (err) {
              res.status(500).send("err");
              return console.log('Error opening port: ', err.message)
            }
        })
    }
    const parser = port.pipe(new Readline({ delimiter: '\n' }));
    
    var resp = "";

    // Read the port data
    port.on("open", () => {
    console.log('serial port open');
    });
    parser.on('data', data =>{
    console.log('got word from arduino:', data);
    });
    port.write('LED', null,(err) => {
        if (err) {
            res.status(500).send("Erro ao abrir a porta")
            return console.log('Error on write: ', err.message);
        }
        
        logTable.create({
            "ds_objeto": "connection",
            "ds_descricao": username+" abriu a porta"
        });

        res.send("Porta aberta com sucesso")
    });

    /*await axios.get("http://25.15.20.71:3000/api/opendoor").then(res =>{
        
        logTable.create({
            "ds_objeto": "connection",
            "ds_descricao": req.hostname+" Usuario ligou o LED"
        });
        resp="A porta foi aberta com sucesso";

    }).catch(error =>{
        
        logTable.create({
            "ds_objeto": "connection",
            "ds_descricao": req.hostname+" Usuário não conseguiu ligar o LED"
        });
        res.status(500).send("Erro: "+error.message);

    })*/
}

exports.closeDoor = async (req, res, next) => {
    var resp = "";
    logTable.create({
        "ds_objeto": "connection",
        "ds_descricao": req.hostname+" Usuario está conectando ao IOT"
    });
    
    await axios.get("http://25.15.20.71:3000/api/closedoor").then(res =>{
        
        logTable.create({
            "ds_objeto": "connection",
            "ds_descricao": req.hostname+" Usuario desligou o LED"
        });
        
        resp="A porta foi fechada com sucesso";

    }).catch(error =>{
        
        logTable.create({
            "ds_objeto": "connection",
            "ds_descricao": req.hostname+" Usuário não conseguiu desligar o LED"
        });
        res.status(500).send(error.message);

    })
    res.send(resp);
}

exports.logging = async (req, res, next) => {
    await logTable.create(req.body).then(log=>{
        res.status(200).send("Ok")
    }).catch(err=>{
        res.status(500).send(err);
    })
}