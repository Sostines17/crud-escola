const express = require('express')
const router = express.Router()


let alunos = [
    {
        id: 1,
        nome: "João Pedro",
        email: "joao@pedro.com",
        cpf: "02863647199",
        telefone: "11998877665",
        dataNascimento: "19/11/2005"
    },
    {
        id: 2,
        nome: "Maria Vitória",
        email: "maria@vitoria.com",
        cpf: "66954878120",
        telefone: "21987654321",
        dataNascimento: "18/10/2005"
    }
]

// --- Rota POST: Cadastrar Novo Aluno ---
router.post('/alunos', (req, res, next) => {
    const {nome, cpf, email, telefone, dataNascimento} = req.body
    
    // Validação de campos obrigatórios
    if(!nome || !cpf || !email || !telefone || !dataNascimento) {
        return res.status(400).json({error: "nome, cpf, email, telefone e data de nascimento são obrigatorios!"})
    }
    
    // Validação de CPF único
    const alunoExistente = alunos.find(aluno => aluno.cpf == cpf)
    if(alunoExistente) {
        return res.status(409).json({erro: "CPF já cadastrado!"})
    }
    
    // Criação do novo aluno
    const novoAluno = {
        id: Date.now(), // Usando timestamp como ID provisório
        nome,
        cpf,
        email,
        telefone,
        dataNascimento
    }
    
    alunos.push(novoAluno)
    res.status(201).json({message: "Aluno cadastrado com sucesso!", novoAluno})
})


// --- Rota GET: Listar Todos os Alunos ---
router.get('/alunos', (req, res, next) => {
    res.json(alunos)
})


// --- Rota GET: Buscar Aluno por ID ---
router.get('/alunos/:id', (req, res, next) => {
    const idRecebido = req.params.id
    const aluno = alunos.find(a => a.id == idRecebido)

    if (!aluno) {
        return res.status(404).json({error: "Aluno não encontrado"})
    }

    res.json(aluno)
})


// --- Rota PUT: Atualizar Aluno por ID ---
router.put('/alunos/:id', (req, res, next) => {
    const idRecebido = req.params.id
    // Incluímos 'telefone' para permitir a edição
    const {nome, email, telefone, dataNascimento} = req.body 
    
    // Validação de campos obrigatórios para atualização
    if (!nome || !email || !telefone || !dataNascimento) {
        return res.status(400).json({error: "nome, email, telefone e data de nascimento são obrigatorios"})
    }

    // Encontrar o aluno
    const aluno = alunos.find(aluno => aluno.id == idRecebido)
    if (!aluno) {
        return res.status(404).json({error : "Aluno não encontrado!"})
    }
 
    // Atualização dos dados
    aluno.nome = nome
    aluno.email = email
    aluno.telefone = telefone // Adicionado o campo telefone
    aluno.dataNascimento = dataNascimento

    res.json({message: "Dados do aluno atualizados com sucesso!"})

})


// --- Rota DELETE: Excluir Aluno por ID ---
router.delete('/alunos/:id', (req, res, next) => {
    const idRecebido = req.params.id
    const aluno = alunos.find(aluno => aluno.id == idRecebido)

    if (!aluno) {
        return res.status(404).json({error: "Aluno Não encontrado!"})
    }

    // Sobrescrever a lista, removendo o aluno com o id recebido
    alunos = alunos.filter(aluno => aluno.id != idRecebido)

    res.json({message: "Aluno excluído com sucesso"})
})


module.exports = router