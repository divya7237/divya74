const button = document.getElementById("btn");
let colors=["red","blue","green","orange","yellow","black"]
function change()
{
    const r = Math.floor((Math.random() * 10000000)).toString(16)
    console.log(r)
    document.body.style.backgroundColor = "#" + r;
    document.getElementById('model').style.display="block"
}
function closeLogic ()
{
    document.getElementById("model").style.display = "none"
}