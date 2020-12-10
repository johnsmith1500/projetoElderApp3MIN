// This is a JavaScript file

//ações de mudança de tela

$(document).on("click","#visualizarMedicamento", function(){
  $(location).attr("href","../pages/visualizarMedicamento.html");
});

//ações do banco

$(document).on("click","#cadastrarMedicamento",function(){
    var parametros = {
      "nome":$("#nome").val(),
      "tipo":$("#tipo").val()  
    }
    $.ajax({
      type:"post", //como vai enviar os dados
      url:"https://projeto-elderapp3min.000webhostapp.com/elderapp/admin/Medicamento.php", //pra onde vai enviar os dados
      data:parametros,//o que será enviado

      //se funcionar
      success: function(data){
        navigator.notification.alert("Medicamento Cadastrado!");
        $("#nome").val(""),
        $("#tipo").val("")
      },

      //se não funcionar
      error: function(data){
       // navigator.notification.alert("Erro ao cadastrar");
      }
    });
});

function listar(){
  $.ajax({
    type: "post",
    url:"https://projeto-elderapp3min.000webhostapp.com/elderapp/admin/Medicamento.php",
    dataType:"json", //o que vai receber ou como vai receber
    success: function(data){
      var itemLista = "";
      $.each(data.medicamentos, function(i,dados){
        itemLista += "<option value="+dados.id+">"+dados.nome+"</option>";
      });
      $("#listaMedicamentos").html(itemLista);
    },
    error: function(data){
       // navigator.notification.alert("Erro ao buscar registro");
      }
  });
}

$(document).on("change","#listaMedicamentos",function(){
  var parametros = {
    "id": $("option:selected",("#listaMedicamentos")).val()
  }

  $.ajax({
    type: "post",
    url: "https://projeto-elderapp3min.000webhostapp.com/elderapp/admin/Medicamento.php",
    data:parametro,
    dataType:"json",// o que vai receber e como vai receber
    success: function(data){
      $("#id").val(data.casasderepouso.id);
      $("#nome").val(data.casasderepouso.nome);
      $("#tipo").val(data.casasderepouso.tipo);
    },
    error: function(data){
      navigator.notification.alert("Erro ao buscar registro");
    }
  });
});

function habilitarCampos(){
  $("#nome").prop("readonly",false);
  $("#tipo").prop("readonly",false);
}

function desabilitarCampos(){
  $("#nome").prop("readonly",true);
  $("#tipo").prop("readonly",true);
}

$(document).on("click","#editar",function(){
  habilitarCampos();
});

$(document).on("click","#cancelar",function(){
  desabilitarCampos();
  $("#id").val("");
  $("#nome").val("");
  $("#tipo").val("");
});

$(document).on("click","#salvarEdicao",function(){
  var parametros = {
      "id":$("#id").val(),
      "nome":$("#nome").val(),
      "tipo":$("#tipo").val()  
    }
    $.ajax({
      type:"post", //como vai enviar os dados
      url:"https://projeto-elderapp3min.000webhostapp.com/elderapp/admin/atualizaMedicamento.php", //pra onde vai enviar os dados
      data:parametros,//o que será enviado

      //se funcionar
      success: function(data){
        navigator.notification.alert("Medicamento Atualizado!");
        location.reload();
        desabilitarCampos();  
      },

      //se não funcionar
      error: function(data){
        navigator.notification.alert("Erro ao cadastrar");
      }
    });
});

$(document).on("click","#excluir",function(){
  var parametros = {
      "id":$("#id").val()   
    }
    $.ajax({
      type:"post", //como vai enviar os dados
      url:"https://projeto-elderapp3min.000webhostapp.com/elderapp/admin/excluirMedicamento.php", //pra onde vai enviar os dados
      data:parametros,//o que será enviado

      //se funcionar
      success: function(data){
        navigator.notification.alert("Medicamento Excluído!");
        location.reload();
        desabilitarCampos();  
      },

      //se não funcionar
      error: function(data){
        navigator.notification.alert("Erro ao excluir");
      }
    });
});
