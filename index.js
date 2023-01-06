const express = require('express');
const app = express()
const PORT = 7780;
const path = require('path');
    var fs = require('fs')
app.use(express.static(path.join(__dirname,"public")));

app.listen(
    PORT,
    () => console.log("Its alive on http://localhost:" + PORT + "")
)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/chat.html'));
})

app.get("/getchat", (req, res) => {
    app.use(express.json())

    fs.readFile('./chat.json', function (err, data) {
        var json = JSON.parse(data)
        var chat;
        json.array.forEach(element => {
            chat+=element
        });

        res.status(200).send({
            chat: chat
        })
    })
})

app.get("/sendchat/:username/:message", (req, res) => {
    app.use(express.json())

    fs.readFileSync('./chat.json', function (err, data) {
        var json = JSON.parse(data)

        json.push(req.params.username+"<br>"+req.params.message+"<br>")
        fs.writeFileSync('./chat.json', JSON.stringify(json))
    })

    res.status(200).send({
        success: true
    })
})

process.on('uncaughtException', err => {
    console.error(err && err.stack)
});