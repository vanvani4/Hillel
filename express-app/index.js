var express = require('express'); // подключаем экспресс

var bodyParser = require('body-parser')

var app = express(); // инициализация приложения

var count = 5;

var prod = [{
    id: 4,
    name: "Молоко",
    isDone: false,
    about: "1 литр"
  },
  {
    id: 1,
    name: "Хлеб",
    isDone: false,
    about: "Батон, 1 штука"
  },
  {
    id: 3,
    name: "Вода",
    isDone: false,
    about: "6 литров"
  }];

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"/*"http://localhost:4200", "http://localhost:9876"*/);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

app.use(bodyParser.json());

app.get('/product', function (req, res) {
  res.json(prod);
  console.log('get product');
});

app.put('/product/id', function (req, res) {
  let val = JSON.parse(req.body.body);
  prod.forEach(function(item, i, prod) {
    if (val.id === item.id) {
      item.isDone = val.isDone;
    }
  });
  console.log('put product/id');
});

app.delete('/product/id', function (req, res) {
  prod.forEach(function(item, i, prod) {
    if (req.body.id === item.id) {
      prod.splice(i, 1);
    }
});
  console.log('delete product/id');
});

app.put('/admin', function (req, res) {
  prod.push({id: count, name: req.body.text, isDone: false, about: req.body.about})
  count++;
  res.json(prod.length);
  console.log('put admin');
});

app.put('/admin/id', function (req, res) {
  prod.forEach(function(item, i, prod) {
    if (item.id === +req.body.id) {
      console.log();
      item.name = req.body.newText;
      item.about = req.body.newAbout;
    }
  });
  console.log('put admin/id');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
