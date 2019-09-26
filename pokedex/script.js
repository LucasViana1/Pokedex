const urlPokemon = 'https://pokeapi.co/api/v2/pokemon/'
const urlAllPokemons = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151'
let species;//rever
let evolucao;//rever
let primeiraGeracao = {}

async function carregar(){
    primeiraGeracao = await requisitaAllPokemons()
    buscar(3)
    //console.log(primeiraGeracao)
}

async function requisitaAllPokemons(){
    const todos = fetch(urlAllPokemons)
    .then(response =>{
        return response.json()
    })
    .then(data =>{
        //console.log(data.results)
        return data.results
    })
    return todos
}

let idAtual = 1
//comando: 0 (usou input texto para pesquisa), 1 (usou botao de proximo), 2 (usou botao de anterior), 3 (apenas usado no carregamento da pagina, exibindo primeiro pokemon do pokedex)
function buscar(comando=0){
    console.log(idAtual)

    //caso seja usado a busca pelo input de texto
    if(comando == 0){

        let txtNomePokemon = document.getElementById("entrada")//recebe nome e deixa minusculo
        let nomePokemon = txtNomePokemon.value
        nomePokemon = nomePokemon.toLowerCase()
        let verificaPoke = 0//controla se o nome do pokemon é da primeira geração
    
        //condição para saber se foi digitado id ou nome do pokemon
        if(!isNaN(Number(nomePokemon))){
            //console.log("é numero")
            const idPoke = Number(nomePokemon)
            if(idPoke < 152 && idPoke > 0){
                verificaPoke = 1
            }
        }
        else{
            //console.log("é string")
            for(let i = 0; i < primeiraGeracao.length; i++){
                //console.log(`${primeiraGeracao[i].name} => ${nomePokemon}`)
                if(nomePokemon == primeiraGeracao[i].name){
                    verificaPoke = 1
                }
            }
        }
    
        //ação após verificação do nome/id (string/int) pokemon
        if(verificaPoke == 0){
            alert("Insirá um Pokémon da 1º Geração")
        }
        else{  
            pokemonData(nomePokemon)
        }
    }
    //inicio da página
    else if(comando == 3){
        pokemonData(idAtual)
    }
    //caso seja usado o botao de proximo/anterior
    else if(comando == 1){
        idAtual += 1
        if(idAtual > 151) idAtual = 1 //caso chegue no limite da primeira geração
        pokemonData(idAtual)
    }
    else{
        idAtual -= 1
        //console.log(idAtual)
        if(idAtual < 1) idAtual = 151 //caso chegue no limite da primeira geração
        pokemonData(idAtual)
    }

    
}

function removeBarraStatus(pai,filho){
    for(let i = 0; i < filho.length; i++){
        pai.removeChild(filho[i])
    }
}

