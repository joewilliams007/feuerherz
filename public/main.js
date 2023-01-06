function loaded() {
    // alert('Please leave this page');
    random();
 }

function random() {
 const quotes = [
     "This page will self distruct in 10 seconds.", 
     "My raspberry runs as good as it tastes.",
     "Someone buys a Raspberry... what is this super fruit?",
     "I like my delivery guy to be Express.",
     "Stars are the fruit of the sky.",
     "Zorin. The vibe!",
     "Can i have a cup of java?",
     "Feuerherz is infinite.",
     "Want a donut? Check out this site: https://donut.gq/"
 ]
 const banners = [
     "./feuerherz.png", 
     "./lines.png",
     "./name.png"
 ]
 var quote = quotes[Math.floor(Math.random()*quotes.length)];
 var banner = banners[Math.floor(Math.random()*banners.length)];
 document.getElementById("rquote").innerHTML = quote;
 document.getElementById("banner").src = banner;
 getData()
}


function getData() {
 fetch("https://api.github.com/users/joewilliams007")
 .then(response => response.json())
 .then((response) => {
     console.log(response)
     document.getElementById("github").innerHTML = "<a href='https://www.github.com/joewilliams007'> <span class='link'>"+response.login+"</span></a><br>followers: "+response.followers+"<br>following: "+response.following+"<br>repositories: "+response.public_repos;
 })
 .catch(err => console.log(err))
}

function postChat() {
    const username = document.getElementById('username').value
    const message = document.getElementById('message').value

    if (username.length < 1) {
        return alert("enter username")
    }
    if (message.length < 1) {
        return alert("enter message")
    }

    console.log("sending chat"+username+" "+message)

    document.getElementById('message').innerHTML = ""

    fetch("/sendchat/"+username+"/"+message)
    .then(response => response.json())
    .then((response) => {
        console.log(response.success)
        document.getElementById('message').innerHTML = response.success
        alert("message sent!")
        getChat()
    })
    .catch(err => console.log(err))
}

function getChat() {
    console.log("getting chat")

    document.getElementById('message').innerHTML = ""

    fetch("/getchat")
    .then(response => response.json())
    .then((response) => {
        console.log(response.success)
        document.getElementById('chat').innerHTML = response.chat
    })
    .catch(err => console.log(err))
}