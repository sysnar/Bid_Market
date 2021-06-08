'use strict';
const express = require('express');
const path = require('path');
const naraRequest = require('./models/naraRequest')
const app = express();

const router = require('./routes/index');



// // Start HTTP Server / PORT:80
// http.createServer(app).listen(80, function(){
// 	console.log("HTTP START!");
// });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

app.listen(80)

// app.use('/', indexRouter);