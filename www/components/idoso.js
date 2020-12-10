// This is a JavaScript file

//ações de mudança de tela

$(document).on("click","#visualizarIdoso", function(){
  $(location).attr("href","../pages/visualizarIdoso.html");
});

//ações do banco

$(document).on("click","#cadastrarIdoso",function(){
    var parametros = {
      "nome":$("#nome").val(),
      "idade":$("#idade").val(),
      "rg":$("#rg").val(),
      "cpf":$("#cpf").val(),
      "altura":$("#altura").val(),
      "peso":$("#peso").val(),
      "endereco":$("#endereco").val(),   
      "telefone":$("#telefone").val(),
      "id_casa_de_repouso":$("#casa_de_repouso").val()   
    }
    $.ajax({
      type:"post", //como vai enviar os dados
      url:"https://projeto-elderapp3min.000webhostapp.com/elderapp/admin/Idoso.php", //pra onde vai enviar os dados
      data:parametros,//o que será enviado

      //se funcionar
      success: function(data){
        navigator.notification.alert("Idoso Cadastrado!");
        $("#nome").val(""),
        $("#idade").val(""),
        $("#rg").val(""),
        $("#cpf").val(""),
        $("#altura").val(""),
        $("#peso").val(""),
        $("#endereco").val(""),
        $("#telefone").val(""),
        $("#casa_de_repouso").val("")  
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
    url:"https://projeto-elderapp3min.000webhostapp.com/elderapp/admin/Idoso.php",
    dataType:"json", //o que vai receber ou como vai receber
    success: function(data){
      var itemLista = "";
      $.each(data.idosos, function(i,dados){
        itemLista += "<option value="+dados.id+">"+dados.nome+"</option>";
      });
      $("#listaIdosos").html(itemLista);
    },
    error: function(data){
        navigator.notification.alert("Erro ao buscar registro");
      }
  });
}

$(document).on("change","#listaIdosos",function(){
  var parametros = {
    "id": $("option:selected",("#listaIdosos")).val()
  }

  $.ajax({
    type: "post",
    url: "https://projeto-elderapp3min.000webhostapp.com/elderapp/admin/Idoso.php",
    data:parametro,
    dataType:"json",// o que vai receber e como vai receber
    success: function(data){
      $("#id").val(data.idosos.id);
      $("#nome").val(data.idosos.nome);
      $("#idade").val(data.idosos.idade);
      $("#rg").val(data.idosos.rg);
      $("#cpf").val(data.idosos.cpf);
      $("#altura").val(data.idosos.altura);
      $("#peso").val(data.idosos.peso);
      $("#telefone").val(data.idosos.telefone);
      $("#endereco").val(data.idosos.endereco);
      $("#casa_de_repouso").val(data.idosos.id_casa_de_repouso);
    },
    error: function(data){
      navigator.notification.alert("Erro ao buscar registro");
    }
  });
});

function habilitarCampos(){
  $("#nome").prop("readonly",false);
  $("#idade").prop("readonly",false);
  $("#rg").prop("readonly",false);
  $("#cpf").prop("readonly",false);
  $("#altura").prop("readonly",false);
  $("#peso").prop("readonly",false);
  $("#telefone").prop("readonly",false);
  $("#endereco").prop("readonly",false);
  $("#casa_de_repouso").prop("readonly",false);
}

function desabilitarCampos(){
  $("#nome").prop("readonly",true);
  $("#idade").prop("readonly",true);
  $("#rg").prop("readonly",true);
  $("#cpf").prop("readonly",true);
  $("#altura").prop("readonly",true);
  $("#peso").prop("readonly",true);
  $("#telefone").prop("readonly",true);
  $("#endereco").prop("readonly",true);
  $("#casa_de_repouso").prop("readonly",true);
}

$(document).on("click","#editar",function(){
  habilitarCampos();
});

$(document).on("click","#cancelar",function(){
  desabilitarCampos();
  $("#id").val("");
  $("#nome").val("");
  $("#idade").val("");
  $("#rg").val("");
  $("#cpf").val("");
  $("#altira").val("");
  $("#peso").val("");
  $("#telefone").val("");
  $("#endereco").val("");
  $("#casa_de_repouso").val("");
});

$(document).on("click","#salvarEdicao",function(){
  var parametros = {
      "id":$("#id").val(),
      "nome":$("#nome").val(),
      "idade":$("#idade").val(),
      "rg":$("#rg").val(),
      "cpf":$("#cpf").val(),
      "altura":$("#altura").val(),
      "peso":$("#peso").val(),
      "telefone":$("#telefone").val(),
      "endereco":$("#endereco").val(),
      "id_casa_de_repouso":$("#casa_de_repouso").val()   
    }
    $.ajax({
      type:"post", //como vai enviar os dados
      url:"https://projeto-elderapp3min.000webhostapp.com/elderapp/admin/atualizaIdoso.php", //pra onde vai enviar os dados
      data:parametros,//o que será enviado

      //se funcionar
      success: function(data){
        navigator.notification.alert(data);
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
      url:"https://projeto-elderapp3min.000webhostapp.com/elderapp/admin/excluirIdoso.php", //pra onde vai enviar os dados
      data:parametros,//o que será enviado

      //se funcionar
      success: function(data){
        navigator.notification.alert(data);
        location.reload();
        desabilitarCampos();  
      },

      //se não funcionar
      error: function(data){
        navigator.notification.alert("Erro ao excluir");
      }
    });
});
