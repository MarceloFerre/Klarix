
//MODULOS
function botones() {
    //buttons de la barra de navegacion
    let btnMonitor = document.getElementById("VerMonitor")
    btnMonitor.addEventListener('click', VerMonitor)
    let btnAdmin = document.getElementById("VerAdmin")
    btnAdmin.addEventListener('click', VerAdmin)
    let btnAudit = document.getElementById("VerAudit")
    btnAudit.addEventListener('click', VerAudit)
    //buttons principales de Admin
    let btnLineas = document.getElementById("verLineas")
    btnLineas.addEventListener('click', verLineas)
    let btnOrdenes = document.getElementById("verOrdenes")
    btnOrdenes.addEventListener('click', verOrdenes)
    let btnEmp = document.getElementById("verEmp")
    btnEmp.addEventListener('click', verEmp)
    let btnProd = document.getElementById("verProductos")
    btnProd.addEventListener('click', verProd)
    let btnCli = document.getElementById("verCli")
    btnCli.addEventListener('click', verCli)
    //buttons Lineas

    //buttons Ordenes

    //buttons Empleados

    //buttons Productos
    let btnVerFormNvoProd = document.getElementById("verFormNvoProd")
    btnVerFormNvoProd.addEventListener('click', verFormNvoProd)
    let btnOcultarFormNvoProd = document.getElementById("cerrarNvoProd")
    btnOcultarFormNvoProd.addEventListener('click', verFormNvoProd)
    let btnIngresarNvoProd = document.getElementById("ingresarNvoProd")
    btnIngresarNvoProd.addEventListener('click', ingresarNvoProd)

    let cerrarModProd = document.getElementById("cerrarModProd")
    cerrarModProd.addEventListener('click', ocultarModProd)
    let btnGuardarModProd = document.getElementById("guardarCambiosProd")
    btnGuardarModProd.addEventListener('click', guardarProdModif)

    //buttons Clientes

}
botones()

//elementos para mostrar los 3 modulos
const Monitor = document.getElementById("Monitor")
const Admin = document.getElementById("Admin")
const Audit = document.getElementById("Audit")

Monitor.style.display = "block"
Admin.style.display = "none"
Audit.style.display = "none"

function VerMonitor() {//Ver MONITOR
    if (Monitor.style.display == "none") {
        Monitor.style.display = "block"
        Admin.style.display = "none"
        Audit.style.display = "none"
    }
}
function VerAdmin() {//Ver ADMINISTRADOR
    if (Admin.style.display == "none") {
        Monitor.style.display = "none"
        Admin.style.display = "block"
        Audit.style.display = "none"
    }
}
function VerAudit() {//Ver AUDITORIA
    if (Audit.style.display == "none") {
        Monitor.style.display = "none"
        Admin.style.display = "none"
        Audit.style.display = "block"
    }
}
//MONITOR

localStorage.setItem('monitores', JSON.stringify(monitores))
cardMonitor.innerHTML = '<img src="https://corpogenlab.com/wp-content/uploads/2019/11/tubo-1.gif" ><h2>Cargando Lineas</h2>'
setTimeout(() => {
    cardMonitor.innerHTML = ''
    recuperarMonitores()
}, 3000)
function recuperarMonitores() {
    let monitor = JSON.parse(localStorage.getItem('monitores'))
    if (monitor) {
        monitor.forEach(item => {

            let div = document.createElement('div')
            div.className = 'card'
            div.innerHTML = `<div class="cardtitulo">🏭 ${item.titulo}</div>
                                    <div class="cardot">📑 ${item.ot}</div>
                                    <div class="cardprod">${item.prod}</div>
                                    <div class="cardpresen">${item.present}</div>
                                    <div class="cardestadoicono">${item.icono}</div>
                                    <div class="cardestado">${item.estado}</div>
                                    <div class="cardUnidades">${item.undsprod}/${item.undspedidas} | ${parseInt(item.progreso * 100)}% <progress class="progress" value="${item.progreso}"></progress></div>
                                    <div class="cardpie">
                                    <a href="#">+info</a>
                                    </div>
                                </div>
                `
            cardMonitor.append(div)
        })
    }
}

