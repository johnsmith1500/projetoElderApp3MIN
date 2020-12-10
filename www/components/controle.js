// This is a JavaScript file

//ações de mudança de tela

$(document).on("click","#entrouAqui", function(){
  $(location).attr("href","pages/menu.html");
});

$(document).on("click","#sair", function(){
  navigator.notification.alert("Obrigado por Utilizar o Aplicativo ElderApp");
  $(location).attr("href","../index.html");
});

$(document).on("click","#cadastro", function(){
  $(location).attr("href","/pages/form4.html");
});

$(document).on("click","#listar", function(){
  $(location).attr("href","listar.html");
});

/*
  $(window).on('load', function(){
    document.getElementById("carregando").style.display = "none";
    document.getElementById("corpo").style.display = "block";
  });
*/

var intervalo = setInterval(function (){
clearInterval(intervalo);

document.getElementById("carregando").style.display = "none";
 document.getElementById("corpo").style.display = "block";
},3850
);

