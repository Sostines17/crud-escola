const express = require("express");
const { captureOwnerStack } = require("react");
const router = express.Router();

let professores = [
  {
    id: 1,
    nome: "Lucas Henrique",
    CPF: "02863647199",
    email: "lucas@henrique.com",
    curso: "ADS",
    diciplina: "Backand",
  },
  {
    id: 2,
    nome: "Maria Fernanda",
    CPF: "02863647199",
    email: "maria@fernanda.com",
    curso: "ADS",
    diciplina: "Estrutura de Dados",
  },
];

// --- Rota POST: Cadastrar Novo Professor ---
router.post("/professores", (req, res, next) => {
  const { nome, cpf, email, curso, diciplina } = req.body;

  // Validação de campos obrigatórios
  if (!nome || !cpf || !email || !curso || !diciplina) {
    return res
      .status(400)
      .json({
        error: "nome, cpf, email, curso e diciplina são obrigatorios!!!!!",
      });
  }

  // Validação de CPF único
  const PROFESSOR = professores.find((p) => professor.cpf == cpf);
  if (professor) {
    return res.status(409).json({ erro: "CPF já cadastrado!!!!" });
  }

  // Criação do novo Professor
  const novap = {
    id: Date.now(), // Usando timestamp como ID provisório
    nome,
    cpf,
    email,
    curso,
    diciplina,
  };

  professores.push(novop);
  res.status(201).json({ message: "professor cadastrada!!!!", novoprofessor });
});

// --- Rota GET: Listar Todos os Professores ---
router.get("/professores", (req, res, next) => {
  res.json(professores);
});

// --- Rota GET: Buscar Professores por ID ---
router.get("/professores/:id", (req, res, next) => {
  const idRecebido = req.params.id;
  const professor = professores.find((professor) => professor.id == idRecebido);

  if (!professor) {
    return res.status(404).json({ error: "professor não encontrada" });
  }

  res.json(professor);
});

// --- Rota PUT: Atualizar Professor por ID ---
router.put("/professores/:id", (req, res, next) => {
  const idRecebido = req.params.id;
  const { nome, email, curso, diciplina } = req.body;

  // Validação de campos obrigatórios para atualização
  if (!nome || !email || !curso || !diciplina) {
    return res
      .status(400)
      .json({ error: "nome, email, curso e diciplina são obrigatorios" });
  }

  // Encontrar o aluno
  const professor = professores.find((professor) => professor.id == idRecebido);
  if (!professor) {
    return res.status(404).json({ error: "professor não encontrada!!!" });
  }

  // Atalização dos dados
  professor.nome = nome;
  professor.email = email;
  professor.curso = curso;
  professor.diciplina = diciplina;
  res.json({ message: "Dados atualizados com sucesso!!!" });
});

// --- Rota DELETE: Excluir Aluno por ID ---
router.delete("/professores/:id", (req, res, next) => {
  const idRecebido = req.params.id;
  const professor = professores.find((professor) => professor.id == idRecebido);

  if (!professor) {
    return res.status(404).json({ error: "professor Não encontrada!!!" });
  }
  //sobrescrever a lista com um novo sem o professor do idrecebido
  professores = professores.filter((professor) => professor.id != idRecebido);

  res.json({ message: "professor excluída com sucesso" });
});

module.exports = router;