//ADMINISTRADOR

//Esto oculta todas las secciones adentro de Administrar al iniciar
const prods = document.getElementById("Productos")
prods.style.display = "none"
const clis = document.getElementById("Clientes")
clis.style.display = "none"
const emps = document.getElementById("Empleados")
emps.style.display = "none"
const lns = document.getElementById("Lineas")
lns.style.display = "none"
const ots = document.getElementById("Ordenes")
ots.style.display = "none"

//PRODUCTOS
//oculta formularios al iniciar
const formNvoProd = document.getElementById("formNuevoProd")
const formModProd = document.getElementById("formModifProd")
formNvoProd.style.display = "none"
formModProd.style.display = "none"

function verProd() {//Boton PRODUCTOS
    prods.style.display == "none" ? prods.style.display = "block" : prods.style.display = "none"
}
function verFormNvoProd() {//Boton NUEVO PRODUCTO
    if (formNvoProd.style.display == "none") {
        formNvoProd.style.display = "block"
        formModProd.style.display = "none"

    } else {
        formNvoProd.style.display = "none"
    }
    const idProdNvo = document.getElementById("idProdNvo")
    idProdNvo.value = crearIDprod()
}
function ingresarNvoProd() {//Boton INGRESAR PRODUCTO
    const idProdNvo = document.getElementById("idProdNvo")
    const nombreProdNvo = document.getElementById("nombreProdNvo")
    const presenProdNvo = document.getElementById("presenProdNvo")
    const descProdNvo = document.getElementById("descProdNvo")

    if (nombreProdNvo.value == "" || presenProdNvo.value == "" || descProdNvo.value == "") {
        Swal.fire({
            title: 'Producto incorrecto',
            text: 'Por favor, llene bien los campos.',
            icon: 'error',
            confirmButtonText: 'OK',
        })
    } else {
        const prodNvo = new producto()
        prodNvo.idpr = crearIDprod()
        prodNvo.nombre = nombreProdNvo.value.toLocaleUpperCase()
        prodNvo.presentacion = presenProdNvo.value.toLocaleUpperCase()
        prodNvo.descripcion = descProdNvo.value.toLocaleUpperCase()

        productos.push(prodNvo)
        idProdNvo.value = crearIDprod()
        nombreProdNvo.value = ""
        presenProdNvo.value = ""
        descProdNvo.value = ""

        cargarTablaProductos(productos)
        ProductosLSset()
        verFormNvoProd()

        Swal.fire({
            title: 'Producto ingresado correctamente',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
        })

    }

}
function ocultarModProd() {
    formModProd.style.display = "none"

}
function verFormModifProd(idpr) {//Boton de tabla MODIFICAR PRODUCTO
    if (formModProd.style.display == "none") {
        formModProd.style.display = "block"
        formNvoProd.style.display = "none"
    }
    const idprod = document.getElementById("idProdMod")
    const nombreProdMod = document.getElementById("nombreProdMod")
    const presenProdMod = document.getElementById("presenProdMod")
    const descProdMod = document.getElementById("descProdMod")
    let producto = productos.find(producto => producto.idpr == idpr)
    const { nombre, presentacion, descripcion } = producto

    idprod.value = idpr
    nombreProdMod.value = nombre
    presenProdMod.value = presentacion
    descProdMod.value = descripcion

}
function guardarProdModif() {//guarda los cambios en el PRODUCTO
    const idProdMod = document.getElementById("idProdMod")
    const IDprod = idProdMod.value
    const IDreal = productos.findIndex(producto => producto.idpr == IDprod)

    const nombreProdMod = document.getElementById("nombreProdMod")
    const presenProdMod = document.getElementById("presenProdMod")
    const descProdMod = document.getElementById("descProdMod")

    if (nombreProdMod.value == "" || presenProdMod.value == "" || descProdMod.value == "") {
        Swal.fire({
            title: 'Cambio incorrecto',
            text: 'Por favor, llene bien los campos.',
            icon: 'error',
            confirmButtonText: 'OK',
        })
        verFormModifProd(IDprod)
    } else {
        const modificado = new producto()
        modificado.idpr = IDprod
        modificado.nombre = nombreProdMod.value.toLocaleUpperCase()
        modificado.presentacion = presenProdMod.value.toLocaleUpperCase()
        modificado.descripcion = descProdMod.value.toLocaleUpperCase()

        Swal.fire({
            showCancelButton: true,
            text: '¿Desea modificar el producto?',
            icon: 'warning',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                productos[IDreal] = modificado
                cargarTablaProductos(productos)
                ProductosLSset()
                ocultarModProd()
                Swal.fire({
                    title: 'Producto modificado correctamente',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                })
            }
        })
    }
}
function filtroProd() {//Filtro PRODUCTOS
    const filtro = document.getElementById("filtroProd").value.toLocaleUpperCase()
    const categoria = document.getElementById("prodCat").value
    let busqueda = []
    switch (categoria) {
        case "ID":
            busqueda = productos.filter((producto) => producto.idpr.includes(filtro))
            break;
        case "nombre":
            busqueda = productos.filter((producto) => producto.nombre.includes(filtro))
            break;
        case "presentacion":
            busqueda = productos.filter((producto) => producto.presentacion.includes(filtro))
            break;
        case "descripcion":
            busqueda = productos.filter((producto) => producto.descripcion.includes(filtro))
            break;
        default: busqueda = productos
    }
    if (busqueda.length > 0) {
        cargarTablaProductos(busqueda)
    } else {
        cargarTablaProductos(productos)
    }
}

