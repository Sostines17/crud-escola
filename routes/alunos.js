const express = require('express')
const router = express.Router()


let pessoas = [
    {
        id: 1,
        nome: "João Pedro",
        CPF: "02863647199",
        email: "joao@pedro.com",
        dataNascimento: "19/11/2005"
    },
    {
        id: 2,
        nome: "Maria",
        CPF: "66954878120",
        email: "maria@vitoria.com",
        dataNascimento: "18/10/2005"
    }
]


router.post('/pessoas', (req, res, next) => {
    const {nome, cpf, email, dataNascimento} = req.body
    
    if(!nome || !cpf || !email || !dataNascimento) {
        return res.status(400).json({error: "nome, cpf, email e data de nascimento são obrigatorios!!!!!"})
    }
    
    const pessoa = pessoas.find(pessoa => pessoa.cpf == cpf)
    if(pessoa) {
        return res.status(409).json({erro: "CPF já cadastrado!!!!"})
    }
    
    const novaPessoa = {
        id: Date.now(),
        nome,
        cpf,
        email,
        dataNascimento
    }
    
    pessoas.push(novaPessoa)
    res.status(201).json({message: "Pessoa cadastrada!!!!", novaPessoa})
})


router.get('/pessoas', (req, res, next) => {
  res.json(pessoas)
})


router.get('/pessoas/:id', (req, res, next) => {
    const idRecebido = req.params.id
    const pessoa = pessoas.find(p => p.id == idRecebido)
    if (!pessoa) {
        return res.status(404).json({error: "Pessoa não encontrada"})
    }

    res.json(pessoa)
})



router.put('/pessoas/:id', (req, res, next) => {
    const idRecebido = req.params.id
    const {nome, email, dataNascimento} = req.body
    
    if (!nome || !email || !dataNascimento) {
        return res.status(400).json({error: "nome, email e data de nascimento são obrigatorios"})
    }

    //validar se a pessoa com aquele ID existe na lista
    const pessoa = pessoas.find(pessoa => pessoa.id == idRecebido)
    if (!pessoa) {
        return res.status(404).json({error : "Pessoa não encontrada!!!"})
    }
  
    pessoa.nome = nome
    pessoa.email = email
    pessoa.dataNascimento = dataNascimento
    res.json({message: "Dados atualizados com sucesso!!!"})

})



router.delete('/pessoas/:id', (req, res, next) => {
const idRecebido = req.params.id
const pessoa = pessoas.find(pessoa => pessoa.id == idRecebido)
if (!pessoa) {
    return res.status(404).json({error: "Pessoa Não encontrada!!!"})
}
//sobrescrever a lista com uma nova sem a pessoa do idrecebido
pessoas = pessoas.filter(pessoa => pessoa.id != idRecebido)

res.json({message: "Pessoa excluída com sucesso"})
})





module.exports = router
