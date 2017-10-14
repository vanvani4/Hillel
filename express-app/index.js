var express = require('express'); // подключаем экспресс

var bodyParser = require('body-parser')

var app = express(); // инициализация приложения

var prod = [{
    "id": 0,
    "name": "Молоко",
    "isDone": false,
    "about": "1 литр"
  },
  {
    "id": 1,
    "name": "Хлеб",
    "isDone": false,
    "about": "Батон, 1 штука"
  },
  {
    "id": 2,
    "name": "Вода",
    "isDone": false,
    "about": "6 литров"
  }];

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", /*"Access-Control-Allow-Methods",*/ "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.get('/product', function (req, res) {
  res.json(prod);
  console.log('get product');
});

app.post('/admin', function (req, res) {
  prod.push({"id": prod.length, "name": req.body.text, "isDone": false, "about": req.body.about})
});

app.post('/admin/id', function (req, res) {
  prod[req.body.id].name = req.body.newText;
  prod[req.body.id].about = req.body.newAbout;
  console.log(prod[req.body.id]);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
