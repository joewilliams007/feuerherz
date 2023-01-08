const express = require('express');
const app = express()
const PORT = 7780;
const path = require('path');
    var fs = require('fs')
app.use(express.static(path.join(__dirname,"public")));

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

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

app.get("/friends", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/friends.html'));
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

app.post("/sendchat", jsonParser, (req, res) => {
    username = req.body.username
    message = req.body.message
    media = req.body.media

    var d = new Date();
    var n = d.toLocaleTimeString();

    const json = JSON.parse(fs.readFileSync('chat.json'))
    
    if (media.includes(".jpg") || media.includes(".jpeg") || media.includes(".png") || media.includes(".gif")) {

        json.push("<strong>"+username+"</strong> "+n+
        ":<br><img src="+media+' style="max-width: 200px; max-height: 100px; object-fit: contain;"><br>'
        +message+"<br><br>")
        fs.writeFileSync('./chat.json', JSON.stringify(json))


    } else {
        
        json.push("<strong>"+username+"</strong> "+n+":<br>"+message+"<br><br>")
        fs.writeFileSync('./chat.json', JSON.stringify(json))

    }

 

    res.status(200).send({
        success: true
    })
})

process.on('uncaughtException', err => {
    console.error(err && err.stack)
});