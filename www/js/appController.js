//Arquivo responsável pelas operações relacionadas à lógica principal do aplicativo
    //Declaração da var db, que representa o banco de dados, como null
    var db = null;
    
    //define o que acontecerá quando o dispositivo estiver pronto para executar as funções do aplicativo
    document.addEventListener("deviceready", function(){
        //var db iniciará um banco com nome quotes.db
        db = window.sqlitePlugin.openDatabase({name: "quotes.db"});
        //função que criará o banco caso o mesmo não exista, com os campos "author" e "quote" do tipo texto
        db.transaction(function(tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS quotes (author text primary key, quote text)");
        }, function(err){
            //em caso de erro, uma mensagem genérica será exibida
            alert("Desculpe, algo de errado aconteceu");
        });
    }, false);
    
    //função responsável por limpar os campos presentes na aplicaçãoquando o usuário clicar no botão "Limpar"
    function clearFields(){
        //os campos de id author e quote recebem o valor vazio
        $$('#author').val('');
        $$('#quote').val('');
    };

    //função responsável por adicionar uma nova citação ao banco
    function add()
    {
        //os campos textarea são identificados por seus respectivos ids e alocados cada um a uma variável
        var author = document.getElementById("author").value;
        var quote = document.getElementById("quote").value;

        //tratamento caso o campo author seja vazio
        if(author == "")
        {   
            alert("Por favor insira um autor");
            return;
        }
        //tratamento caso o campo quote seja vazio
        if(quote == "")
        {
            alert("Por favor insira uma citação");
            return;
        }

        //se os campos author e quote não forem vazios, a operação de inserção da citação é executada
        db.transaction(function(tx) {
            //sql para inserção da citação ao banco quotes
            tx.executeSql("INSERT INTO quotes (author, quote) VALUES (?,?)", [author, quote], function(tx,res){

                myApp.alert('Citação adicionada e salva com sucesso!', 'Eba!');
                //após inserir a citação ao banco, os campos author e quote são esvaziados
                clearFields();
            });
        }, function(err){
            //caso algum erro aconteça durante a operação, uma mensagem genérica é exibida ao usuário
            myApp.alert('Que pena, algo de errado aconteceu','=/');
        });
    }
    
    //função responsável por listar todos os registros de citações no banco
    function listQuotes(){

        db.transaction(function(tx) {
            //sql que busca todos os registro presentes no banco quotes
            tx.executeSql("SELECT * FROM quotes", [], function(tx,res){
                //o conteúdo do elemento data-list é esvaziado
                document.getElementById("data-list").innerHTML = "";
                console.log("Sucesso", res);
                if(res.rows.length==0){
                    document.getElementById("data-list").innerHTML = document.getElementById("data-list").innerHTML +
                    '<div class="card">'+
                    '<div class="card-content">'+
                        '<div class="card-content-inner">'+"Não há citações cadastradas"+'</div>'+
                    '</div>'+
                    '</div>'; 

                }
                else{
                //para cada registro encontrado no banco, tal elemento será desenhado dentro do elemento data-list (o qual é uma unordered list (ul))
                for(var iii = 0; iii < res.rows.length; iii++)
                {
                    //utilizei o componente card para exibir cada citação, colocando o author como header do card, e a quote como content do card
                    document.getElementById("data-list").innerHTML = document.getElementById("data-list").innerHTML +
                    '<div class="card">'+
                    '<div class="card-header">'+"Autor: "+res.rows.item(iii).author+'</div>'+
                    '<div class="card-content">'+
                        '<div class="card-content-inner">'+"\""+res.rows.item(iii).quote+"\""+'</div>'+
                    '</div>'+
                '</div>'; 
                }
                //debugging purposes console.log("número de linhas no banco é: ",res.row.length);
                }
            });
        }, function(err){
            //caso algum erro aconteça, uma mensagem genércia é exibida ao usuário
            console.log("erro", err);
            console.log("err", res);
            myApp.alert('Infelizmente algo errado aconteceu.','=/');
        });
    }