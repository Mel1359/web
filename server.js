const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {
    const {lastname, firstname, surname, email } = req.body;
    const data = `ФИО: ${lastname} ${firstname} ${surname}, Email: ${email}\n`;

    fs.appendFile('data.txt', data, (err) => {
        if (err) {
            return res.status(500).send('Ошибка сохранения данных');
        }
        res.sendFile(path.join(__dirname, 'submit.html'));
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});