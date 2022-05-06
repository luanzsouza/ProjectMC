const Usuario = require('../models/usuario.model');
const jwt = require("jsonwebtoken");
const secret =  "mysecret";

module.exports={
//mostra todos usuarios
async index(req,res){
    console.log("cheguei no Index ");
    const user=await Usuario.find();
    res.json(user);
  
    },
    //mostra um usuario
    async details(req,res){
        console.log("cheguei no details");
        const {_id} = req.params;
        const user= await Usuario.findOne({_id});
        res.json(user);
        },
        //deleta usuarios
    async delete(req,res){
        const {_id}=req.params;
        const user= await Usuario.findByIdAndDelete({_id});
        return res.json(user);

    }, 
    //atualiza usuarios
    async updateusuario(req,res){
        const {_id, nome_usuario,email_usuario,senha_usuario, tipo_usuario}= req.body;
        const data = {nome_usuario,email_usuario,senha_usuario,tipo_usuario};
        const user = await Usuario.findOneAndUpdate({_id},data,{new:true});
        return res.json(user);

    },
    //cria usuarios
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
    },
    async login(req,res){
        
        const{ email,senha}=req.body;
        Usuario.findOne({email_usuario:email, tipo_usuario:10}, 
            function(err,user){
                if(err){
                    console.log(error(err))
                    res.status(200).json({erro: "erro no servidor, por favor tente novamente"})
                } else if (!user){
                    res.status(200).json({status:2, erro: 'email ou senha nao conferem'})
                } else{
                    const payload={ email};
                    const token= jwt.sign(payload, secret,{
                        expiresIn:'24h'
                    })
                    res.cookie('token',token,{httpOnly:true});
                    res.status(200).json({status:1, auth:true,
                         token:token,id_client: user._id,user_name:user.nome_usuario});
                }
            })


    }
}