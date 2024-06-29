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
    this.move3 = { nome: move3[0], poder: move3[1], pp: move3[2], tipo: move3[3], atk: move3[4], calcularDano: () => this.atk * this.move3.poder }
    this.estado = 'vivo'
    this.arrayMoves = [this.useMove1.bind(this), this.useMove2.bind(this), this.useMove3.bind(this)]
}


Personagem.prototype.basicoAtk = function (move) {
    if (!inimigoSelecionado) { return }
    if (this.estado !== 'vivo') {
        textoAtualizando((`${this.nome} está morto e não pode atacar!`))
        return
    }
    --move.pp
    textoAtualizando((`${this.nome} Atacou!`))
    textoAtualizando((`O ataque utilizado foi ${move.nome}`))
    textoAtualizando(`(O ${inimigoSelecionado.nome} recebeu ${move.calcularDano()} de dano)`)
    inimigoSelecionado.hp -= move.calcularDano()
    movesetSetado()
    personagensColocados()
    verificarMorte()
}

Personagem.prototype.useMove1 = function () {
    if (this.move1.pp === 0 && this.move2.pp === 0 && this.move3.pp === 0) {
        textoAtualizando((`Todos os ataques do ${this.nome} acabaram!`))
        return
    }
    if (this.move1.pp === 0) {
        this.useMove2()
        return
    }
    this.basicoAtk(this.move1)
}

Personagem.prototype.useMove2 = function () {
    if (this.move2.pp === 0) {
        this.useMove3()
        return
    }
    this.basicoAtk(this.move2)
}

Personagem.prototype.useMove3 = function () {
    if (this.move3.pp === 0) {
        this.useMove1()
        return
    }
    if (!inimigoSelecionado) {
        textoAtualizando(('deu pau'))
        return
    }
    if (this.estado !== 'vivo') {
        textoAtualizando((`${this.nome} está morto e não pode atacar!`))
        return
    }
    if (move3[3] === 1) {
        textoAtualizando((`${this.nome} Atacou!`))
        if (this.time === 'aliado') {
            inimigoSelecionado = personagensInimigos
        } else {
            inimigoSelecionado = personagensAliados
        }
        if (personagensAliados.length === 1) {
            textoAtualizando((`O ataque utilizado foi ${this.move3[0]} em área!`))
            textoAtualizando((`O ${inimigoSelecionado[0].nome} recebeu ${this.move3.calcularDano()} de dano`))
            inimigoSelecionado.hp -= this.move3.calcularDano()
            movesetSetado()
            personagensColocados()
            verificarMorte()
        } else {
            textoAtualizando((`O ataque utilizado foi ${this.move3.nome} em área!`))
            textoAtualizando((`O ${inimigoSelecionado[0].nome} recebeu ${this.move3.calcularDano()} de dano`))
            textoAtualizando(`O ${inimigoSelecionado[1].nome} recebeu ${this.move3.calcularDano()} de dano`)
            inimigoSelecionado[0].hp -= this.move3.calcularDano()
            inimigoSelecionado[1].hp -= this.move3.calcularDano()
            inimigoSelecionado[0].speed -= 0.8
            inimigoSelecionado[1].speed -= 0.8
            movesetSetado()
            personagensColocados()
            verificarMorte()
        }
    }
    if (move3[3] === 2) {
        textoAtualizando(`${this.nome} se transformou em ${move3[0]}!`)
        this.speed *= 1.5
        this.atk *= 1.5
        this.def *= 1.5
        this.basicoAtk(this.move3)

    }
    if (move3[3] === 3) {
        textoAtualizando((`${this.nome} stunou ${inimigoSelecionado.nome}!`))
        inimigoSelecionado.speed *= 0.5
        inimigoSelecionado.atk *= 0.8
        inimigoSelecionado.def *= 0.8
        this.basicoAtk(this.move3)

    }
    if (move3[3] === 4) {
        textoAtualizando((`${this.nome} se curo em 20 de HP`))
        this.hp += 20
        this.basicoAtk(this.move3)
    }
}

