const express = require('express');

const createPath = require('./helpers/create-path');
require('dotenv').config();
const app = express();

app.set('view engine', 'ejs');
app.listen(process.env.PORT, (err) => {
    err ? console.log('ERROR>>>', err) : console.log(`LIstening port ${process.env.PORT}`);
});
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    const title = 'Ритуальные услуги в Минске - бюро похоронных услуг';
    const description = '➤ Весь спектр похоронных услуг: захоронение, кремация, оформление места захоронения, копка могилы, услуги санитара-патологоанатома, подготовка тела к погребению.';
    res.render(createPath('index'), { title, description });
});


app.post('/', (req, res) => {
    const {ip} = req.body;
    console.log('IP >>>', ip);
    res.status(200);
});


app.use((req, res) => {
const title = 'Error Page';
res
    .status(404)
    .render(createPath('error'), { title });
});