function pokemonData(id){
    
    fetch(urlPokemon+id)
    .then(response => {
        //console.log(response.json())
        return response.json()
    })
    .then(dados => {
        //console.log(dados)//debug
        //identificador
        document.getElementById('nome').innerHTML = (dados.name).toUpperCase()
        document.getElementById('id').innerHTML = "#" + dados.id
        idAtual = dados.id//vincula o id do atual pokemon, o que está sendo visualizado no momento
        //image
        document.getElementById('front_default').src = dados.sprites.front_default
        document.getElementById('back_default').src = dados.sprites.back_default
        document.getElementById('front_shiny').src = dados.sprites.front_shiny
        document.getElementById('back_shiny').src = dados.sprites.back_shiny
        //caracteristicas
        document.getElementById('altura').innerHTML = dados.height
        document.getElementById('peso').innerHTML = dados.weight
        let habilidades = document.getElementById('habilidades')
        habilidades.innerHTML = ''
        dados.abilities.map(function(item){
            habilidades.innerHTML += " " + item.ability.name
        })   
        let tipos = document.getElementById('tipos')//talvez remover
        let arrayTipos = []
        dados.types.map(function(item){
            //ao exibir os tipos, focar em casos de pokemon de 1 ou 2 tipos
            //tipos.innerHTML += " " + item.type.name//TALVEZ REMOVER
            //armazena o(s) tipo(s) de um pokemon para posteriormente determinar a cor do pokemon
            arrayTipos.push(item.type.name)
        })

        
        dados.stats.map(function(item){
            
            insereQtdStatus(item.stat.name, item.base_stat)
        })

        function insereQtdStatus(nome,base_status){
            let qtd = base_status
            switch(nome){
                case 'speed': 
                    let speedBarra = document.getElementById('speed-barra')
                    /*let speedQtd = */document.getElementById('speed').innerHTML = qtd
                    //barraStatus(speedBarra,qtd,nome)
                    document.getElementById('grafico-speed').style.width = `${qtd*3}px`
                    break;
                case 'special-attack': 
                    let specialAtackBarra = document.getElementById('special-atack-barra')
                    document.getElementById('special-atack').innerHTML = qtd
                    //barraStatus(specialAtackBarra,qtd,nome)
                    document.getElementById('grafico-special-attack').style.width = `${qtd*3}px`
                    break;
                case 'special-defense': 
                    let specialDefenseBarra = document.getElementById('special-defense-barra')
                    document.getElementById('special-defense').innerHTML = qtd
                    //barraStatus(specialDefenseBarra,qtd,nome)
                    document.getElementById('grafico-special-defense').style.width = `${qtd*3}px`
                    break;
                case 'defense': 
                    let defenseBarra = document.getElementById('defense-barra')
                    document.getElementById('defense').innerHTML = qtd
                    document.getElementById('grafico-defense').style.width = `${qtd*3}px`
                    //barraStatus(defenseBarra,qtd,nome)
                    break;
                case 'attack': 
                    let atackBarra = document.getElementById('atack-barra')
                    document.getElementById('atack').innerHTML = qtd
                    //barraStatus(atackBarra,qtd,nome)
                    document.getElementById('grafico-attack').style.width = `${qtd*3}px`
                    break;
                case 'hp': 
                    let hpBarra = document.getElementById('hp-barra')
                    document.getElementById('hp').innerHTML = qtd
                    //barraStatus(hpBarra,qtd,nome)
                    document.getElementById('grafico-hp').style.width = `${qtd*3}px`
                    break;
                default:
                    console.log(`Falha ao vincular ${nome} com base ${qtd} na tela`)
                    break
            }
        }
       
        function barraStatus(statusBarra,qtd,nomeStatus){
            
            for(let i = 0; i < qtd; i++){
                let add = document.createElement('div')
                add.setAttribute('class', `status-value ${nomeStatus}-id`)
                //add.setAttribute('class', 'status-value speed-id')
                statusBarra.appendChild(add)
            }
        }
        
        //Determinar a cor do pokemon (temporariamente armazena o tipo)
        let cor1 = vinculaCor(arrayTipos[0])
        let cor2 = vinculaCor(arrayTipos[1])

        //Se o pokemon possui apenas um tipo
        if(cor2 == null || cor2 == ''){
            cor2 = cor1
        }

        document.getElementById('foto').style.backgroundImage = `linear-gradient(${cor1}, ${cor2})`
        document.getElementById('nome').style.color = cor1
        //console.log("cor1: "+cor1)
        //console.log("cor2: "+cor2)

        //vincula os tipos em cada div
        document.getElementById('tipo1').innerHTML = arrayTipos[0]//descrição
        document.getElementById('tipo1').style.backgroundColor = cor1//cor
        //condicional caso pokemon seja de apenas um tipo
        if(arrayTipos.length == 2){
            document.getElementById('tipo2').innerHTML = arrayTipos[1]//descrição
            document.getElementById('tipo2').style.backgroundColor = cor2//cor
        } 
        else {
            document.getElementById('tipo2').innerHTML = ''
            document.getElementById('tipo2').style.backgroundColor = 'rgb(255,255,255)'
        }

        //Vincular a cor efetivamente com base no tipo do pokemon (em gradiente)
        function vinculaCor(tipoCor){
            let cor = tipoCor
            switch(cor){
                case 'bug': cor = 'rgb(2, 100, 2)'; break;
                case 'dark': cor = 'black'; break;
                case 'dragon': cor = 'rgba(38, 104, 247, 0.767)'; break;
                case 'electric': cor = 'yellow'; break;
                case 'fairy': cor = 'pink'; break;
                case 'fighting': cor = 'orange'; break;
                case 'fire': cor = 'red'; break;
                case 'flying': cor = 'rgb(55, 103, 127)'; break;
                case 'ghost': cor = 'rgb(48, 48, 109)'; break;
                case 'grass': cor = 'green'; break;
                case 'ground': cor = 'rgb(186, 113, 34)'; break;
                case 'ice': cor = 'rgb(80, 211, 247)'; break;
                case 'normal': cor = 'rgb(129, 81, 92)'; break;
                case 'poison': cor = 'rgba(128, 0, 128, 0.9)'; break;
                case 'psychic': cor = 'rgb(192, 37, 110)'; break;
                case 'rock': cor = 'rgb(82, 18, 4)'; break;
                case 'steel': cor = 'rgb(85, 18, 110)'; break;
                case 'water': cor = 'blue'; break;
    
                default: cor = ''; console.log("erro ao vincular cor do pokemon"); break;
            }

            return cor
        }

        

        //console.log("cor: "+cor1)
        
        /*for(i in arrayTipos){
            console.log(arrayTipos[i])
            //switch(arrayTipos)
        }*/


        return dados//debug
    })
}

