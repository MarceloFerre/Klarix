//ORDENES DE TRABAJO
//array Ordenes
const ordenes = []
const PRIORIDAD = ["BAJA", "MEDIA", "ALTA", "URGENTE"]
const ESTADO = ["NO ASIGNADO", "ESPERA", "PREPARACION", "PRODUCIENDO", "DETENIDO", "FINALIZANDO", "TERMINADO", "DESHABILITADO"]

//Tablas Ordenes


let tabOTasign = document.getElementById("tabOTasign")
let tabOTact = document.getElementById("tabOTact")



//listeners
//boton principal Ordenes
let btnOrdenes = document.getElementById("verOrdenes")
btnOrdenes.addEventListener('click', verOrdenes)
//boton Asignar y Crear
let btnOTSasign = document.getElementById("OTcyaBtn")
btnOTSasign.addEventListener('click', verOTSasign)
//boton Ordenes Activas
let btnOTSactiv = document.getElementById("OTactBtn")
btnOTSactiv.addEventListener('click', verOTSactiv)
//input filtro Ordenes Activas
let otActFiltroInpt = document.getElementById("otActFiltroInpt")
otActFiltroInpt.addEventListener('keyup', otActiFiltro)
///input filtro Ordenes sin asignar
let otAsignFiltroInpt = document.getElementById("otAsignFiltroInpt")
otAsignFiltroInpt.addEventListener('keyup', otAsignFiltro)
//boton mostrar formulario Nueva Orden
let btnNvaOt = document.getElementById("btnNvaOt")
btnNvaOt.addEventListener('click', verFormNvaOT)
//boton cerrar formulario Nueva Orden
let btncerrarNvaOt = document.getElementById("cerrarNvaOt")
btncerrarNvaOt.addEventListener('click', verFormNvaOT)
//boton Ingresar Nueva Orden
let btnIngresarOt = document.getElementById("btnIngresarOt")
btnIngresarOt.addEventListener('click', ingresarNvaOt)
//boton cerrar formulario Modificar Orden
let btncerrarModOt = document.getElementById("cerrarModOt")
btncerrarModOt.addEventListener('click', cerrarFormModOt)
//boton Guardar Orden Modificada
let btnModificarOt = document.getElementById("btnModificarOt")
btnModificarOt.addEventListener('click', modificarOT)

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
//crear- modificar - asignar Ordenes de Trabajos
function verOTSasign() {//muestra la seccion asignar y crear OT
    otsAsign.style.display == "none" ? otsAsign.style.display = "block" : otsAsign.style.display = "none"
    cargarTabOTasignar(ordenes)
    formsOTsels("nvaOtProd", "nvaOtCli")
}
function cargarTabOTasignar(arrOTSasi) {//carga la tabla con las ordenes sin asignar
    tabOTasign.innerHTML = ``
    let OTsNoAsign = arrOTSasi.filter((orden) => orden.estado === "NO ASIGNADO")
    OTsNoAsign.forEach(orden => {
        let cli = clientes.find(cliente => cliente.idcli == orden.idcliente)
        let prod = productos.find(producto => producto.idpr == orden.idproducto)
        let pres = prod.presentacion.toLocaleLowerCase()
        tabOTasign.innerHTML += `<tr>
                            <td class="${orden.idorden}"><div class="btnsOTtab">
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
                            <td>${orden.unidadespedidas}</td>
                            <td>${cli.nombre}</td>

                           </tr>`
    })
    //asigna event listener a los botones Modificar Orden, muestra el formulario Modificar Orden
    let btnModOt = document.querySelectorAll('.btnModOT')
    btnModOt.forEach(btn => {
        btn.addEventListener('click', () => {
            verFormModOt(btn.id)
        })
    })


    //asigna event listener a los botones Asignar, muestra el select con las lineas
    let btnSelAsignLn = document.querySelectorAll('.btnAsignLn')
    btnSelAsignLn.forEach(btn => {
        btn.addEventListener('click', () => {
            const btnysel = document.querySelectorAll(`#${btn.id}`)
            btnysel[2].style.display === "inline" ? btnysel[2].style.display = "none" : btnysel[2].style.display = "inline"

        })
    })
    //rellena los select y permite asignar la orden a la sala seleccionada
    let selAsignLn = document.querySelectorAll('.OTselAsignar')
    selAsignLn.forEach(sel => {
        sel.innerHTML = '<option value="">🏭 Asignar a linea...</option>'
        lineas.forEach(linea => {
            sel.innerHTML += `<option value="${linea.idlinea}" title="${linea.idlinea} - ${linea.descripcion}">${linea.nombre}</option>`
        });
        sel.addEventListener('mouseup', () => {
            AsignLn(sel.id, sel.value)
        })

    })
}
//crear
function verFormNvaOT() {//carga y muestra el formulario Nueva Orden
    const formNvaOt = document.getElementById("formNvaOt")
    document.getElementById("nvaOtId").value = crearIDorden()
    formNvaOt.style.display == "block" ? formNvaOt.style.display = "none" : formNvaOt.style.display = "block"

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
function ingresarNvaOt() {//verifica formulario e ingresa Nueva Orden sin asignar
    const otid = crearIDorden()
    const otcli = document.getElementById("nvaOtCli").value
    const otprod = document.getElementById("nvaOtProd").value
    const otunds = parseInt(document.getElementById("nvaOtUnds").value)
    if (otcli == "" || otprod == "" || isNaN(otunds) || otunds < 100) {
        Swal.fire({
            title: 'Orden incorrecta',
            text: 'Por favor, llene bien los campos.',
            icon: 'error',
            confirmButtonText: 'OK',
        })
    } else {
        const nvaOT = new orden(crearIDorden(), otcli, otprod, otunds)
        ordenes.push(nvaOT)
        document.getElementById("nvaOtId").value = crearIDorden()
        document.getElementById("nvaOtCli").value = ""
        document.getElementById("nvaOtProd").value = ""
        document.getElementById("nvaOtUnds").value = ""
        cargarTabOTasignar(ordenes)
        OrdenesLSset()
        Swal.fire({
            title: `Orden de Trabajo ${nvaOT.idorden} ingresada correctamente`,
            text: '✳️ No olvide asignar las ordenes a una linea 📥',
            icon: 'success',
            timer: 2500,
            showConfirmButton: false,
        })
    }


}
//modificar
function cerrarFormModOt() {//cierra formulario Modificar Orden
    document.getElementById("formModOt").style.display = "none"
}
function verFormModOt(idOrden) {//carga y muestra formulario Modificar Orden
    formsOTsels("modOtProd", "modOtCli")
    const ot = ordenes.find(ot => ot.idorden === idOrden)
    document.getElementById("modOtId").value = ot.idorden
    document.getElementById("modOtCli").value = ot.idcliente
    document.getElementById("modOtProd").value = ot.idproducto
    document.getElementById("modOtUnds").value = ot.unidadespedidas
    document.getElementById("formModOt").style.display = "block"
}
function modificarOT() {
    const otmod = new orden(document.getElementById("modOtId").value, document.getElementById("modOtCli").value, document.getElementById("modOtProd").value, parseInt(document.getElementById("modOtUnds").value))
    if (otmod.idcliente === "" || otmod.idproducto === "" || isNaN(otmod.unidadespedidas) || otmod.unidadespedidas < 100) {
        verFormModOt(otmod.idorden)
        Swal.fire({
            title: 'Modificacion de Orden incorrecta',
            text: 'Por favor, llene bien los campos.',
            icon: 'error',
            confirmButtonText: 'OK',
        })

    } else {
        Swal.fire({
            showCancelButton: true,
            text: `¿Desea modificar la Orden ${otmod.idorden}?`,
            icon: 'warning',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {

                const index = ordenes.findIndex(ord => ord.idorden === otmod.idorden)
                ordenes[index] = otmod
                cerrarFormModOt()
                cargarTabOTasignar(ordenes)
                OrdenesLSset()

            }
        })
    }



}

function formsOTsels(selOTprod, selOTcli) {//llena los select del formulario Nueva Orden y Modificar Orden
    const selprod = document.getElementById(selOTprod)
    selprod.innerHTML = '<option value="">💊 Producto</option>'
    productos.forEach(prod => {
        selprod.innerHTML += `<option value="${prod.idpr}">${prod.nombre} - ${prod.presentacion}</option>`
    });
    const selcli = document.getElementById(selOTcli)
    selcli.innerHTML = '<option value="">🤑 Cliente</option>'
    clientes.forEach(cli => {
        selcli.innerHTML += `<option value="${cli.idcli}">${cli.nombre}</option>`
    });

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

//seccion OrdenesActivas
function verOTSactiv() {//ver seccion Ordenes Activas
    otsActiv.style.display == "none" ? otsActiv.style.display = "block" : otsActiv.style.display = "none"
    cargarTabOTactivas(ordenes)
}
function cargarTabOTactivas(arrOTSAct) {//escribe la tabla de ordenes Activas
    tabOTact.innerHTML = ``
    let OTsActi = arrOTSAct.filter((orden) => (orden.estado != "NO ASIGNADO")&&(orden.estado != "TERMINADO") )
    OTsActi.forEach(orden => {
        let ln = lineas.find(linea => linea.idlinea === orden.linea)
        let prod = productos.find(producto => producto.idpr === orden.idproducto)
        let pres = prod.presentacion.toLocaleLowerCase()
        let btnQuitarOT = ""
        orden.estado === "ESPERA" ? btnQuitarOT = `<button class="btnQuitarOT" id='${orden.idorden}' title="Quitar Orden ${orden.idorden} de la linea ${ln.nombre}">🗳️</button>` : btnQuitarOT = "";
        tabOTact.innerHTML += `<tr>
                                <td><button class="btnOTsl" id='${ln.idlinea}' title="Ver Orden ${orden.idorden} en linea ${ln.nombre}" onclick="cargarLinea(${ln.idlinea})">ℹ️</button>
                                ${btnQuitarOT}
                                </td>
                                <td>${orden.idorden}</td>
                                <td title="${ln.idlinea} - ${ln.descripcion}">${ln.nombre}</td>
                                <td title="${prod.idpr} | ${prod.descripcion}"><strong>${prod.nombre}</strong> - ${pres}</td>
                                <td>${EmojiEstado(orden.estado)} ${orden.estado}</td>
                                <td><progress title="${parseInt(orden.unidadesproducidas / orden.unidadespedidas * 100)}% " class="progress" value="${parseInt((orden.unidadesproducidas / orden.unidadespedidas * 100))}" max="100"></progress></td>
                                <td>${orden.unidadesproducidas}/${orden.unidadespedidas} </td>
                           </tr>`
    })
    let btnsOtSl = document.querySelectorAll('.btnOTsl')
    btnsOtSl.forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('linea').style.display = "block"
            document.getElementById('Lineas').style.display = "block"
            document.getElementById('Ordenes').style.display = "none"
            cargarBtnsLineas(lineas)
            cargarLinea(btn.id)
        })
    })
    let btnsQuitarOt = document.querySelectorAll('.btnQuitarOT')
    btnsQuitarOt.forEach(btn => {
        btn.addEventListener('click', () => {
            quitarOTdeLinea(btn.id)
        })
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
function quitarOTdeLinea(idot) {
    const ot = ordenes.find(ot => ot.idorden === idot)
    const ln = lineas.find(ln => ln.idlinea === ot.linea)
    const index = ln.ordenes.findIndex(ln => ln === ot.idorden)
    Swal.fire({
        showCancelButton: true,
        title: `¡CUIDADO!`,
        text: `¿Desea quitar la Orden ${ot.idorden} de la linea ${ln.nombre}?`,
        icon: 'warning',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            ot.linea = null
            ot.estado = "NO ASIGNADO"
            ln.ordenes.splice(index, 1)

            cargarTabOTactivas(ordenes)
            cargarTabOTasignar(ordenes)

            LineasLSset()
            OrdenesLSset()
            Swal.fire({
                title: `Orden ${ot.idorden} quitada correctamente!!!`,
                icon: 'success',
                timer: 2500,
                showConfirmButton: false,
            })
        }
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