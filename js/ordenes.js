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
let otActFiltroInpt = document.getElementById("otActFiltroInpt")
otActFiltroInpt.addEventListener('keyup', otActiFiltro)
let otAsignFiltroInpt = document.getElementById("otAsignFiltroInpt")
otAsignFiltroInpt.addEventListener('keyup', otAsignFiltro)
let btnNvaOt = document.getElementById("btnNvaOt")
btnNvaOt.addEventListener('click', verFormNvaOT)
let btncerrarNvaOt = document.getElementById("cerrarNvaOt")
btncerrarNvaOt.addEventListener('click', verFormNvaOT)
let btnIngresarOt = document.getElementById("btnIngresarOt")
btnIngresarOt.addEventListener('click', ingresarNvaOt)


//ocultar seccion al iniciar
const ots = document.getElementById("Ordenes")
ots.style.display = "none"
const otsAsign = document.getElementById("OTasign")
otsAsign.style.display = "none"
const otsActiv = document.getElementById("OTactivas")
otsActiv.style.display = "none"


//funciones
function crearIDorden() {
    let id = `OT${ordenes.length}`
    return id
}
function verOrdenes() {//muestra toda la seccion de ordenes
    ots.style.display == "none" ? ots.style.display = "block" : ots.style.display = "none"
}
//asignar/crear OTs
function verOTSasign() {//muestra la seccion asignar y crear OT
    otsAsign.style.display == "none" ? otsAsign.style.display = "block" : otsAsign.style.display = "none"
    cargarTabOTasignar(ordenes)
    formNvaOTsels()
}
function cargarTabOTasignar(arrOTSasi) {//carga la tabla con las ordenes sin asignar

    tabOTasign.innerHTML = ``
    let OTsNoAsign = arrOTSasi.filter((orden) => orden.estado === "NO ASIGNADO")
    OTsNoAsign.forEach(orden => {
        let cli = clientes.find(cliente => cliente.idcli == orden.idcliente)
        let prod = productos.find(producto => producto.idpr == orden.idproducto)
        let pres = prod.presentacion.toLocaleLowerCase()
        tabOTasign.innerHTML += `<tr>
                            <td><div class="btnsOTtab">
                                    <button class="btnModOT" id='${orden.idorden}' title="Modificar Orden: ${orden.idorden}">📝</button>
                                    <button class="btnAsignLn" id='${orden.idorden}' title="Asignar Orden: ${orden.idorden}">📥</button>
                                    <select class="OTselAsignar" id='${orden.idorden}'>
                                        <option value="">Asignar a linea...</option>
                                        <option value=""></option>
                                    </select>
                              </div>
                            </td>
                            <td>${orden.idorden}</td>
                            <td title="${prod.idpr} | ${prod.descripcion}"><strong>${prod.nombre}</strong> - ${pres}</td>
                            <td>${cli.nombre}</td>
                            <td>${orden.unidadespedidas}</td>
                           </tr>`
    })
    let btnSelAsignLn = document.querySelectorAll('.btnAsignLn')
    btnSelAsignLn.forEach(btn => {
        btn.addEventListener('click', () => {
            const btnysel = document.querySelectorAll(`#${btn.id}`)
            btnysel[2].style.display === "block" ? btnysel[2].style.display = "none" : btnysel[2].style.display = "block"

        })
    })
    let selAsignLn = document.querySelectorAll('.OTselAsignar')
    selAsignLn.forEach(sel => {
        sel.innerHTML = '<option value="">🏭</option>'

        lineas.forEach(linea => {
            sel.innerHTML += `<option value="${linea.idlinea}" title="${linea.idlinea} - ${linea.descripcion}">${linea.nombre}</option>`
        });
        sel.addEventListener('mouseup', () => {
            AsignLn(sel.id, sel.value)
        })

    })
}
function AsignLn(ot, ln) {//asigna la orden a la linea seleccionada
    const orden = ordenes.find(orden => orden.idorden === ot)
    const linea = lineas.find(linea => linea.idlinea === ln)
    const prod = productos.find(prod => prod.idpr === orden.idproducto)
    Swal.fire({
        showCancelButton: true,
        title: `${orden.idorden} - ${prod.nombre} - ${prod.presentacion} `,
        text: `¿Asignar a la linea ${linea.nombre} ?`,
        icon: 'warning',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {

            const indexorden = ordenes.findIndex((ord) => ord.idorden === orden.idorden)
            ordenes[indexorden].linea = ln
            ordenes[indexorden].estado = "ESPERA"
            const indexlinea = lineas.findIndex((ln) => ln.idlinea === linea.idlinea)
            lineas[indexlinea].ordenes.push(orden.idorden)
            lineas[indexlinea].ordenactiva = lineas[indexlinea].ordenes[0]
            cargarTabOTactivas(ordenes)
            cargarTabOTasignar(ordenes)
            OrdenesLSset()
            LineasLSset()
            Swal.fire({
                title: `${orden.idorden} - ${prod.nombre} - ${prod.presentacion} en linea ${linea.nombre}`,
                text: `Orden asignada correctamente ✅`,
                icon: 'success',
                timer: 2500,
                showConfirmButton: false,
            })
        }
    })
}
function otAsignFiltro() {//filtro de Asignar Ordenes

    const FiltrCat = document.getElementById("OTCYAfiltroCat").value
    const FiltrInput = otAsignFiltroInpt.value.toLocaleUpperCase()
    let buscOTSasign = []

    switch (FiltrCat) {
        case "ID":
            buscOTSasign = ordenes.filter((orden) => orden.idorden.includes(FiltrInput))
            break;
        case "Producto":
            let prods = productos.filter((producto) => producto.nombre.includes(FiltrInput))
            prods.forEach(prod => {
                const busqueda = ordenes.filter(orden => orden.idproducto === prod.idpr)
                busqueda.forEach(element => {
                    buscOTSasign.push(element)
                });
            });
            break;
        case "Cliente":
            let clis = clientes.filter((cliente) => cliente.nombre.includes(FiltrInput))
            clis.forEach(cli => {
                const busqueda = ordenes.filter(orden => orden.idcliente === cli.idcli)
                busqueda.forEach(element => {
                    buscOTSasign.push(element)
                });
            });
            break;
        default: buscOTSasign = ordenes;
    }
    if (buscOTSasign.length > 0) {
        cargarTabOTasignar(buscOTSasign)
    } else {
        cargarTabOTasignar(ordenes)
    }
}
function verFormNvaOT() {//carga y muestra el formulario Nueva Orden
    const formNvaOt = document.getElementById("formNvaOt")
    document.getElementById("nvaOtId").value = crearIDorden()
    formNvaOt.style.display == "block" ? formNvaOt.style.display = "none" : formNvaOt.style.display = "block"
}
function formNvaOTsels() {//llena los select del formulario Nueva Orden
    const selprod = document.getElementById("nvaOtProd")
    selprod.innerHTML = '<option value="">💊 Producto</option>'
    productos.forEach(prod => {
        selprod.innerHTML += `<option value="${prod.idpr}">${prod.nombre} - ${prod.presentacion}</option>`
    });
    const selcli = document.getElementById("nvaOtCli")
    selcli.innerHTML = '<option value="">🤑 Cliente</option>'
    clientes.forEach(cli => {
        selcli.innerHTML += `<option value="${cli.idcli}">${cli.nombre}</option>`
    });

}
function ingresarNvaOt() {

}

