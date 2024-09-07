const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const { mongoConnect } = require('./mongoClient');

const indexRoutes = require('./routes/index');

dotenv.config();

process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception:', err);
});

mongoConnect();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', indexRoutes);

const port = process.env.PORT || 3010;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
