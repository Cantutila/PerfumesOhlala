const vector = ['url(img/01.jpg)', 'url(img/01.jpg)', 'url(img/02.jpg)', 'url(img/02.jpg)',
    'url(img/03.jpg)', 'url(img/03.jpg)', 'url(img/04.jpg)', 'url(img/04.jpg)', 'url(img/05.jpg)', 'url(img/05.jpg)',
    'url(img/06.jpg)', 'url(img/06.jpg)', 'url(img/07.jpg)', 'url(img/07.jpg)', 'url(img/08.png)', 'url(img/08.png)',
    'url(img/09.jpg)', 'url(img/09.jpg)', 'url(img/10.jpg)', 'url(img/10.jpg)', 'url(img/11.jpg)', 'url(img/11.jpg)',
    'url(img/12.jpg)', 'url(img/12.jpg)'
];

const cartas_pares = [];
const cartas_abiertas = [];


class Juego {
    constructor() {}

    newBoard() {
        let out = "";
        mezclar(vector);
        for (let i = 0; i < vector.length; i++) out += `<div id=caja_${i}></div>`;
        document.getElementById('memory_board').innerHTML = out;
        for (let i = 0; i < vector.length; i++) document.getElementById(`caja_${i}`).addEventListener('click', this.getClick);
    }

    getClick() {
        let i = parseInt(this.getAttribute('id').substring(5)); // index para buscar el imagen en array
                        // this la carta que tocamos
        if (cartas_pares.length < 4 && !cartas_abiertas.includes(this.id)) { //vertif si id de la carta ya esta abierta
            document.getElementById(`caja_${i}`).style.background = vector[i];
            if (cartas_pares.length === 0) guardar(this); // this es la carta que tocamos 
            else if (cartas_pares.length === 2 && cartas_pares[1] !== this.id) {
                guardar(this);
                if (cartas_pares[0] === cartas_pares[2]) {
                    cartas_abiertas.push(cartas_pares[1], cartas_pares[3]); // guardamos id de todas las cartas abiertas iguales
                    limpiar();
                    if (cartas_abiertas.length === 24) {
                        document.getElementById("fin").innerHTML = "¡¡Tardaste demasiado, te falta timming!! Igual te regalo un &#8383itcoin!!";
                        for (let i = 0; i < cartas_abiertas.length; i++)
                            document.getElementById("memory_board").removeChild(document.getElementById(`caja_${i}`)); 
                        document.getElementById("memory_board").style.height = "515px";
                        document.getElementById("memory_board").style.width = "965px";
                        document.getElementById("memory_board").style.background = "url('img/fin.jpg')";
                        document.getElementById("autor").innerHTML = "Desarrollador: Cantutila Ariel"
                        //fin juego
                    }
                } else setTimeout(volver, 700);
            }
        }
    }
}

// funcion que tira aleratoriamente los valores
const mezclar = (array) => {
    const tmp = () => Math.random() - 0.5;
    return array.sort(tmp);
}

const volver = () => {
    document.getElementById(cartas_pares[1]).style.background = "url('img/donde.jpg')";
    document.getElementById(cartas_pares[3]).style.background = "url('img/donde.jpg')";
    limpiar();
}

const guardar = (carta) => {
    cartas_pares.push(carta.style.background, carta.id);
    /* guardamos imagen para poder comparar si son iguales,
       y el id para dar vuelta si son diferentes */
}

const limpiar = () => {
    cartas_pares.length = 0;
}

juego = new Juego();
juego.newBoard();