//


//chamando pokemon pelo id estaticamente
//console.log(pokemonData("5"))


//let poke = new Pokemon(pokemonData())
//console.log(poke.getTudo())
/*
class Pokemon{
    constructor(dataPoke){
        this.tudo = dataPoke
    }

    getTudo(){
        return this.tudo
    }
}*/

/*DESCONTINUADO METODO DE REMOVER AS BARRAS DE STATUS
//speed
        let speedPai = document.getElementById('speed-barra')
        let speedFilho = document.getElementsByClassName('speed-id')
        removeBarraStatus(speedPai,speedFilho)

        //special-atack
        let specialAtackPai = document.getElementById('special-atack-barra')
        let specialAtackFilho = document.getElementsByClassName('special-attack-id')//TALVEZ PEGAR ESSE DADO DINAMICAMENTE ATRAVÉS DA REQUISIÇÃO
        removeBarraStatus(specialAtackPai,specialAtackFilho)

        //special-defense
        let specialDefensePai = document.getElementById('special-defense-barra')
        let specialDefenseFilho = document.getElementsByClassName('special-defense-id')//TALVEZ PEGAR ESSE DADO DINAMICAMENTE ATRAVÉS DA REQUISIÇÃO
        removeBarraStatus(specialDefensePai,specialDefenseFilho)

        //atack
        let atackPai = document.getElementById('atack-barra')
        let atackFilho = document.getElementsByClassName('attack-id')
        removeBarraStatus(atackPai,atackFilho)

        //defense
        let defensePai = document.getElementById('defense-barra')
        let defenseFilho = document.getElementsByClassName('defense-id')
        removeBarraStatus(defensePai,defenseFilho)

        //hp
        let hpPai = document.getElementById('hp-barra')
        let hpFilho = document.getElementsByClassName('hp-id')//TALVEZ PEGAR ESSE DADO DINAMICAMENTE ATRAVÉS DA REQUISIÇÃO
        removeBarraStatus(hpPai,hpFilho)

        //remove filhos
        for(let i = 0; i < speedFilho.length; i++){
            speedPai.removeChild(speedFilho[i])
        }*/
