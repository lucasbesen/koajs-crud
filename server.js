var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var ToDo = require('./mongoose/todo');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('listening on 3000');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

mongoose.connect('mongodb://localhost:27017/local')
var db = mongoose.connection;
db.on('error', ()=> {console.log( '---FAILED to connect to mongoose')})
db.once('open', () => {
 console.log( '+++Connected to mongoose')
})

app.post('/quotes', (req, res) => {

    var todoItem = new ToDo({
        itemId: 1,
        item: req.body.item,
        completed: false
    })
    todoItem.save((err, result) => {
        if (err) {
            console.log('error')
        }
        console.log(todoItem.item);
        res.redirect('/');
    })
});