//CLIENTES
//oculta formularios al iniciar
const formNvoCli = document.getElementById("formNuevoCli")
const formModCli = document.getElementById("formModifCli")
formNvoCli.style.display = "none"
formModCli.style.display = "none"
const selectCat = document.getElementById("empCategoria")
selectCat.style.display = "none"


function verCli() {//Boton CLIENTES
    clis.style.display == "none" ? clis.style.display = "block" : clis.style.display = "none"
}
function verFormNvoCli() {//Boton NUEVO CLIENTE
    if (formNvoCli.style.display == "none") {
        formNvoCli.style.display = "block"
        formModCli.style.display = "none"

    } else {
        formNvoCli.style.display = "none"
    }
    const idCliNvo = document.getElementById("idCliNvo")
    idCliNvo.value = crearIDcli()
}
function ingresarNvoCli() {//Boton INGRESAR CLIENTE
    const idCliNvo = document.getElementById("idCliNvo")
    const nombreCliNvo = document.getElementById("nombreCliNvo")
    const direcCliNvo = document.getElementById("direcCliNvo")
    const mailCliNvo = document.getElementById("mailCliNvo")
    const telCliNvo = document.getElementById("telCliNvo")

    if (nombreCliNvo.value == "" || direcCliNvo.value == "" || mailCliNvo.value == "" || telCliNvo.value == "") {
        alert("Por favor llenar bien los campos.")
    } else {
        const cliNvo = new cliente()
        cliNvo.idcli = crearIDcli()
        cliNvo.nombre = nombreCliNvo.value.toLocaleUpperCase()
        cliNvo.direccion = direcCliNvo.value.toLocaleUpperCase()
        cliNvo.mail = mailCliNvo.value
        cliNvo.telefono = parseInt(telCliNvo.value)

        clientes.push(cliNvo)
        cargarTablaClientes()
        idCliNvo.value = crearIDcli()
        nombreCliNvo.value = ""
        direcCliNvo.value = ""
        mailCliNvo.value = ""
        telCliNvo.value = ""
    }
}
function verFormModifCli(idcli) {//Boton de tabla MODIFICAR CLIENTE
    if (formModCli.style.display == "none") {
        formModCli.style.display = "block"
        formNvoCli.style.display = "none"
    }
    const idclien = document.getElementById("idCliMod")
    const nombreCliMod = document.getElementById("nombreCliMod")
    const direcCliMod = document.getElementById("direcCliMod")
    const mailCliMod = document.getElementById("mailCliMod")
    const telCliMod = document.getElementById("telCliMod")

    let { nombre, direccion, mail, telefono } = clientes.find(cliente => cliente.idcli == idcli)

    idclien.value = idcli
    nombreCliMod.value = nombre
    direcCliMod.value = direccion
    mailCliMod.value = mail
    telCliMod.value = telefono
}
function guardarCliModif() {//guarda los cambios en el CLIENTE
    const idCliMod = document.getElementById("idCliMod")
    const IDcli = idCliMod.value
    const IDreal = clientes.findIndex(cliente => cliente.idcli == IDcli)

    const nombreCliMod = document.getElementById("nombreCliMod")
    const direcCliMod = document.getElementById("direcCliMod")
    const mailCliMod = document.getElementById("mailCliMod")
    const telCliMod = document.getElementById("telCliMod")

    if (nombreCliMod.value == "" || direcCliMod.value == "" || mailCliMod.value == "" || telCliMod.value == "") {
        alert("Por favor llenar bien los campos.")
        verFormModifCli(IDcli)
    } else {
        const modificado = new cliente()
        modificado.idcli = IDcli
        modificado.nombre = nombreCliMod.value.toLocaleUpperCase()
        modificado.direccion = direcCliMod.value.toLocaleUpperCase()
        modificado.mail = mailCliMod.value
        modificado.telefono = parseInt(telCliMod.value)
        if (confirm("Desea guardar los cambios?")) {
            clientes[IDreal] = modificado
            cargarTablaClientes()
            formModCli.style.display = "none"
        }
    }

}
function filtroCli() {//Filtro CLIENTES
    const filtro = document.getElementById("filtroCli").value
    const categoria = document.getElementById("cliCat").value
    let busqueda = []
    switch (categoria) {
        case "ID":
            busqueda = clientes.filter((cliente) => cliente.idcli.includes(filtro.toLocaleUpperCase()))
            break;
        case "nombre":
            busqueda = clientes.filter((cliente) => cliente.nombre.includes(filtro.toLocaleUpperCase()))
            break;
        case "direccion":
            busqueda = clientes.filter((cliente) => cliente.direccion.includes(filtro.toLocaleUpperCase()))
            break;
        case "email":
            busqueda = clientes.filter((cliente) => cliente.mail.includes(filtro.toLocaleLowerCase()))
            break;
        case "telefono":
            busqueda = clientes.filter((cliente) => cliente.telefono == parseInt(filtro))
            break;
        default: busqueda = clientes
    }
    if (busqueda.length > 0) {
        cargarTablaClientes(busqueda)
    } else {
        cargarTablaClientes(clientes)

    }




}

