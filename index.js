const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const alunos=require("./routes/alunos")
app.use(alunos)

const professores=require("./routes/professores")
app.use(professores)

app.listen(3000, () => {
console.log('Server is running on http://localhost:3000')})