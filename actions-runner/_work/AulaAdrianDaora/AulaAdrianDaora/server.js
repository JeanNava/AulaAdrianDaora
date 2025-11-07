const express = require('express');
const client = require('prom-client');
const path = require('path');

const app = express();
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); 

const counter = new client.Counter({
    name: 'app_requests_total',
    help: 'Contador de requisições recebidas na rota principal'
});

// Contador 2
const contadorCliquesMouse = new client.Counter({
    name: 'quantidadeClique',
    help: 'os cliques né'
});

app.get('/', (req, res) => {
    counter.inc(); 
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

// Nova rota do clique
app.post('/clicado', (req, res) => {
    contadorCliquesMouse.inc();
    res.status(200).send('OK');
});

app.get('/metrics', async (req, res) => {
    res.set('content-type', client.register.contentType);
    res.end(await client.register.metrics());
});

app.listen(3123, () => {
    console.log('App rodando na porta 3123');
});