const persoLuffy = new Personagem(undefined, 'Luffy', 105, 6, 5.5, 16, ["Gomu Gomu no Gatling Gun", 3.5, 5], ["Gomu Gomu no Red Hawj", 4.5, 3], ["Gear 5", 5, 1, 2, "Bajran Gun"])
const persoZoro = new Personagem(undefined, 'Zoro', 95, 6, 6, 13, ["Oni Giri", 3, 5], ["Ichidai Sanzen Sekai", 5, 3], ["Ashura", 5, 1, 2, "Corte do The Big One Fodão"])
const persoCrocodile = new Personagem(undefined, 'Crocodile', 90, 7, 5.5, 18, ["Desert Spada", 3.5, 5], ["Sables", 5, 2], ["Ground Death", 4.5, 2, 3])
const persoSanji = new Personagem('aliado', 'Sanji', 105, 5.5, 7, 20, ["Parage Shoot", 3.5, 4], ["Diable Jambe", 4.5, 2], ["Ifrit Jambe", 4, 2, 4])
const persoKaido = new Personagem(undefined, 'Kaido', 120, 5, 7, 12, ["Boro Breath", 3.5, 5], ["Thunder Bagua", 5, 2], ["Dragon Form", 5, 1, 2, "Kaifu Tatsumaki"])
const persoDoflamingo = new Personagem(undefined, 'Doflamingo', 95, 7, 5, 18.5, ["Overheat", 3.5, 4], ["Parasite", 5, 2], ["Birdcage", 5, 1, 1])
const persoHancock = new Personagem(undefined, 'Boa Hancoock', 100, 6.5, 5, 16, ["Slave Arrow", 3, 5], ["perfume femur", 5, 2], ["Love kiss", 4, 2, 3])
const persoKatakuri = new Personagem(undefined, 'Katakuri', 110, 6, 6, 17, ["Kaku Mochi", 5, 5], ["Zan Giri Mochi", 6, 2], ["Despertar!", 5, 1, 2, "Zangiri Mochi"])
const persoKid = new Personagem(undefined, 'Kid', 90, 6.5, 5.5, 12, ["Punk Rotten", 3.5, 5], ["Punk Pistols", 4.5, 2], ["Punk Pistols", 4, 2, 3])
const persoSabo = new Personagem(undefined, 'Sabo', 100, 6.5, 6, 15, ["Ryusoken", 3, 4], ["Ryu no Kagizume", 4, 3], ["Twin's Hiken", 5.5, 2, 4])
const persoBarbaBranca = new Personagem(undefined, 'Barba Branca', 120, 6, 6, 12, ["Kabutowari", 3, 4], ["Gekishin", 4, 3], ["Shima Yurashi", 7, 1, 1])
const persoMarco = new Personagem(undefined, 'Marco', 90, 7, 5.5, 18, ["Hoo-In", 4, 3], ["Blue Bird", 3.5, 4], ["Nashi no Tsubute", 5, 5, 2, 4])
const personagensPáginaAntiga = JSON.parse(localStorage.getItem('personagens'))
let inimigoSelecionado
let todosOsPersonagens = []
let messageQueue = []
let messageProcessing = false
let personagensAliados = []
let personagensInimigos = []

function textoAtualizando(texto) {
    messageQueue.push(texto)
    if (!messageProcessing) {
        processarMensagem()
    }
}

const divText = document.querySelector('#textMoves')
divText.addEventListener('click', processarMensagem)

function processarMensagem() {
    if (messageQueue.length > 0) {
        divText.innerHTML = messageQueue.shift()
        messageProcessing = true
    } else {
        messageProcessing = false
    }
}

let etapaAtual = 'aliado'
let aliadoSelecionado
let inimigoSelecionadoTemp

todosOsPersonagens.push(persoLuffy, persoKaido, persoBarbaBranca, persoCrocodile, persoDoflamingo, persoHancock, persoSanji, persoKid, persoZoro, persoSabo, persoMarco, persoKatakuri)

personagensAliados[0] = todosOsPersonagens.find(p => p.nome === personagensPáginaAntiga[0])
personagensAliados[1] = todosOsPersonagens.find(p => p.nome === personagensPáginaAntiga[1])
personagensInimigos[0] = todosOsPersonagens.find(p => p.nome === personagensPáginaAntiga[2])
personagensInimigos[1] = todosOsPersonagens.find(p => p.nome === personagensPáginaAntiga[3])

