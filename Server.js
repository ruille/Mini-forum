const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

let mensagens = [];

function limpar() {
  const agora = Date.now();
  mensagens = mensagens.filter(m => agora - m.tempo < 600000);
}

setInterval(limpar, 5000);

app.get("/mensagens", (req, res) => {
  limpar();
  res.json(mensagens);
});

app.post("/mensagens", (req, res) => {
  mensagens.push({
    texto: req.body.texto,
    tempo: Date.now()
  });
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log("Rodando na porta " + PORT);
});
