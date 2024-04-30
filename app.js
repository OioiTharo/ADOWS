const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); 
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const usuarios = [
    { usuario: 'Thais', senha: '12345' },
    { usuario: 'Giovanna', senha: '12345' },
    { usuario: 'GiTha', senha: '12345' }
];

app.get('/calcular', (req, res)=> {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', (req, res)=> {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
        return res.status(400).send('Usuário e senha são obrigatórios');
    }

    const usuarioExistente = usuarios.find(u => u.usuario === usuario && u.senha === senha);
    if (!usuarioExistente) {
        return res.status(401).send('Credenciais inválidas');
    }

    res.redirect('/index.html');
});

app.post('/registro', (req, res)=> {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
        return res.status(400).send('Usuário e senha são obrigatórios');
    }

    if (usuarios.some(u => u.usuario === usuario)) {
        return res.status(400).send('Este usuário já existe');
    }

    usuarios.push({ usuario, senha });
    res.redirect('/login.html');
});

app.post('/calcular', (req, res) => {
    const { a, b, c } = req.body;
    if (a === 0) {
        return res.status(400).json({ resultado: "'a' não pode ser zero" });
    }

    const discriminante = b * b - 4 * a * c;

    if (discriminante > 0) {
        const x1 = (-b + Math.sqrt(discriminante)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminante)) / (2 * a);
        res.status(200).json({ resultado: [x1, x2] });
    } else if (discriminante === 0) {
        const x = -b / (2 * a);
        res.status(200).json({ resultado: [x] });
    } else {
        res.status(200).json({ resultado: "Não existem raízes reais" });
    }
});


app.listen(PORT, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
