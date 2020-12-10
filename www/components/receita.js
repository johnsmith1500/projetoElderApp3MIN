// This is a JavaScript file

//ações de mudança de tela

$(document).on("click","#visualizarReceita", function(){
  $(location).attr("href","../pages/visualizarReceita.html");
});

//ações do banco

$(document).on("click","#cadastrarReceita",function(){
    var parametros = {
      "id_idoso":$("#id_idoso").val(),
      "id_medicamento":$("#id_medicamento").val(),
      "descricao":$("#descricao").val()
    }
    $.ajax({
      type:"post", //como vai enviar os dados
      url:"https://projeto-elderapp3min.000webhostapp.com/elderapp/admin/Receita.php", //pra onde vai enviar os dados
      data:parametros,//o que será enviado

      //se funcionar
      success: function(data){
        navigator.notification.alert("Receita Cadastrada!");
        $("#id_idoso").val(""),
        $("#id_medicamento").val(""),
        $("#descricao").val("")        
      },

      //se não funcionar
      error: function(data){
        navigator.notification.alert("Erro ao cadastrar");
      }
    });
});

function listar(){
  $.ajax({
    type: "post",
    url:"https://projeto-elderapp3min.000webhostapp.com/elderapp/admin/Receita.php",
    dataType:"json", //o que vai receber ou como vai receber
    success: function(data){
      var itemLista = "";
      $.each(data.receitas, function(i,dados){
        itemLista += "<option value="+dados.id+">"+dados.id_idoso+"</option>";
      });
      $("#listaReceitas").html(itemLista);
    },
    error: function(data){
        navigator.notification.alert("Erro ao buscar registro");
      }
  });
}

$(document).on("change","#listaReceitas",function(){
  var parametros = {
    "id": $("option:selected",("#listaReceitas")).val()
  }

  $.ajax({
    type: "post",
    url: "https://projeto-elderapp3min.000webhostapp.com/elderapp/admin/Receits.php",
    data:parametro,
    dataType:"json",// o que vai receber e como vai receber
    success: function(data){
      $("#id").val(data.receitas.id);
      $("#id_idoso").val(data.receitas.id_idoso);
      $("#id_medicamento").val(data.receitas.id_medicamento);
      $("#descricao").val(data.receitas.descricao);
    },
    error: function(data){
      navigator.notification.alert("Erro ao buscar registro");
    }
  });
});

function habilitarCampos(){
  $("#id_idoso").prop("readonly",false);
  $("#id_medicamento").prop("readonly",false);
  $("#descricao").prop("readonly",false);
}

function desabilitarCampos(){
  $("#id_idoso").prop("readonly",true);
  $("#id_medicamento").prop("readonly",true);
  $("#descricao").prop("readonly",true);
}

$(document).on("click","#editar",function(){
  habilitarCampos();
});

$(document).on("click","#cancelar",function(){
  desabilitarCampos();
  $("#id").val("");
  $("#id_idoso").val("");
  $("#id_medicamento").val("");
  $("#descricao").val("");
});

$(document).on("click","#salvarEdicao",function(){
  var parametros = {
      "id":$("#id").val(),
      "id_idoso":$("#id_idoso").val(),
      "id_medicamento":$("#id_medicamento").val(),  
      "descricao":$("#descricao").val()  
    }
    $.ajax({
      type:"post", //como vai enviar os dados
      url:"https://projeto-elderapp3min.000webhostapp.com/elderapp/admin/atualizaReceita.php", //pra onde vai enviar os dados
      data:parametros,//o que será enviado

      //se funcionar
      success: function(data){
        navigator.notification.alert("Receita Atualizada!");
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
      url:"https://projeto-elderapp3min.000webhostapp.com/elderapp/admin/excluirReceita.php", //pra onde vai enviar os dados
      data:parametros,//o que será enviado

      //se funcionar
      success: function(data){
        navigator.notification.alert("Receita Excluída!");
        location.reload();
        desabilitarCampos();  
      },

      //se não funcionar
      error: function(data){
        navigator.notification.alert("Erro ao excluir");
      }
    });
});

