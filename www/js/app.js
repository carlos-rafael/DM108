/**/
 myApp = new Framework7({
    material:false
});

//exportando, para não causar conflito com jquery
var $$ = Dom7;

//Adicionando uma view principal 
var myView = myApp.addView('.view-main',{
    dynamicNavbar:true
});