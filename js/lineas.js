//LINEAS DE PRODUCCION
//array LINEAS
let lineas = []
//Tablas LINEAS

//Listeners
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
function cargarBtnsLineas(arrLns) {//carga botones con los nombres de las lineas
    botoneslns.innerHTML = ``
    arrLns.forEach(linea => {
        botoneslns.innerHTML += `<button class="btnLinea" id="${linea.idlinea}" title="🔍 ver linea: ${linea.idlinea} - ${linea.nombre} | ${linea.descripcion}">🏭 ${linea.nombre}</button>`
    })
    botoneslns.innerHTML += `<button id="btnNvaLn" title="➕🏭Crear Nueva Linea de producción.">➕🏭</button>`
    let btnslns = document.querySelectorAll('.btnLinea')
    btnslns.forEach(btn => {
        btn.addEventListener('click', () => {
            cargarLinea(btn.id)
        })
    })
}
function cargarLinea(IDlinea) {//carga informacion de la linea
    const ln = lineas.find(ln => ln.idlinea === IDlinea)

    document.getElementById("btnLinea").innerHTML = `<h3>🏭 ${ln.nombre}</h3><b>${ln.descripcion}</b>`
    document.getElementById("btnLinea").title = `ID: ${ln.idlinea} `
    document.getElementById("linea").style.display = "block"

    //dibujar card
    if (ln.ordenes.length === 0) {
        const ot = ordenes.find(ot => ot.idorden === ln.ordenactiva)
        const prod = productos.find(prd => prd.idprod === ot.idproducto)
        
        document.getElementById("lnOTid").innerHTML = `${ot.idorden}`
        document.getElementById("lnOTprod").innerHTML = `${prod.nombre}`
        document.getElementById("lnOTpresen").innerHTML = `${prod.presentacion} - ${prod.descripcion}`
        document.getElementById("lnOTico").innerHTML = `${EmojiEstado(ot.estado)}`
        document.getElementById("lnOTestado").innerHTML = `${ot.estado}`
        document.getElementById("lnOTunds").innerHTML = `${ot.unidadesproducidas}/${ot.unidadespedidas} | ${parseInt((ot.unidadesproducidas / ot.unidadespedidas) * 100)}%`


    }

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
        this.logs = []
    }
}

//inicio
LineasLSget()