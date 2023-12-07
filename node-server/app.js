const express = require("express");
const fs = require("fs");
const path = require('path');

const app = express();
const port = 8080;

app.use(function(req, res, next) {
    const {url, path: routePath} = req;
    console.log( 'Request: Timestamp:', new Date().toLocaleString(), ', URL (' + url + '), PATH (' + routePath + ').' ) ;
    next();
});

app.use('/', express.static(path.join(__dirname, '')))

app.listen(port, ()=> {
    console.log(`Server running on port ${port}...`)
});

app.get('/api/v1/listUsers', function(req, res) {
    fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function(err, data){
        console.log (data);
        res.end(data);
    });
});

app.delete('/api/v1/deleteUser', function(req, res){
    fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function(err, data){
        data = JSON.parse(data);
        delete data["user"+req.query["user"]];
        fs.writeFile(__dirname + "/data/users.json", JSON.stringify(data), err => {
            if (err) {
            console.error(err);
            return;
            }
        });
    console.log(data);
    res.end(JSON.stringify(data));
    });
});

app.post('/api/v1/addUser', function(req, res) {
    fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function(err, data){
        var data = JSON.parse(data);
        const user = req.query.user;
        const name = req.query.name;
        const password = req.query.password;
        const profession = req.query.profession;
        data["user" + user] = {'name':name, 'password':password, 'profession':profession, "id": user};
        fs.writeFile(__dirname + "/data/users.json", JSON.stringify(data), err => {
            if (err) {
            console.error(err);
            return;
            }
        });
        console.log(data);
        res.end(JSON.stringify(data));
    });
});

app.get('/api/v1/filter', function(req, res) {
    fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function(err, data){
        const filterUserNum = req.query.filterUserNum;
        var data = JSON.parse(data);
        var newData = data["user" + filterUserNum];
        console.log(newData);
        res.end(JSON.stringify(newData));
    });
});