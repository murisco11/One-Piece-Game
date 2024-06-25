characterSelect()
let i = 0
let displays
const botãoTransição = document.querySelector('#botao-transição')
botãoTransição.addEventListener('click', () => 
    transição() ) 

const displayP1 = document.querySelector('#personagem1')
const displayP2 = document.querySelector('#personagem2')
const displayP3 = document.querySelector('#personagem3')
const displayP4 = document.querySelector('#personagem4')
displayP1.style.borderColor = 'red'

function aparecerTela (personagem, i) {
    const displays = [
        displayP1,
        displayP2,
        displayP3,
        displayP4
    ]
    for (let display of displays) {
        display.style.borderColor = 'black'
    }
    
    displays[i].innerHTML = personagem
    displays[i].style.borderColor = 'red'
}

function characterSelect () {
    const personagemPe = document.querySelector('#personagem-pe')
    document.addEventListener('click', event => {
        const el = event.target
        if (el.classList.contains('personagem')) {
            personagemPe.innerHTML = el.innerHTML
            aparecerTela(el.innerHTML, i)
            if (i === 3) {
                i = 0
            } else {
                i++
            }
        }
    })
}

function transição () {
    alert ('Ok')
    const listaPersonagens = [
        displayP1.innerHTML, 
        displayP2.innerHTML, 
        displayP3.innerHTML, 
        displayP4.innerHTML
    ]
    localStorage.setItem('personagens', listaPersonagens)
    window.location.href = "game.html"
}