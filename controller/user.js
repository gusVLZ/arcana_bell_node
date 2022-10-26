const axios = require("axios")
const user = require("../model/user")



exports.login = async (req, res, next) => {
    console.log("Tentou logar")
    var resp = false;
    user.findAll({
        where: {
            username: req.body.username,
            password: req.body.password,
            ativo: 1
        }
    }).then(u=>{
        resp = u.length > 0;
        if(resp){
            res.status(200).send(u[0]);
        }else{
            res.status(401).send("Credenciais inválidas")
        }
    }).catch(err=>{
        res.status(500).send("Erro no servidor")
    })
}

exports.cadastrar = async (req, res, next) => {
    const userCad = user.build(req.body)
    userCad.save(user).then(criado=>{
        res.status(200).send(criado)
    }).catch(err=>{
        res.status(500).send(err)
    })
}

exports.auth = async (email, password) => {
    await userCad.find(req.body).then(log=>{
        res.status(200).send("Ok")
    }).catch(err=>{
        res.status(500).send(err)
    })
}