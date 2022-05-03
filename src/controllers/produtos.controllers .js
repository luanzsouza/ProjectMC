const Produto = require('../models/produtos.model');


module.exports={
//mostra todos Produto
async index(req,res){
    console.log("cheguei no Index ");
    const produto=await Produto.find();
    res.json(produto);
  
    },
    //mostra um Produto
    async details(req,res){
        console.log("cheguei no details");
        const {_id} = req.params;
        const produto= await Produto.findOne({_id});
        res.json(produto);
        },
        //deleta Produto
    async delete(req,res){
        const {_id}=req.params;
        const produto= await Produto.findByIdAndDelete({_id});
        return res.json(produto);

    }, 
    //atualiza Produto
    async updateProduto(req,res){
        const {_id, nome_produto,descricao_produto,preco_produto, qtd_produto}= req.body;
        const data = {nome_produto,descricao_produto,preco_produto,qtd_produto};
        const produto = await Produto.findOneAndUpdate({_id},data,{new:true});
        return res.json(produto);

    },
    //cria Produto
   async create(req,res){
       console.log('cheguei no create');
        const {nome_produto, descricao_produto, qtd_produto, preco_produto} = req.body;
        let data={};

        let produto = await Produto.findOne({nome_produto});
        if(produto={}){
            data = {nome_produto,descricao_produto,qtd_produto,preco_produto};
            produto = await Produto.create(data);
            console.log('criando');
           return res.status(200).json(data);
        }else{
            console.log('deu ruim');
            return res.status(500).json(data);
        }
    }
    
}