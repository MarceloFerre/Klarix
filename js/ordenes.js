//ORDENES

//array Ordenes

const ordenes = []

const PRIORIDAD = ["BAJA", "MEDIA", "ALTA", "URGENTE"]
const ESTADO = ["NO ASIGNADO", "ESPERA", "PREPARACION", "PRODUCIENDO", "DETENIDO", "FINALIZANDO", "TERMINADO", "DESHABILITADO"]

//Tablas Ordenes
const ots = document.getElementById("Ordenes")
const tabot = document.getElementById("tabot")
ots.style.display = "none"

//listeners
let btnOrdenes = document.getElementById("verOrdenes")
btnOrdenes.addEventListener('click', verOrdenes)

//ocultar seccion al iniciar

//funciones Formularios
function crearIDorden() {
    let id = `OT${ordenes.length}`
    return id
}
function verOrdenes() {
    ots.style.display == "none" ? ots.style.display = "block" : ots.style.display = "none"
}
function cargarTablaOrdenes(arrOts) {
    tabot.innerHTML = ``
    arrOts.forEach(orden => {
        let cli = clientes.find(cliente => cliente.idcli == orden.idcliente)
        let prod = productos.find(producto => producto.idpr == orden.idproducto)
        let pres = prod.presentacion.toLocaleLowerCase()
        tabot.innerHTML += `<tr>
                                <td><a >📝</a> </td>
                                <td>${orden.idorden}</td>
                                <td><strong>${prod.nombre}</strong> - ${pres}</td>
                                <td>${cli.nombre}</td>
                                <td>${orden.unidadespedidas}</td>
                           </tr>`
    })
}


//Carga de datos
function OrdenesLSget() {//Busca ORDENES en localStorage, si no encuentra los agrega haciendo FETCH a KXbd.JSON
    const otsJson = (JSON.parse(localStorage.getItem('KXordenes')) || [])
    if (otsJson.length == 0) {
        fetchOrdenes()
        OrdenesLSset()
    } else {
        otsJson.forEach(orden => {
            ordenes.push(orden)
        })
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
        })
}
//clase
class orden {
    constructor(idorden, idcliente, idproducto, unidades) {
        this.idorden = idorden
        this.idcliente = idcliente
        this.idproducto = idproducto
        this.unidadespedidas = unidades
        this.unidadesproducidas = 0
        this.progreso = this.unidadespedidas/this.unidadesproducidas*100
        this.estado = "NO ASIGNADO"
    }
}

//inicio
OrdenesLSget()