function sortearNumero(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function personagensColocados() {
    personagensAliados.forEach(p => {
        p.time = 'aliado'
        p.elementoHTML.innerHTML = `${p.nome} ${p.hp}`
    })
    personagensInimigos.forEach(p => {
        p.time = 'inimigo'
        p.elementoHTML.innerHTML = `${p.nome} ${p.hp}`
    })
}

function selecionarAliado(event) {
    desativarDisplay()
    if (etapaAtual === 'inimigo') return
    const el = event.target
    if (el.id === 'aliado1') {
        aliadoSelecionado = personagensAliados[0]
        etapaAtual = 'inimigo'
        el.classList.add('aliadoSelecionado')
        movesetSetado()
    } else if (el.id === 'aliado2') {
        if (personagensAliados.length === 2) {
            aliadoSelecionado = personagensAliados[1]
        } else {
            aliadoSelecionado = personagensAliados[0]
        }
        etapaAtual = 'inimigo'
        el.classList.add('aliadoSelecionado')
        movesetSetado()
    }
}

function selecionarInimigo(event) {
    desativarDisplay()
    if (etapaAtual === 'aliado') return
    const el = event.target
    if (el.id === 'inimigo1') {
        inimigoSelecionado = personagensInimigos[0]
        etapaAtual = 'aliado'
        selecionarAtaque()
        el.classList.add('inimigoSelecionado')
    } else if (el.id === 'inimigo2') {
        if (personagensInimigos.length === 2) {
            inimigoSelecionado = personagensInimigos[1]
        } else {
            inimigoSelecionado = personagensInimigos[0]
        }
        etapaAtual = 'aliado'
        selecionarAtaque()
        el.classList.add('inimigoSelecionado')
    }
    inimigoSelecionadoTemp = inimigoSelecionado
}

function movesetSetado() {
    movesDisplay[0].innerHTML = `${aliadoSelecionado.move1.nome} <br>PP: ${aliadoSelecionado.move1.pp}`
    movesDisplay[1].innerHTML = `${aliadoSelecionado.move2.nome} <br>PP: ${aliadoSelecionado.move2.pp}`
    movesDisplay[2].innerHTML = `${aliadoSelecionado.move3.nome} <br>PP: ${aliadoSelecionado.move3.pp}`
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
let aliadoSorteado
let inimigoSorteado
let movesetDisplay = document.querySelector('#moveset')
let numeroRound = 1
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

function ataqueInimigo() {
    const moveSorteadoIndex = sortearNumero(0, 3)
    const moveSorteado = inimigoSorteado.arrayMoves[moveSorteadoIndex]
    moveSorteado()
}

function desativarDisplay() {
    movesDisplay.forEach(m => {
        if (m.innerHTML.includes('0')) {
            m.style.pointerEvents = 'none'
        } else {
            if (etapaAtual === 'inimigo') {
                m.style.pointerEvents = 'auto'
            } else {
                m.style.pointerEvents = 'none'
            }
        }
    })
}

personagensInimigos[0].elementoHTML = inimigo1Display
personagensInimigos[1].elementoHTML = inimigo2Display
personagensAliados[1].elementoHTML = aliado2Display
personagensAliados[0].elementoHTML = aliado1Display

function deletarPersonagem() {
    todosOsPersonagens.forEach(element => {
        if (element.hp <= 0 && element.estado === 'morto') {
            element.elementoHTML.remove()
            if (element.time === 'aliado') {
                personagensAliados = personagensAliados.filter(p => p !== element)
            } else {
                personagensInimigos = personagensInimigos.filter(p => p !== element)
            }
        }
    })
}

function resetarTudo() {
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
        textoAtualizando('Você perdeu!')
    } else if (personagensInimigos.length === 0) {
        textoAtualizando('Você ganhou!')
    } else {
        textoAtualizando(`Você está no round ${numeroRound}, GO!`)
    }
}

function verificarMorte() {
    todosOsPersonagens.forEach((personagem) => {
        if (personagem.hp <= 0 && personagem.estado !== 'morto') {
            personagem.estado = 'morto'
            personagem.hp = 0
            textoAtualizando(`${personagem.nome} morreu`)
        }
    })
    deletarPersonagem()
    personagensColocados()
}

function ataqueAliadoSelecionado() {
    if (moveSelecionadoID === 'move1') {
        return aliadoSelecionado.useMove1()
    } else if (moveSelecionadoID === 'move2') {
        return aliadoSelecionado.useMove2()
    } else {
        return aliadoSelecionado.useMove3()
    }
}

function ordemDeAtaque(move) {
    aliadoSorteado = personagensAliados[sortearNumero(0, personagensAliados.length)]
    inimigoSorteado = personagensInimigos[sortearNumero(0, personagensInimigos.length)]
    if (aliadoSelecionado.speed >= inimigoSorteado.speed) {
        ataqueAliadoSelecionado(move)
        inimigoSelecionado = aliadoSorteado
        if (inimigoSelecionado.estado === 'morto') {
            textoAtualizando(`(${inimigoSelecionado.nome} está morto, então não ataca!)`)
        }
        ataqueInimigo()
    } else {
        inimigoSelecionado = aliadoSorteado
        ataqueInimigo()
        inimigoSelecionado = inimigoSelecionadoTemp
        if (inimigoSelecionado.estado === 'morto') {
            textoAtualizando(`({${inimigoSelecionado.nome} está morto, então não ataca!})`)
        }
        ataqueAliadoSelecionado(move)
    }
    resetarTudo()
}

aliados.forEach(aliado => {
    aliado.addEventListener('click', selecionarAliado)
})

inimigos.forEach(inimigo => {
    inimigo.addEventListener('click', selecionarInimigo)
})

personagensColocados()