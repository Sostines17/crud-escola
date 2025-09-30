const express = require("express");
const { captureOwnerStack } = require("react");
const router = express.Router();

let professores = [
  {
    id: 1,
    nome: "João Pedro",
    CPF: "02863647199",
    email: "joao@pedro.com",
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

router.post("/professores", (req, res, next) => {
  const { nome, cpf, email, curso, diciplina } = req.body;

  if (!nome || !cpf || !email || !curso || !diciplina) {
    return res.status(400).json({
      error: "nome, cpf, email, curso e diciplina são obrigatorios!!!!!",
    });
  }

  const PROFESSOR = professores.find((p) => p.cpf == cpf);
  if (p) {
    return res.status(409).json({ erro: "CPF já cadastrado!!!!" });
  }

  const novap = {
    id: Date.now(),
    nome,
    cpf,
    email,
    curso,
    diciplina,
  };

  ps.push(novop);
  res.status(201).json({ message: "p cadastrada!!!!", novop });
});

router.get("/professores", (req, res, next) => {
  res.json(ps);
});

router.get("/professores/:id", (req, res, next) => {
  const idRecebido = req.params.id;
  const p = professores.find((p) => p.id == idRecebido);
  if (!p) {
    return res.status(404).json({ error: "professor não encontrada" });
  }

  res.json(p);
});

router.put("/professores/:id", (req, res, next) => {
  const idRecebido = req.params.id;
  const { nome, email, curso, diciplina } = req.body;

  if (!nome || !email || !curso || !diciplina) {
    return res
      .status(400)
      .json({ error: "nome, email, curso e diciplina são obrigatorios" });
  }

  //validar se o professor com aquele ID existe na lista
  const p = professores.find((p) => p.id == idRecebido);
  if (!p) {
    return res.status(404).json({ error: "professor não encontrada!!!" });
  }

  p.nome = nome;
  p.email = email;
  p.curso = curso;
  p.diciplina = diciplina;
  res.json({ message: "Dados atualizados com sucesso!!!" });
});

router.delete("/professores/:id", (req, res, next) => {
  const idRecebido = req.params.id;
  const p = professores.find((p) => p.id == idRecebido);
  if (!p) {
    return res.status(404).json({ error: "professor Não encontrada!!!" });
  }
  //sobrescrever a lista com um novo sem o professor do idrecebido
  professores = professores.filter((p) => p.id != idRecebido);

  res.json({ message: "professor excluída com sucesso" });
});

module.exports = router;
