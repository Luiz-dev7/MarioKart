const player1 = {  
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
};//aqui está criado um objeto, aonde guarda as informações do player em questão

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0
};//aqui está criado um objeto, aonde guarda as informações do player em questão

const player3 = {
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0
};//aqui está criado um objeto, aonde guarda as informações do player em questão


const player4 = {
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0
};//aqui está criado um objeto, aonde guarda as informações do player em questão

const player5 = {
    NOME: "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0
};//aqui está criado um objeto, aonde guarda as informações do player em questão

const player6 = {
    NOME: "Donkey Kong",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0
};//aqui está criado um objeto, aonde guarda as informações do player em questão

async function rolldice(){
    return Math.floor(Math.random() * 6) + 1;//aqui está a lógica atras da rolagem
}; // aqui tá uma função assincrona para fazer a rolagem dos dados, e termos os números de forma randomica

async function getRandomBlock(){
    let random = Math.random();//biblioteca math para fazer de forma randomica a seleção dos blocos

    let result;  

    switch (true) {
        case random <0.33:
            result ="RETA";
            break;
        case random  <0.66:
            result = "CURVA";
            break;

        default:
            result = "CONFRONTO";
          
    }// aqui tá o case switch aonde vai decidir qual bloco está sendo chamado
    return result; //aqui após todo o caso de switch case ele passa o valor para a let result, para ser passado o valor do bloco na function
}// aqui tá à lógica por trás do blocos



async function playRaceEngine(character1, character2){
    for(let round =1; round <=5; round++){
        console.log(`🏁 Rodada ${round}`);// aqui no for está à lógica por trás das rodadas, fazendo um loop de sequencia


        //sortear bloco
       let bloco = await getRandomBlock();// aqui chamamos a function randomblock que decidiu quais blocos vão ocorrer nas rodadas
       console.log(`Bloco: ${bloco}`);// aqui aparece quais foram os blocos gerados

        //rolar os dados
        let diceResults1 = await rolldice(); // aqui eu convoco as functions e espero elas acabarem antes de executar qualquer coisa
        let diceResults2 = await rolldice();

        //teste de habilidade
        let TotalTestSkill1 = 0;   
        let TotalTestSkill2 = 0;   
        
        if(bloco === "RETA"){
         TotalTestSkill1 = diceResults1 + character1.VELOCIDADE; //aqui eu começo a logica de desafio utilizando condicionais para ver os resultados da rolagem dos dados e a skill do personagem
         TotalTestSkill2 = diceResults2 + character2.VELOCIDADE;

         await logRollResult(
            character1.NOME,
            "velocidade", 
            diceResults1,
            character1.VELOCIDADE);
            
        await logRollResult(
            character2.NOME,
            "velocidade",
            diceResults2,
            character2.VELOCIDADE
        )
        };

        if(bloco === "CURVA"){
        TotalTestSkill1 = diceResults1 + character1.MANOBRABILIDADE; //aqui está o caso de manobrabilidade
        TotalTestSkill2 = diceResults2 + character2.MANOBRABILIDADE;
        
        await logRollResult(
            character1.NOME,
            "manobrabilidade", 
            diceResults1,
            character1.MANOBRABILIDADE);
            
        await logRollResult(
            character2.NOME,
            "manobrabilidade",
            diceResults2,
            character2.MANOBRABILIDADE
        )
        };


        if(bloco === "CONFRONTO"){
        let PowerResult1 = diceResults1 + character1.PODER
        let PowerResult2 = diceResults2 + character2.PODER
        let rng = Math.random();

        console.log(`${character1.NOME} confrontou ${character2.NOME}! 🥊`)

        await logRollResult(
            character1.NOME,
            "poder", 
            diceResults1,
            character1.PODER);
            
        await logRollResult(
            character2.NOME,
            "poder",
            diceResults2,
            character2.PODER
        );

        

        if(PowerResult1 > PowerResult2 && character2.PONTOS > 0){
            if(rng > 0.2){
                console.log(`${character1.NOME} Venceu o confronto! ${character2.NOME} perdeu um ponto 🐢`)
                character2.PONTOS--;
            }
            else{
                console.log(`${character1.NOME} Venceu o confronto! ${character2.NOME} perdeu dois pontos a bomba explodiu 💣`)
                character2.PONTOS--; 
                character2.PONTOS--;
            }
            
           
        }


        if(PowerResult2 >PowerResult1 && character1.PONTOS > 0){
            if(rng > 0.4){
                character1.PONTOS--;
                console.log(`${character2.NOME} Vence o confronto! ${character1.NOME} perdeu um ponto 🐢`)
            }
            else{
                console.log(`${character2.NOME} Venceu o confronto! ${character1.NOME} perdeu dois pontos a bomba explodiu 💣`)
                character1.PONTOS--; 
                character1.PONTOS--;
            }
            
        }// aqui são if combinados aonde ve o vencedor do confronto, verificando quantidade de pontos e quem venceu e se sera tirado um ponto

        

        console.log(PowerResult1 === PowerResult2 ?"Confronto empatado! nenhum ponto foi perdido" : "" )
        };

        //Verificando o vencendor
        if(TotalTestSkill1 > TotalTestSkill2){
            console.log(`${character1.NOME} marcou um ponto`);
            character1.PONTOS++;
        }else if(TotalTestSkill2 > TotalTestSkill1){
            console.log(`${character2.NOME} marcou um ponto`);
            character2.PONTOS++;
        }
        console.log('---------------------------')
    };
};

async function Winner(character1, character2){
    console.log("resultado final: ")    
    console.log(`${character1.NOME}: ${character1.PONTOS}: ponto(s)`)
    console.log(`${character2.NOME}: ${character2.PONTOS}: ponto(s)`)

    if(character1.PONTOS > character2.PONTOS){
        console.log(`\n${character1.NOME} Venceu a corrida! Parábens!🏆 `)
    }else if(character2.PONTOS > character1.PONTOS){
        console.log(`\n${character2.NOME} Venceu a corrida! Parábens!🏆 `)
    }else{
        console.log("A corrida terminou empatada")
    }


};//função para declarar o vencedor da partida


async function logRollResult(characterName, bloco, Diceresults, attribute){
    console.log(`${characterName} 🎲rolou um dado de ${bloco} ${Diceresults} + ${attribute} = ${Diceresults + attribute}`); // aqui ele faz o calculo já das retas e curvas
};// função de encapusulamento para não ter uma repetição da mesma linha do codigo varias vezes


(async function main() {
    console.log(`🏁Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);//aqui eu utilizei um template string para deixar o texto dinamico conforme os personagems
    
    await playRaceEngine(player1, player2);// aqui ele aguarda a function playrace 

    await Winner(player1, player2);

})(); //aqui eu to declarando a função main como auto invocavel para não ter que ficar chamando ela

