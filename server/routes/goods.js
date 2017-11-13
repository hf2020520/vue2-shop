var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Goods = require('./../models/goods')

// 连接数据库
mongoose.connect('mongodb://dn_dba:pwd_song@101.200.129.112:27017/vue_shop_lesson', {auto_reconnect: true})
mongoose.connection.on('connected', function () {
  console.log('mongodb connected success')
})
mongoose.connection.on('error', function () {
  console.log('mongodb connected fail')
})
mongoose.connection.on('disconnected', function () {
  console.log('mongodb connected discontected')
})

/* 查询商品列表数据 */
router.get('/', function (req, res, next) {
  let page = parseInt(req.param('page'))
  let pageSize = parseInt(req.param('pageSize'))
  let sort = req.param('sort')
  let skip = (page - 1) * pageSize
  let params = {}
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
  goodsModel.sort({ 'salePrice': sort })
  goodsModel.exec(function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

module.exports = router
