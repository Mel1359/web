const express = require('express'); //импорт библиотеки express, для упрощения создания веб приложений на node.js
const bodyParser = require('body-parser'); //импорт body-parser для парсинга тела запроса (формы)
const fs = require('fs'); //импорт модуля для работы с файловой системой
const path = require('path'); //импорт модуля для работы с путями фс

const app = express(); //создание экземпляра приложения express
const PORT = 3000; //номер порта

app.use(bodyParser.urlencoded({ extended: true })); //использование bodyparser для обработки url-кодированных данных (extended: true позволяет использовать болле сложные структуры)
app.use(express.static(path.join(__dirname, 'public'))); //указание express обслуживать статические файлы из папки public, доступ к файлу стилей css 

//определение маршрута для обработки get запросов на корневой url (/), отправки файла index.html пользователю
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//определение маршрута для обработки post запросов  на /submit, извлечение данных из тела запроса и сохранение их в переменные
app.post('/submit', (req, res) => {
    const {lastname, firstname, surname, email } = req.body;
    const data = `ФИО: ${lastname} ${firstname} ${surname}, Email: ${email}\n`;

    //сохранение данных в файл data.txt, вывод страницы сообщения (submit.html) об успешном сохранении или же вывод ошибки (500 внутренняя ошибка сервера) при записи в файл 
    fs.appendFile('data.txt', data, (err) => {
        if (err) {
            return res.status(500).send('Ошибка сохранения данных');
        }
        res.sendFile(path.join(__dirname, 'submit.html'));
    });
});

//запуск сервера с указанием слушать порт (3000)
app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});