function Quote(){
    var quotes=["“A room without books is like a body without a soul.”","“Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.”",`“You've gotta dance like there's nobody watching,
Love like you'll never be hurt,
Sing like there's nobody listening,
And live like it's heaven on earth.”`]
    var userNames=["--Marcus Tullius Cicero","--Bernard M. Baruch","--William W. Purkey"];
    var num= Math.floor(Math.random()*quotes.length)
document.getElementById("demo").innerHTML=`<p>${quotes[num]}</p> <p>${userNames[num]}</p>`
}
