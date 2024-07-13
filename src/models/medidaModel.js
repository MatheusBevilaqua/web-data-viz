var database = require("../database/config");

function buscarUltimasMedidas() {

    var instrucaoSql = `SELECT 

    (SELECT count(score) FROM Quiz 
    WHERE score = 0)as zero,
    
    (SELECT count(score) FROM Quiz
    WHERE score = 1)as um,
    
    (SELECT count(score) FROM Quiz 
    WHERE score = 2)as dois,
    
    (SELECT count(score) FROM Quiz 
    WHERE score = 3)as tres,
    
    (SELECT count(score) FROM Quiz 
    WHERE score = 4)as quatro;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {

    var instrucaoSql = `SELECT 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        FROM medida WHERE fk_aquario = ${idAquario} 
                    ORDER BY id DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarQuiz(score,idUsuario) {
     var instrucaoSql = `INSERT INTO Quiz (score, fkUsuario) VALUES 
     (${score}, ${idUsuario})     
     `
     console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarQuiz,
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
