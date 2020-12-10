// This is a JavaScript file

//ações de mudança de tela

$(document).on("click","#visualizarCasadeRepouso", function(){
  $(location).attr("href","../pages/visualizarCasadeRepouso.html");
});

//ações do banco

$(document).on("click","#cadastrarCasadeRepouso",function(){
    var parametros = {
      "nome":$("#nome").val(),
      "telefone":$("#telefone").val(),
      "endereco":$("#endereco").val(),
      "qtd_idoso":$("#qtd_idoso").val(),
      "qtd_funcionario":$("#qtd_funcionario").val()  
    }
    $.ajax({
      type:"post", //como vai enviar os dados
      url:"https://projeto-elderapp3min.000webhostapp.com/elderapp/admin/CasadeRepouso.php", //pra onde vai enviar os dados
      data:parametros,//o que será enviado

      //se funcionar
      success: function(data){
        navigator.notification.alert("Casa de Repouso Cadastrado!");
        $("#nome").val(""),
        $("#telefone").val(""),
        $("#endereco").val(""),
        $("#qtd_idoso").val(""),
        $("#qtd_funcionario").val("") 
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
    url:"https://projeto-elderapp3min.000webhostapp.com/elderapp/admin/CasadeRepouso.php",
    dataType:"json", //o que vai receber ou como vai receber
    success: function(data){
      var itemLista = "";
      $.each(data.casasderepouso, function(i,dados){
        itemLista += "<option value="+dados.id+">"+dados.nome+"</option>";
      });
      $("#listaCasasdeRepouso").html(itemLista);
    },
    error: function(data){
        navigator.notification.alert("Erro ao buscar registro");
      }
  });
}

$(document).on("change","#listaCasasdeRepouso",function(){
  var parametros = {
    "id": $("option:selected",("#listaCasasdeRepouso")).val()
  }

  $.ajax({
    type: "post",
    url: "https://projeto-elderapp3min.000webhostapp.com/elderapp/admin/CasadeRepouso.php",
    data:parametro,
    dataType:"json",// o que vai receber e como vai receber
    success: function(data){
      $("#id").val(data.casasderepouso.id);
      $("#nome").val(data.casasderepouso.nome);
      $("#telefone").val(data.casasderepouso.telefone);
      $("#endereco").val(data.casasderepouso.endereco);
      $("#qtd_idoso").val(data.casasderepouso.qtd_idoso);
      $("#qtd_funcionario").val(data.casasderepouso.qtd_funcionario);
    },
    error: function(data){
      navigator.notification.alert("Erro ao buscar registro");
    }
  });
});

function habilitarCampos(){
  $("#nome").prop("readonly",false);
  $("#telefone").prop("readonly",false);
  $("#endereco").prop("readonly",false);
  $("#qtd_idoso").prop("readonly",false);
  $("#qtd_funcionario").prop("readonly",false);

}

function desabilitarCampos(){
  $("#nome").prop("readonly",true);
  $("#telefone").prop("readonly",true);
  $("#endereco").prop("readonly",true);
  $("#qtd_idoso").prop("readonly",true);
  $("#qtd_funcionario").prop("readonly",true);
}

$(document).on("click","#editar",function(){
  habilitarCampos();
});

$(document).on("click","#cancelar",function(){
  desabilitarCampos();
  $("#id").val("");
  $("#nome").val("");
  $("#telefone").val("");
  $("#endereco").val("");
  $("#qtd_idoso").val("");
  $("#qtd_funcionario").val("");
});

$(document).on("click","#salvarEdicao",function(){
  var parametros = {
      "id":$("#id").val(),
      "nome":$("#nome").val(),
      "telefone":$("#telefone").val(),
      "endereco":$("#endereco").val(),
      "qtd_idoso":$("#qtd_idoso").val(),
      "qtd_funcionario":$("#qtd_funcionario").val()   
    }
    $.ajax({
      type:"post", //como vai enviar os dados
      url:"https://projeto-elderapp3min.000webhostapp.com/elderapp/admin/atualizaCasadeRepouso.php", //pra onde vai enviar os dados
      data:parametros,//o que será enviado

      //se funcionar
      success: function(data){
        navigator.notification.alert("Casa de Repouso Atualizada!");
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
      url:"https://projeto-elderapp3min.000webhostapp.com/elderapp/admin/excluirCasadeRepouso.php", //pra onde vai enviar os dados
      data:parametros,//o que será enviado

      //se funcionar
      success: function(data){
        navigator.notification.alert("Casa de Repouso Excluída!");
        location.reload();
        desabilitarCampos();  
      },

      //se não funcionar
      error: function(data){
        navigator.notification.alert("Erro ao excluir");
      }
    });
});
