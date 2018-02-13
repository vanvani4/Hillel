const express = require('express'); // подключаем экспресс
const app = express(); // инициализация приложения
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const api = require('./server/routes/api');

// var count = 5;

// var prod = [{
//     id: 4,
//     name: "Milk",
//     isDone: false,
//     about: "1 liter"
//   },
//   {
//     id: 1,
//     name: "Bread",
//     isDone: false,
//     about: "1 loaf"
//   },
//   {
//     id: 3,
//     name: "Water",
//     isDone: false,
//     about: "6 liter"
//   }];

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/api', api);
/*app.use(function (req, res, next) {
  if (req.header('x-forwqrded-proto') == 'http') {
    res.redirect(301, 'https://' + req.url)
    return
  }
  next()
});*/

app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));//
});

const port = process.env.PORT || '443';//
app.set('port', port);//

const server = http.createServer(app);//

server.listen(port, () => {
  console.log(`API runnung on localhost:${port}`);//
});

// app.get('/product', function (req, res) {
//   res.json(prod);
//   console.log('get product');
// });

// app.put('/product/id', function (req, res) {
//   let val = JSON.parse(req.body.body);
//   prod.forEach(function(item, i, prod) {
//     if (val.id === item.id) {
//       item.isDone = val.isDone;
//     }
//   });
//   console.log('put product/id');
// });

// app.delete('/product/id', function (req, res) {
//   prod.forEach(function(item, i, prod) {
//     if (req.body.id === item.id) {
//       prod.splice(i, 1);
//     }
// });
//   console.log('delete product/id');
// });

// app.put('/admin', function (req, res) {
//   prod.push({id: count, name: req.body.text, isDone: false, about: req.body.about})
//   count++;
//   res.json(prod);
//   console.log('put admin');
// });

// app.put('/admin/id', function (req, res) {
//   prod.forEach(function(item, i, prod) {
//     if (item.id === +req.body.id) {
//       console.log();
//       item.name = req.body.newText;
//       item.about = req.body.newAbout;
//     }
//   });
//   console.log('put admin/id');
// });

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });
