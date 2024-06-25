alert('Round 1, GO!')

function Personagem(time, nome, hp, atk, def, speed, move1, move2, move3, estado) {
    this.time = time
    this.estado = estado
    this.nome = nome
    this.hp = hp <= 0 ? 0 : hp
    this.atk = atk
    this.def = def
    this.speed = speed
    this.move1 = { nome: move1[0], poder: move1[1], pp: move1[2], calcularDano: () => this.atk * this.move1.poder }
    this.move2 = { nome: move2[0], poder: move2[1], pp: move2[2], calcularDano: () => this.atk * this.move2.poder }
    this.move3 = { nome: move3[0], poder: move3[1], pp: move3[2], calcularDano: () => this.atk * this.move3.poder }
    this.estado = 'vivo'

    this.useMove1 = function () {
        if (!inimigoSelecionado) { return }
        if (this.estado !== 'vivo') {
            alert(`${this.nome} está morto e não pode atacar!`);
            return;
        }
        --this.move1.pp
        alert(`${this.nome} Atacou!`)
        alert(`O ataque utilizado foi ${this.move1.nome}`)
        alert(`O ${inimigoSelecionado.nome} recebeu ${this.move1.calcularDano()} de dano`)
        inimigoSelecionado.hp -= this.move1.calcularDano()
        movesetSetado()
        personagensColocados()
        verificarMorte()
    }

    this.useMove2 = function () {
        if (!inimigoSelecionado) { return }
        if (this.estado !== 'vivo') {
            alert(`${this.nome} está morto e não pode atacar!`);
            return;
        }
        alert(`${this.nome} Atacou!`)
        --this.move2.pp
        alert(`O ataque utilizado foi ${this.move2.nome}`)
        alert(`O ${inimigoSelecionado.nome} recebeu ${this.move2.calcularDano()} de dano`)
        inimigoSelecionado.hp -= this.move2.calcularDano()
        movesetSetado()
        personagensColocados()
        verificarMorte()
    }

    this.useMove3 = function () {
        if (!inimigoSelecionado) { return }
        if (this.estado !== 'vivo') {
            alert(`${this.nome} está morto e não pode atacar!`);
            return;
        }
        alert(`${this.nome} Atacou!`)
        --this.move3.pp
        alert(`O ataque utilizado foi ${this.move3.nome}`)
        alert(`O ${inimigoSelecionado.nome} recebeu ${this.move3.calcularDano()} de dano`)
        inimigoSelecionado.hp -= this.move3.calcularDano()
        movesetSetado()
        personagensColocados()
        verificarMorte()
    }

    this.arrayMoves = [this.useMove1.bind(this), this.useMove2.bind(this), this.useMove3.bind(this)]
}

const persoLuffy = new Personagem('aliado', 'Luffy', 20, 5, 5, 1, ["Gomu Gomu no Pistol", 1, 3], ["Gomu Gomu no Bazooka", 2, 1], ["Gomu Gomu no Balloon", 0, 3])
const persoZoro = new Personagem('aliado', 'Zoro', 15, 4, 4, 11, ["Oni Giri", 2, 2], ["Tora Gari", 6, 1], ["Santoryu", 1, 1])
const persoKaido = new Personagem('inimigo', 'Kaido', 30, 6, 6, 8, ["Boro Breath", 3, 1], ["Thunder Bagua", 6, 1], ["Dragon Form", 1, 1])
const persoDoflamingo = new Personagem('inimigo' ,'Doflamingo', 24, 5, 4, 10, ["Overheat", 3, 1], ["Parasite", 6, 1], ["Birdcage", 1, 1])
const todosOsPersonagens = [persoKaido, persoZoro, persoDoflamingo, persoLuffy]

function sortearNumero(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function personagensColocados() {
    inimigo1Display.innerHTML = persoDoflamingo.nome + ' ' + persoDoflamingo.hp
    inimigo2Display.innerHTML = persoKaido.nome + ' ' + persoKaido.hp
    aliado1Display.innerHTML = persoLuffy.nome + ' ' + persoLuffy.hp
    aliado2Display.innerHTML = persoZoro.nome + ' ' + persoZoro.hp
}

let contagemParaAtaque = 0
let etapaAtual = 'aliado' // Etapa inicial
let aliadoSelecionado
let inimigoSelecionado
let personagensAliados = [persoLuffy, persoZoro]
let personagensInimigos = [persoDoflamingo, persoKaido]

let inimigoSelecionadoTemp
function selecionarAliado(event) {
    if (etapaAtual === 'inimigo') return
    const el = event.target
    if (el.id === 'aliado1') {
        aliadoSelecionado = personagensAliados[0]
        etapaAtual = 'inimigo'
        el.classList.add('aliadoSelecionado')
        console.log(contagemParaAtaque)
        movesetSetado()
    } else if (el.id === 'aliado2') {
        if (personagensAliados.length === 2) {
            aliadoSelecionado = personagensAliados[1]
        } else {
            aliadoSelecionado = personagensAliados[0]
        }
        etapaAtual = 'inimigo'
        el.classList.add('aliadoSelecionado')
        console.log(contagemParaAtaque)
        movesetSetado()
    }
}

function selecionarInimigo(event) {
    if (etapaAtual === 'aliado') return
    const el = event.target
    if (el.id === 'inimigo1') {
        inimigoSelecionado = personagensInimigos[0]
        contagemParaAtaque++
        etapaAtual = 'aliado'
        console.log(contagemParaAtaque)
        selecionarAtaque()
        el.classList.add('inimigoSelecionado')
    } else if (el.id === 'inimigo2') {
        if (personagensInimigos.length === 2) {
            inimigoSelecionado = personagensInimigos[1]
        } else {
            inimigoSelecionado = personagensInimigos[0]
        }
        contagemParaAtaque++
        etapaAtual = 'aliado'
        console.log(contagemParaAtaque)
        selecionarAtaque()
        el.classList.add('inimigoSelecionado')
    }
    inimigoSelecionadoTemp = inimigoSelecionado
}

function movesetSetado() {
    movesDisplay[0].innerHTML = aliadoSelecionado.move1.nome + ' ' + aliadoSelecionado.move1.pp
    movesDisplay[1].innerHTML = aliadoSelecionado.move2.nome + ' ' + aliadoSelecionado.move2.pp
    movesDisplay[2].innerHTML = aliadoSelecionado.move3.nome + ' ' + aliadoSelecionado.move3.pp
}

let inimigo1Display = document.querySelector('#inimigo1')
let inimigo2Display = document.querySelector('#inimigo2')
let inimigos = [inimigo1Display, inimigo2Display]
let aliado1Display = document.querySelector('#aliado1')
let aliado2Display = document.querySelector('#aliado2')
let aliados = [aliado1Display, aliado2Display]
let personagensSelecionados = localStorage.getItem('personagens')
let move1Display = document.querySelector('#move1')
let move2Display = document.querySelector('#move2')
let move3Display = document.querySelector('#move3')
let movesDisplay = [move1Display, move2Display, move3Display]

let moveSelecionadoID
function selecionarAtaque() {
    movesDisplay.forEach(move => {
        move.addEventListener('click', event => {
            const el = event.target
            moveSelecionadoID = String(el.id)
            ordemDeAtaque(moveSelecionadoID)
        })
    })
}

let aliadoSorteado
let inimigoSorteado
function ataqueInimigo() {
    const moveSorteadoIndex = sortearNumero(0, 3)
    const moveSorteado = inimigoSorteado.arrayMoves[moveSorteadoIndex]
    moveSorteado ()
}

persoDoflamingo.elementoHTML = inimigo1Display
persoKaido.elementoHTML = inimigo2Display
persoZoro.elementoHTML = aliado2Display
persoLuffy.elementoHTML = aliado1Display

function deletarPersonagem () {
    todosOsPersonagens.forEach(element => {
        if (element.estado === 'morto') {
            element.elementoHTML.remove()
            if (element.time === 'aliado') {
                // Remover do array personagensAliados
                personagensAliados = personagensAliados.filter(p => p !== element);
            } else {
                // Remover do array personagensInimigos
                personagensInimigos = personagensInimigos.filter(p => p !== element);
            }
        }
    });
}

let numeroRound = 1
function resetarTudo () {
    aliadoSorteado = undefined
    inimigoSelecionado = undefined
    aliadoSelecionado = undefined
    inimigoSorteado = undefined

    aliados.forEach(aliado => {
        aliado.classList.remove('aliadoSelecionado')
    })
    inimigos.forEach(inimigo => {
        inimigo.classList.remove('inimigoSelecionado')
    })
    numeroRound++

    if (personagensAliados.length === 0) {
        alert('Você perdeu!')
    } else if (personagensInimigos.length === 0) {
        alert('Você ganhou!')
    } else {
        alert('Resetou!')
        alert(`Você está no round ${numeroRound}, GO!`)
    }
}

function verificarMorte() {
    todosOsPersonagens.forEach((personagem) => {
        if (personagem.hp <= 0) {
            personagensColocados()
            alert (`${personagem.nome} morreu`)
            personagem.hp = 0
            personagem.estado = 'morto'
        }
    })
    deletarPersonagem()
    personagensColocados()
}

function ataqueAliadoSelecionado () {
    if (moveSelecionadoID === 'move1') {
        return aliadoSelecionado.useMove1()
    } else if (moveSelecionadoID === 'move2') {
        return aliadoSelecionado.useMove2()
    } else {
        return aliadoSelecionado.useMove3()
    }
}

function ordemDeAtaque(move) {
    aliadoSorteado = personagensAliados[sortearNumero(0, personagensAliados.length)];
    inimigoSorteado = personagensInimigos[sortearNumero(0, personagensInimigos.length)];
    console.log(inimigoSorteado)
    console.log(aliadoSorteado)
    console.log(aliadoSelecionado)
    console.log(inimigoSelecionado)
    if (aliadoSelecionado.speed >= inimigoSorteado.speed) {
        ataqueAliadoSelecionado(move)
        inimigoSelecionado = aliadoSorteado
        if (inimigoSelecionado.estado === 'morto') {
            alert(`${inimigoSelecionado.nome} está morto, então não ataca!`)
        }
        ataqueInimigo();
    } else {
        inimigoSelecionado = aliadoSorteado;
        ataqueInimigo();
        inimigoSelecionado = inimigoSelecionadoTemp
                if (inimigoSelecionado.estado === 'morto') {
            alert(`${inimigoSelecionado.nome} está morto, então não ataca!`)
        }
        ataqueAliadoSelecionado(move)
    }
    resetarTudo ()
}

aliados.forEach(aliado => {
    aliado.addEventListener('click', selecionarAliado)
})

inimigos.forEach(inimigo => {
    inimigo.addEventListener('click', selecionarInimigo)
})

personagensColocados()