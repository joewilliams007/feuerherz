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
        var json = JSON.parse(data).reverse()
        var chat;
        json.forEach(element => {
            chat+=element.replace("undefined","")
        });

        res.status(200).send({
            chat: chat.replace("undefined","")
        })
    })
})

app.post("/sendchat", (req, res) => {
    username = req.body.username
    message = req.body.message

    console.log(req)
    console.log(req.body)
    var d = new Date();
    var n = d.toLocaleTimeString();

    const json = JSON.parse(fs.readFileSync('chat.json'));
    json.push("<strong>"+req.params.username+"</strong> "+n+":<br>"+req.params.message+"<br><br>")

        fs.writeFileSync('./chat.json', JSON.stringify(json))
 

    res.status(200).send({
        success: true
    })
})

process.on('uncaughtException', err => {
    console.error(err && err.stack)
});