//seccion OrdenesActivas
function verOTSactiv() {//ver seccion Ordenes Activas
    otsActiv.style.display == "none" ? otsActiv.style.display = "block" : otsActiv.style.display = "none"
    cargarTabOTactivas(ordenes)
}
function cargarTabOTactivas(arrOTSAct) {//escribe la tabla de ordenes Activas
    tabOTact.innerHTML = ``
    let OTsActi = arrOTSAct.filter((orden) => orden.estado != "NO ASIGNADO")
    OTsActi.forEach(orden => {
        let ln = lineas.find(linea => linea.idlinea === orden.linea)
        let prod = productos.find(producto => producto.idpr === orden.idproducto)
        let pres = prod.presentacion.toLocaleLowerCase()
        tabOTact.innerHTML += `<tr>
                                <td><button class="btnModOT" id='${orden.idorden}' title="Ver Orden: ${orden.idorden}">ℹ️</button>
                                </td>
                                <td>${orden.idorden}</td>
                                <td title="${ln.idlinea} - ${ln.descripcion}">${ln.nombre}</td>
                                <td title="${prod.idpr} | ${prod.descripcion}"><strong>${prod.nombre}</strong> - ${pres}</td>
                                <td>${EmojiEstado(orden.estado)} ${orden.estado}</td>
                                <td><progress title="${parseInt(orden.unidadesproducidas / orden.unidadespedidas * 100)}% " class="progress" value="${parseInt((orden.unidadesproducidas / orden.unidadespedidas * 100))}" max="100"></progress></td>
                                <td>${orden.unidadesproducidas}/${orden.unidadespedidas} </td>
                           </tr>`
    })
}
function otActiFiltro() {//filtro de Ordenes Activas
    const FiltroCat = document.getElementById("OTactfiltroCat").value
    const FiltroInput = otActFiltroInpt.value.toLocaleUpperCase()
    let buscOTSact = []
    switch (FiltroCat) {
        case "ID":
            buscOTSact = ordenes.filter((orden) => orden.idorden.includes(FiltroInput))
            break;
        case "Producto":
            let prods = productos.filter((producto) => producto.nombre.includes(FiltroInput))
            prods.forEach(prod => {
                const busqueda = ordenes.filter(orden => orden.idproducto === prod.idpr)
                busqueda.forEach(element => {
                    buscOTSact.push(element)
                });
            });
            break;
        case "Linea":
            let lns = lineas.filter((ln) => ln.nombre.includes(FiltroInput))
            lns.forEach(ln => {
                const busqueda = ordenes.filter(orden => orden.linea === ln.idlinea)
                busqueda.forEach(element => {
                    buscOTSact.push(element)
                });
            });
            break;
        case "Estado":
            buscOTSact = ordenes.filter((orden) => orden.estado.includes(FiltroInput))
            break;
        default: buscOTSact = ordenes;
    }
    if (buscOTSact.length > 0) {
        cargarTabOTactivas(buscOTSact)
    } else {
        cargarTabOTactivas(ordenes)
    }
}

//Carga de datos
function OrdenesLSget() {//Busca ORDENES en localStorage, si no encuentra los agrega haciendo FETCH a KXbd.JSON
    const otsJson = (JSON.parse(localStorage.getItem('KXordenes')) || null)
    if (otsJson) {
        otsJson.forEach(orden => {
            ordenes.push(orden)
        })
        OrdenesLSset()
        cargarTabOTactivas(ordenes)
        cargarTabOTasignar(ordenes)
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
            cargarTabOTactivas(ordenes)
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
        this.logs = []
    }
}

//inicio
OrdenesLSget()