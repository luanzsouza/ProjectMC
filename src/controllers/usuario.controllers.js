const Usuario = require('../models/usuario.model');


module.exports={

async index(req,res){
    console.log("cheguei no Index ");
    const user=await Usuario.find();
    res.json(user);
  
    },
    async details(req,res){
        console.log("cheguei no details");
        const {_id} = req.params;
        const user= await Usuario.findOne({_id});
        res.json(user);
        },
   async create(req,res){
       console.log('cheguei no create');
        const {nome_usuario, email_usuario, tipo_usuario, senha_usuario} = req.body;
        let data={};

        let user = await Usuario.findOne({email_usuario});
        if(user={}){
            data = {nome_usuario,email_usuario,tipo_usuario,senha_usuario};
            user = await Usuario.create(data);
            console.log('criando');
           return res.status(200).json(data);
        }else{
            console.log('deu ruim');
            return res.status(500).json(data);
        }
    }
    
}