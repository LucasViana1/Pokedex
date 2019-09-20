const URLpoke = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964"
let todosPokemon;

function carregar(){
    //sem arrow function:
    /*fetch(URLpoke)
    .then(function(response) {
        return response.json()
    }).then(function(dados) {
        //console.log(dados)
        //ret.innerHTML = dados.results[0].name
        return dados.results
    }).then(function(lista){
        //console.log(lista[0].name)
        todosPokemon = lista
        console.log(todosPokemon)
    })*/

    //usando arrow function:
    fetch(URLpoke)
    .then(response => {
        return response.json()
    }).then(dados => {

        return dados.results
    }).then(lista => {

        todosPokemon = lista
        console.log(todosPokemon)
    })
}

function buscar(){
    let txtNomePokemon = document.getElementById("nome")//recebe nome e deixa minusculo
    let nomePokemon = txtNomePokemon.value
    nomePokemon = nomePokemon.toLowerCase()

    for(i in todosPokemon){
        if(nomePokemon == todosPokemon[i].name){
            //console.log("ok")
            fetch(todosPokemon[i].url)
            .then(response => {
                return response.json()
            }).then(dados => {
                let habilidades = dados.abilities
                let altura = dados.height
                let id = dados.id
                let moves = dados.moves
                let img = dados.sprites.front_default
                let peso = dados.weight
                //species
                //types

                let retorno = document.getElementById('retorno')

                for(i in habilidades){
                    //retorno.innerHTML += habilidades[i].ability.name + '<br>'
                    retorno.innerHTML += moves[i] + '<br>'
                }

                console.log(img)

                for(i in moves){
                    //console.log(moves[i].move) 
                }

                //console.log(moves)

                //return dados.results
            })/*.then(lista => {

                todosPokemon = lista
                console.log(todosPokemon)
            })*/
        }
    }
}

