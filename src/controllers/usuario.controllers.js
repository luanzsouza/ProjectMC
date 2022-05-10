const Usuario = require("../models/usuario.model");
const jwt = require("jsonwebtoken");
const secret = "mysecret";

module.exports = {
  //mostra todos usuarios
  async index(req, res) {
    console.log("cheguei no Index ");
    const user = await Usuario.find();
    res.json(user);
  },
  //mostra um usuario
  async details(req, res) {
    console.log("cheguei no details");
    const { _id } = req.params;
    const user = await Usuario.findOne({ _id });
    res.json(user);
  },
  //deleta usuarios
  async delete(req, res) {
    const { _id } = req.params;
    const user = await Usuario.findByIdAndDelete({ _id });
    return res.json(user);
  },
  //atualiza usuarios
  async updateusuario(req, res) {
    const { _id, nome_usuario, email_usuario, senha_usuario, tipo_usuario } =
      req.body;
    const data = { nome_usuario, email_usuario, senha_usuario, tipo_usuario };
    const user = await Usuario.findOneAndUpdate({ _id }, data, { new: true });
    return res.json(user);
  },
  //cria usuarios
  async create(req, res) {
    const { nome_usuario, email_usuario, tipo_usuario, senha_usuario } =
      req.body;
    let data = {};

    let user = await Usuario.findOne({ email_usuario });
    if ((user = {})) {
      data = { nome_usuario, email_usuario, tipo_usuario, senha_usuario };
      user = await Usuario.create(data);
      console.log("criando");
      return res.status(200).json(data);
    } else {
      console.log("deu ruim");
      return res.status(500).json(data);
    }
  },
  //verifica token
  async checktoken(req, res) {
    const token =
      req.body.token ||
      req.query.token ||
      req.cookies.token ||
      req.headers['x-access-token'];
      
    if (!token) {
      res.json({ status: 401, msg: 'Não autorizado: Token inexistente!' });
    } else {
      jwt.verify(token, secret, function (err) {
        if (err) {
          res.json({ status: 401, msg: 'Não autorizado: Token inválido!' });
        } else {
          res.json({ status: 200 });
        }
      });
    }
  },
  async login(req, res) {
    const { email, senha } = req.body;
    Usuario.findOne(
      { email_usuario: email },
      function (err, user) {
        if (err) {
          console.log(error(err));
          res
            .status(200)
            .json({ erro: "erro no servidor, por favor tente novamente" });
        } else if (!user) {
          res.status(200).json({
            status: 2,
            erro: "email não encontrado no banco de dados",
          });
        } else {
          user.isCorrectPassword(senha, async function (err, same) {
            if (err) {
              res
                .status(200)
                .json({ error: "erro no servidor. Por favor tente novamente" });
            } else if (!same) {
              res.status(200).json({ status: 2, error: "a senha nao confere" });
            } else {
              const payload = { email };
              const token = jwt.sign(payload, secret, {
                expiresIn: "24h",
              });
              res.cookie("token", token, { httpOnly: true });
              res.status(200).json({
                status: 1,
                auth: true,
                token: token,
                id_client: user._id,
                user_name: user.nome_usuario,
                user_type: user.tipo_usuario
              });
            }
          });
        }
      }
    );
  },
  async destroyToken(req,res){
    const token= req.headers.token;
    if(token){
      res.cookie('token',null,{httpOnly:true});
    }else{
      res.status(401).send("Logout não autorizado!")
    }
      res.send("Sessão finalizada com sucesso");
  }

};
