var express = require('express');
const app = express();
const router = express.Router();

var count = 5;

var prod = [{
    id: 4,
    name: "Milk",
    isDone: false,
    about: "1 liter"
  },
  {
    id: 1,
    name: "Bread",
    isDone: false,
    about: "1 loaf"
  },
  {
    id: 3,
    name: "Water",
    isDone: false,
    about: "6 liter"
  }];


router.get('/product', function (req, res) {
  res.json(prod);
  console.log('get product');
});

router.put('/product/id', function (req, res) {
  let val = JSON.parse(req.body.body);
  prod.forEach(function(item, i, prod) {
    if (val.id === item.id) {
      item.isDone = val.isDone;
    }
  });
  console.log('put product/id');
});

router.delete('/product/id', function (req, res) {
  prod.forEach(function(item, i, prod) {
    if (req.body.id === item.id) {
      prod.splice(i, 1);
    }
});
  console.log('delete product/id');
});

router.put('/admin', function (req, res) {
  prod.push({id: count, name: req.body.text, isDone: false, about: req.body.about})
  count++;
  res.json(prod);
  console.log('put admin');
});

router.put('/admin/id', function (req, res) {
  prod.forEach(function(item, i, prod) {
    if (item.id === +req.body.id) {
      console.log();
      item.name = req.body.newText;
      item.about = req.body.newAbout;
    }
  });
  console.log('put admin/id');
});

module.exports = router;