//OPERARIOS
//oculta formularios cuando inicia
const formNvoEmp = document.getElementById("formNuevoEmp")
const formModEmp = document.getElementById("formModifEmp")
formNvoEmp.style.display = "none"
formModEmp.style.display = "none"

function verEmp() {//Boton Operarios
    emps.style.display == "none" ? emps.style.display = "block" : emps.style.display = "none"
}
function optCatEmp(optid) {//todos los select con categorias de operarios
    //optid es el id del select en el html
    const optCat = document.getElementById(optid)
    optCat.innerHTML = `<option value="">Categoría</option>`
    for (let i = 0; i < CATEGORIA.length; i++) {
        optCat.innerHTML += `<option value="${i}">${CATEGORIA[i]}</option>`
    }
}
function filtroEmp() {
    const filtro = document.getElementById("filtroEmp").value.toLocaleUpperCase()
    const categoria = document.getElementById("empCat").value
    let busqueda = []
    switch (categoria) {
        case "ID":
            busqueda = empleados.filter((empleado) => empleado.idemp.includes(filtro))
            break;
        case "nombre":
            busqueda = empleados.filter((empleado) => empleado.nombre.includes(filtro))
            break;
        case "direccion":
            busqueda = empleados.filter((empleado) => empleado.direccion.includes(filtro))
            break;
        case "contacto":
            busqueda = empleados.filter((empleado) => empleado.contacto == parseInt(filtro))
            break;
        default: busqueda = empleados
    }
    if (busqueda.length > 0) {
        cargarTablaEmpleados(busqueda)
    } else {
        cargarTablaEmpleados(empleados)
    }
}
function verCatFiltros() {//si selecciona filtrar por categoria, muestra select Categorias y oculta input Busqueda
    const empCat = document.getElementById("empCat").value
    const filtro = document.getElementById("filtroEmp")

    if (empCat == "categoria") {
        selectCat.style.display = "block"
        filtro.style.display = "none"
        optCatEmp("empCategoria")
    } else {
        selectCat.style.display = "none"
        if (filtro.style.display == "none") { filtro.style.display = "block" }
    }
}
function filtroEmpCategorias() {
    const filtrocat = CATEGORIA[document.getElementById("empCategoria").value]
    let busqueda = empleados.filter((empleado) => empleado.categoria == filtrocat)
    cargarTablaEmpleados(busqueda)
}
function verFormNvoEmp() {
    if (formNvoEmp.style.display == "none") {
        formNvoEmp.style.display = "block"
        formModEmp.style.display = "none"

    } else {
        formNvoEmp.style.display = "none"
    }
    const idEmpNvo = document.getElementById("idEmpNvo")
    idEmpNvo.value = crearIDop()
    optCatEmp("catEmpNvo")
}
function ingresarNvoEmp() {
    const idEmpNvo = document.getElementById("idEmpNvo")
    const nombreEmpNvo = document.getElementById("nombreEmpNvo")
    const direcEmpNvo = document.getElementById("direcEmpNvo")
    const contactoEmpNvo = document.getElementById("contEmpNvo")
    const catEmpNvo = document.getElementById("catEmpNvo")


    if (nombreEmpNvo.value == "" || direcEmpNvo.value == "" || contactoEmpNvo.value == "" || catEmpNvo.value == "") {
        alert("Por favor llenar bien los campos.")
    } else {
        const EmpNvo = new empleado()
        EmpNvo.idemp = idEmpNvo.value
        EmpNvo.nombre = nombreEmpNvo.value.toLocaleUpperCase()
        EmpNvo.direccion = direcEmpNvo.value.toLocaleUpperCase()
        EmpNvo.contacto = parseInt(contactoEmpNvo.value)
        EmpNvo.categoria = CATEGORIA[catEmpNvo.value]


        empleados.push(EmpNvo)
        cargarTablaEmpleados()
        idEmpNvo.value = crearIDop()
        nombreEmpNvo.value = ""
        direcEmpNvo.value = ""
        contactoEmpNvo.value = ""
        catEmpNvo.value = ""
    }


}
function verFormModifEmp(idemp) {
    optCatEmp("catEmpMod")
    if (formModEmp.style.display == "none") {
        formModEmp.style.display = "block"
        formNvoEmp.style.display = "none"
    }
    const idempleado = document.getElementById("idEmpMod")
    const nombreEmpMod = document.getElementById("nombreEmpMod")
    const direcEmpMod = document.getElementById("direcEmpMod")
    const contEmpMod = document.getElementById("contEmpMod")
    const catEmpMod = document.getElementById("catEmpMod")
    let { nombre, direccion, contacto, categoria } = empleados.find(empleado => empleado.idemp == idemp)
    let cataindi = CATEGORIA.findIndex(cat => cat == categoria)
    idempleado.value = idemp
    nombreEmpMod.value = nombre
    direcEmpMod.value = direccion
    contEmpMod.value = contacto
    catEmpMod.value = cataindi
}
function guardarEmpModif() {

}
//LINEAS
//
function verLineas() {
    lns.style.display == "none" ? lns.style.display = "block" : lns.style.display = "none"
    cargarTablaLineas(lineas)
}

