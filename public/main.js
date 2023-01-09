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
    getGithub()
    getChess()
    getDev()
}

function getGithub() {
    fetch("https://api.github.com/users/joewilliams007")
    .then(response => response.json())
    .then((response) => {
        console.log(response)
        document.getElementById("github").innerHTML = "<a href='https://www.github.com/joewilliams007'> <span class='link'>"+response.login+"</span></a><br>followers: "+response.followers+"<br>following: "+response.following+"<br>repositories: "+response.public_repos;
    })
    .catch(err => console.log(err))
}

function getChess() {
 fetch("https://api.chess.com/pub/player/feuerherz0/stats")
 .then(response => response.json())
 .then((response) => {
     console.log(response)
     document.getElementById("chess").innerHTML = "<a href='https://www.chess.com/member/Feuerherz0'> <span class='link'>Feuerherz0"
     +"</span></a><br>rapid: "+response.chess_rapid.last.rating
     +"<br>daily: "+response.chess_daily.last.rating
     +"<br>bullet: "+response.chess_bullet.last.rating
 })
 .catch(err => console.log(err))
}

function getDev() {
    fetch("https://devrant.com/api/users/5344593?app=3")
    .then(response => response.json())
    .then((response) => {
        console.log(response)
        document.getElementById("devRant").innerHTML = "<a href='https://devrant.com/users/joewilliams007'> <span class='link'>"+response.profile.username
        +"</span></a><br>++: "+response.profile.score
    })
    .catch(err => console.log(err))
}

function postChat() {
    const username = document.getElementById('username').value
    const message = document.getElementById('message').value
    const media = document.getElementById('media').value

    if (username.length < 1) {
        return alert("enter username")
    }
    if (message.length < 1) {
        return alert("enter message")
    }

    setCookie("username", username, 30);

    console.log("sending chat"+username+" "+message)

    document.getElementById('message').value = ""
    document.getElementById('media').value = ""

    fetch('sendchat', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "username": username, "message": message, "media": media })
    }).catch(err => console.log(err))
    
}


function autoLoadChat() {
    // Will execute myCallback every 0.5 seconds 
    window.setInterval(myCallback, 1000);

    function myCallback() {
        getChat();
    }
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

function setCookie(cname,cvalue,exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
        document.getElementById('username').value = user
    } else {

    }
}

