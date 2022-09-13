
//array LINEAS
const lineas = []
//Tablas LINEAS

//Listeners
const tablns = document.getElementById("tablns")
const btnlns = document.getElementById("verLineas")
btnlns.addEventListener('click', verLineas)
const botoneslns = document.getElementById("btnsLineas")


//Ocultar formularios al iniciar
const lns = document.getElementById("Lineas")
lns.style.display = "none"


//Funciones
function crearIDlinea() {
    let id = `LN${lineas.length}`
    return id
}
function verLineas() {
    lns.style.display == "none" ? lns.style.display = "block" : lns.style.display = "none"
    cargarBtnsLineas(lineas)
}
function cargarBtnsLineas(arrLns) {

    botoneslns.innerHTML = ``
    arrLns.forEach(linea => {
        botoneslns.innerHTML += `<button class="btnLinea">🏭 ${linea.nombre}</button>`
    })
    botoneslns.innerHTML += `<button id="btnNvaLn">➕</button>`
}

//Carga de datos
function LineasLSget() {//Busca LINEAS DE PROD en localStorage, si no encuentra los agrega haciendo FETCH a KXbd.JSON
    const lnsJson = (JSON.parse(localStorage.getItem('KXlineas')) || null)
    if (lnsJson) {
        lnsJson.forEach(linea => {
            lineas.push(linea)
        })
        LineasLSset()
        cargarBtnsLineas()
    } else {
        fetchLineas()

    }
}
function LineasLSset() {//Guarda LINEAS DE PROD en localStorage
    const lnsJson = JSON.stringify(lineas)
    localStorage.setItem('KXlineas', lnsJson)
}
function fetchLineas() {
    fetch('js/KXbd.JSON')
        .then((resp) => resp.json())
        .then((data) => {
            data.lineas.forEach(linea => {
                lineas.push(linea)
            });
            LineasLSset()
            cargarBtnsLineas()
        })
}
//clase
class linea {
    constructor(id, nombre, descripcion) {
        this.idlinea = id
        this.nombre = nombre
        this.descripcion = descripcion
        this.operarios = []
        this.ordenes = []
        this.ordenactiva = (this.ordenes[0] || "Sin ordenes asignadas")
    }
}

//inicio
LineasLSget()