//ORDENES
//
function verOrdenes() {
    ots.style.display == "none" ? ots.style.display = "block" : ots.style.display = "none"
}


//TABLAS
const tabprod = document.getElementById("tabprod")
const tabcli = document.getElementById("tabcli")
const tabemp = document.getElementById("tabemp")
const tablns = document.getElementById("tablns")
const btnslns = document.getElementById("btnsLineas")
const tabot = document.getElementById("tabot")

cargarTablas()
function cargarTablas() {
    cargarTablaProductos(productos)
    ProductosLSset()
    cargarTablaClientes(clientes)
    ClientesLSset()
    cargarTablaEmpleados(empleados)
    EmpleadosLSset()
    cargarTablaLineas(lineas)
    LineasLSset()
    cargarTablaOrdenes(ordenes)
    OrdenesLSset()
}
function cargarTablaProductos(array) {

    tabprod.innerHTML = ``
    array.forEach(producto => {

        tabprod.innerHTML += `<tr>
                            <td><button onclick="verFormModifProd('${producto.idpr}')" >📝</button></td>
                            <td>${producto.idpr}</td>
                            <td><strong>${producto.nombre}</strong></td>
                            <td>${producto.presentacion}</td>
                            <td>${producto.descripcion}</td>
                            </tr>`
    });


}
function cargarTablaClientes(array) {
    tabcli.innerHTML = ``
    array.forEach(cliente => {
        tabcli.innerHTML += `<tr>
                                <td><button onclick="verFormModifCli('${cliente.idcli}')" >📝</button></td>
                                <td>${cliente.idcli}</td>
                                <td><strong>${cliente.nombre}</strong></td>
                                <td>${cliente.direccion}</td>
                                <td><a href="mailto:${cliente.mail}">${cliente.mail}</a></td>
                                
                                <td>${cliente.telefono}</td>
                                
                            </tr>`
    })
}
function cargarTablaEmpleados(array) {
    tabemp.innerHTML = ``
    array.forEach(empleado => {
        tabemp.innerHTML += `<tr>
                                <td><button onclick="verFormModifEmp('${empleado.idemp}')" >📝</button></td>
                                <td>${empleado.idemp}</td>
                                <td><strong>${empleado.nombre}</strong></td>
                                <td>${empleado.categoria}</td>
                                <td>${empleado.direccion}</td>
                                <td>${empleado.contacto}</td>
                                
                           </tr>`
    })
}
function cargarTablaLineas(array) {

    btnslns.innerHTML = ``
    array.forEach(linea => {
        btnslns.innerHTML += `<button class="btnLinea">🏭 ${linea.nombre}</button>`
    })
    btnslns.innerHTML += `<button id="btnNvaLn">➕</button>`
    /*
        tablns.innerHTML = ``
        array.forEach(linea => {
            tablns.innerHTML += `<tr>
                                    <td><a >📝</a> </td>
                                    <td>${linea.idlinea}</td>
                                    <td>${linea.nombre}</td>
                                    <td>${linea.descripcion}</td>
                                    <td>${linea.ordenactiva}</td>
                                    
                               </tr>`
        })*/
}
function cargarTablaOrdenes(arr) {
    tabot.innerHTML = ``
    arr.forEach(orden => {
        let cli = clientes.find(cliente => cliente.idcli == orden.idcliente)
        let prod = productos.find(producto => producto.idpr == orden.idproducto)
        let pres = prod.presentacion.toLocaleLowerCase()
        tabot.innerHTML += `<tr>
                                <td><a >📝</a> </td>
                                <td>${orden.idorden}</td>
                                <td><strong>${prod.nombre}</strong> - ${pres}</td>
                                <td>${cli.nombre}</td>
                                <td>${orden.unidadespedidas}</td>      
                                <td>${orden.estado}</td>
                           </tr>`
    })
}
btnLinea