//ORDENES DE TRABAJO
//array Ordenes
const ordenes = []
const PRIORIDAD = ["BAJA", "MEDIA", "ALTA", "URGENTE"]
const ESTADO = ["NO ASIGNADO", "ESPERA", "PREPARACION", "PRODUCIENDO", "DETENIDO", "FINALIZANDO", "TERMINADO", "DESHABILITADO"]

//Tablas Ordenes


let tabOTasign = document.getElementById("tabOTasign")
let tabOTact = document.getElementById("tabOTact")



//listeners
let btnOrdenes = document.getElementById("verOrdenes")
btnOrdenes.addEventListener('click', verOrdenes)
let btnOTSasign = document.getElementById("OTcyaBtn")
btnOTSasign.addEventListener('click', verOTSasign)
let btnOTSactiv = document.getElementById("OTactBtn")
btnOTSactiv.addEventListener('click', verOTSactiv)

//ocultar seccion al iniciar
const ots = document.getElementById("Ordenes")
ots.style.display = "none"
const otsAsign = document.getElementById("OTasign")
otsAsign.style.display = "none"
const otsActiv = document.getElementById("OTactivas")
otsActiv.style.display = "none"


//funciones Formularios
function crearIDorden() {
    let id = `OT${ordenes.length}`
    return id
}
function verOrdenes() {
    ots.style.display == "none" ? ots.style.display = "block" : ots.style.display = "none"
}
function verOTSasign() {
    otsAsign.style.display == "none" ? otsAsign.style.display = "block" : otsAsign.style.display = "none"
    cargarTabOTasignar()
}
function verOTSactiv() {
    otsActiv.style.display == "none" ? otsActiv.style.display = "block" : otsActiv.style.display = "none"
    cargarTabOTactivas()
}
function selAsignLn(idSel) {

    let selectLn = document.getElementById(`sel${idSel}`)
    selectLn.style.display == "block" ? selectLn.style.display = "none" : selectLn.style.display = "block"

    selectLn.innerHTML = '<option value="">Asignar a linea...</option>'
    lineas.forEach(linea => {
        selectLn.innerHTML += `<option value="${linea.idlinea}">${linea.nombre}</option>`
    });
}


function cargarTabOTasignar() {

    tabOTasign.innerHTML = ``
    let OTsNoAsign = ordenes.filter((orden) => orden.estado === "NO ASIGNADO")
    OTsNoAsign.forEach(orden => {
        let cli = clientes.find(cliente => cliente.idcli == orden.idcliente)
        let prod = productos.find(producto => producto.idpr == orden.idproducto)
        let pres = prod.presentacion.toLocaleLowerCase()
        tabOTasign.innerHTML += `<tr>
                                <td><div class="btnsOTtab"><button class="btnModOT" id='${orden.idorden}' title="Modificar Orden: ${orden.idorden}">📝</button>
                                <button class="btnAsignLn" id='${orden.idorden}' title="Asignar Orden: ${orden.idorden}">📥</button>
                                <select class="OTselAsignar" id='sel${orden.idorden}'>
                                <option value="">Asignar a linea...</option>
                                <option value=""></option>
                              </select>
                              </div>
                                </td>
                                <td>${orden.idorden}</td>
                                <td><strong>${prod.nombre}</strong> - ${pres}</td>
                                <td>${cli.nombre}</td>
                                <td>${orden.unidadespedidas}</td>
                           </tr>`
    })
    let btnSelAsignLn = document.querySelectorAll('.btnAsignLn')
    btnSelAsignLn.forEach(btn => {
        btn.addEventListener('click', () => {
            selAsignLn(btn.id)
        })
    })
}
function cargarTabOTactivas() {

    tabOTact.innerHTML = ``
    let OTsActi = ordenes.filter((orden) => orden.estado != "NO ASIGNADO")
    OTsActi.forEach(orden => {
        let ln = lineas.find(linea => linea.idlinea === orden.linea)
        let prod = productos.find(producto => producto.idpr === orden.idproducto)
        let pres = prod.presentacion.toLocaleLowerCase()
        tabOTact.innerHTML += `<tr>
                                <td><button class="btnModOT" id='${orden.idorden}' title="Ver Orden: ${orden.idorden}">ℹ️</button>
                                </td>
                                <td>${orden.idorden}</td>
                                <td>${ln.nombre}</td>
                                <td><strong>${prod.nombre}</strong> - ${pres}</td>
                                <td>${EmojiEstado(orden.estado)} ${orden.estado}</td>
                                <td><progress title="${parseInt(orden.unidadesproducidas / orden.unidadespedidas * 100)}% " class="progress" value="${parseInt((orden.unidadesproducidas / orden.unidadespedidas * 100))}" max="100"></progress></td>
                                <td>${orden.unidadesproducidas}/${orden.unidadespedidas} </td>
                           </tr>`
    })
}


//Carga de datos
function OrdenesLSget() {//Busca ORDENES en localStorage, si no encuentra los agrega haciendo FETCH a KXbd.JSON
    const otsJson = (JSON.parse(localStorage.getItem('KXordenes')) || null)
    if (otsJson) {
        otsJson.forEach(orden => {
            ordenes.push(orden)
        })
        OrdenesLSset()
        cargarTabOTactivas()
        cargarTabOTasignar()
    } else {
        fetchOrdenes()

    }
}
function OrdenesLSset() {//Guarda ORDENES en localStorage
    const otsJson = JSON.stringify(ordenes)
    localStorage.setItem('KXordenes', otsJson)
}
function fetchOrdenes() {
    fetch('js/KXbd.JSON')
        .then((resp) => resp.json())
        .then((data) => {
            data.ordenes.forEach(orden => {
                ordenes.push(orden)
            });
            OrdenesLSset()
            cargarTabOTactivas()
            cargarTabOTasignar()
        })
}
//clase
class orden {
    constructor(idorden, idcliente, idproducto, unidades) {
        this.idorden = idorden
        this.idcliente = idcliente
        this.idproducto = idproducto
        this.linea = null
        this.unidadespedidas = unidades
        this.unidadesproducidas = 0
        this.estado = "NO ASIGNADO"
    }
}

//inicio
OrdenesLSget()