const express = require('express');
const app = express()
const PORT = 7780;
const path = require('path');

app.use(express.static(path.join(__dirname,"public")));

app.listen(
    PORT,
    () => console.log("Its alive on http://localhost:" + PORT + "")
)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.get("/chat/:username/:message", (req, res) => {
    app.use(express.json())

    var username = req.params.username;
    var message = req.params.message;

    res.status(200).send({
        success: true,
        username: username,
        message: message
    })
})

process.on('uncaughtException', err => {
    console.error(err && err.stack)
});