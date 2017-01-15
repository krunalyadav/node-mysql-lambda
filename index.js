var express = require('express');
var app = express();
var sql = require("mssql");
var mysql = require('mysql');
const http = require('http');
var async = require('async');

exports.handler = function index(event, context) {
  try {
    var connection = mysql.createConnection({
      host: '54.147.47.111',
      user: 'krunal',
      password: 'test#123',
      database: 'student'
    });

    connection.connect(function (err) {
      if (!err) {
        console.log("Database is connected ... nn");
      } else {
        console.log(err);
      }
    });


    app.listen(3000, function () {
      console.log('Example app listening on port 3000!')
    })


    http.get('http://jsonplaceholder.typicode.com/posts', function (response) {

      var body = '';
      response.on('data', function (d) {
        body += d;
      });
      response.on('end', function () {
        //   JSON.parse(body).forEach(function (item) {
        //     connection.query('INSERT INTO test set ?', { userid: item.userId, id: item.id, title: item.title, body: item.body }, function (err, result) {
        //       if (err) console.log(err);
        //     })
        //   });
        //   context.succeed();
        console.log('executioin started');

        var data = JSON.parse(body);

        async.each(data, function (item, callback) {
          connection.query('INSERT INTO test set ?', { userid: item.userId, id: item.id, title: item.title, body: item.body }, function (err, result) {
            if (err) console.log(err);
            callback(null);
          })
        }, function (err) {
          if (err) console.log(err);
          console.log("Successfully executed");
          context.succeed();
        });
      });
    });
  }
  catch (ex) {
    console.log(ex);
  }
}