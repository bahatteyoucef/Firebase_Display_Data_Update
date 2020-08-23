var randomWord  =   [];

randomWord[0]   =   "or";
randomWord[1]   =   "this";
randomWord[2]   =   "that";
randomWord[3]   =   "who";
randomWord[4]   =   "his";
randomWord[5]   =   "those";
randomWord[6]   =   "these";
randomWord[7]   =   "how ?";

function randomWord2()
{
    var randomWordGen                           =   Math.floor(Math.random()*randomWord.length);
    document.getElementById('answer').innerHTML =   randomWord[randomWordGen];
}
