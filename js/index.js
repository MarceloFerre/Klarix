
/* fetch('js/KXbd.JSON')
    .then( (resp) => resp.json() )
    .then( (data) => {
        console.table(data.productos)
        productos = data.productos
        ProductosLSset()
    })*/
comenzar()
function comenzar() {
    cardMonitor.innerHTML = `<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <div class="aviso">
        <div class="avtitulo">
            <h2>Cargando datos</h2>
        </div>
        <div class="avimg">
            <img src="logo.gif">
            <h3 id="comentCarga">Recuperando tablas</h3>
            <progress id="progCarga" class="progress" max="1000" value="0"></progress>
           
        </div>
        <div class="avpie"></div>
    </div>`
    let progCarga = document.getElementById("progCarga")
    let comentCarga = document.getElementById("comentCarga")
    comentCarga.innerHTML = "Cargando Productos"
    progCarga.value = 0
    setInterval(() => {
        progCarga.value++
    }, 1);
    setTimeout(() => {
        Swal.fire({
            title: 'Datos cargados exitosamente',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
        })
        recuperarMonitores()
    }, 6000);

}
function recuperarMonitores() {
    cardMonitor.innerHTML = ``
    let monitor = monitores
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

    //buttons Operarios
    let selEmpCat = document.getElementById("empCat")
    selEmpCat.addEventListener('mouseup', verCatFiltros)
    let inptFiltroEmp = document.getElementById("filtroEmp")
    inptFiltroEmp.addEventListener('keyup', filtroEmp)
    let selEmpCategoria = document.getElementById("empCategoria")
    selEmpCategoria.addEventListener('mouseup', filtroEmpCategorias)

    let btnVerFormNvoEmp = document.getElementById("verFormNvoEmp")
    btnVerFormNvoEmp.addEventListener('click', verFormNvoEmp)
    let btnCerrarFormNvoEmp = document.getElementById("ocultarNvoEmp")
    btnCerrarFormNvoEmp.addEventListener('click', verFormNvoEmp)
    let btnIngresarNvoEmp = document.getElementById("ingresarNvoEmp")
    btnIngresarNvoEmp.addEventListener('click', ingresarNvoEmp)

    let btnCerrarFormModEmp = document.getElementById("ocultarEmpModif")
    btnCerrarFormModEmp.addEventListener('click', cerrarEmpModif)
    let btnGuardarModEmp = document.getElementById("guardarEmpModif")
    btnGuardarModEmp.addEventListener('click', guardarModifEmp)

    //buttons Productos
    let inptFiltroProd = document.getElementById("filtroProd")
    inptFiltroProd.addEventListener('keyup', filtroProd)

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
    let inptFiltroCli = document.getElementById("filtroCli")
    inptFiltroCli.addEventListener('keyup', filtroCli)

    let btnVerFormNvoCli = document.getElementById("verFormNvoCli")
    btnVerFormNvoCli.addEventListener('click', verFormNvoCli)
    let btnCerrarFormNvoCli = document.getElementById("ocultarNvoCli")
    btnCerrarFormNvoCli.addEventListener('click', verFormNvoCli)
    let btnIngresarNvoCli = document.getElementById("ingresarNvoCli")
    btnIngresarNvoCli.addEventListener('click', ingresarNvoCli)

    let cerrarModCli = document.getElementById("cerrarModCli")
    cerrarModCli.addEventListener('click', ocultarModifCli)
    let btnGuardarModCli = document.getElementById("guardarCliModif")
    btnGuardarModCli.addEventListener('click', guardarCliModif)

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
        Swal.fire({
            title: 'Cliente incorrecto',
            text: 'Por favor, llene bien los campos.',
            icon: 'error',
            confirmButtonText: 'OK',
        })
    } else {
        const cliNvo = new cliente()
        cliNvo.idcli = crearIDcli()
        cliNvo.nombre = nombreCliNvo.value.toLocaleUpperCase()
        cliNvo.direccion = direcCliNvo.value.toLocaleUpperCase()
        cliNvo.mail = mailCliNvo.value
        cliNvo.telefono = parseInt(telCliNvo.value)

        clientes.push(cliNvo)
        cargarTablaClientes(clientes)
        verFormNvoCli()
        ClientesLSset()
        idCliNvo.value = crearIDcli()
        nombreCliNvo.value = ""
        direcCliNvo.value = ""
        mailCliNvo.value = ""
        telCliNvo.value = ""
        Swal.fire({
            title: 'Cliente ingresado correctamente',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
        })
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
        Swal.fire({
            title: 'Cambio incorrecto',
            text: 'Por favor, llene bien los campos.',
            icon: 'error',
            confirmButtonText: 'OK',
        })
        verFormModifCli(IDcli)
    } else {
        const modificado = new cliente()
        modificado.idcli = IDcli
        modificado.nombre = nombreCliMod.value.toLocaleUpperCase()
        modificado.direccion = direcCliMod.value.toLocaleUpperCase()
        modificado.mail = mailCliMod.value
        modificado.telefono = parseInt(telCliMod.value)

        Swal.fire({
            showCancelButton: true,
            text: '¿Desea modificar el cliente?',
            icon: 'warning',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                clientes[IDreal] = modificado
                cargarTablaClientes(clientes)
                ClientesLSset()
                formModCli.style.display = "none"
                Swal.fire({
                    title: 'Cliente modificado correctamente',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                })
            }
        })
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
function ocultarModifCli() {
    formModCli.style.display = "none"
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
function filtroEmp() {//Busca empleados por sus propiedades
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
function filtroEmpCategorias() {//busca operarios por su categoría
    const filtrocat = CATEGORIA[document.getElementById("empCategoria").value]
    let busqueda = empleados.filter((empleado) => empleado.categoria == filtrocat)
    cargarTablaEmpleados(busqueda)
}
function verFormNvoEmp() {//muestra formulario nuevo operario
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
function ingresarNvoEmp() {//guarda operario nuevo
    const idEmpNvo = document.getElementById("idEmpNvo")
    const nombreEmpNvo = document.getElementById("nombreEmpNvo")
    const direcEmpNvo = document.getElementById("direcEmpNvo")
    const contactoEmpNvo = document.getElementById("contEmpNvo")
    const catEmpNvo = document.getElementById("catEmpNvo")


    if (nombreEmpNvo.value == "" || direcEmpNvo.value == "" || contactoEmpNvo.value === 0 || catEmpNvo.value == 0) {
        Swal.fire({
            title: 'Operario incorrecto',
            text: 'Por favor, llene bien los campos.',
            icon: 'error',
            confirmButtonText: 'OK',
        })
    } else {
        const EmpNvo = new empleado()
        EmpNvo.idemp = idEmpNvo.value
        EmpNvo.nombre = nombreEmpNvo.value.toLocaleUpperCase()
        EmpNvo.direccion = direcEmpNvo.value.toLocaleUpperCase()
        EmpNvo.contacto = parseInt(contactoEmpNvo.value)
        EmpNvo.categoria = CATEGORIA[catEmpNvo.value]


        empleados.push(EmpNvo)
        cargarTablaEmpleados(empleados)
        EmpleadosLSset()
        verFormNvoEmp()

        idEmpNvo.value = crearIDop()
        nombreEmpNvo.value = ""
        direcEmpNvo.value = ""
        contactoEmpNvo.value = ""
        catEmpNvo.value = ""
        Swal.fire({
            title: 'Operario ingresado correctamente',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
        })
    }


}
function verFormModifEmp(ID) {//muestra y carga datos al formulario modificar empleado

    if (formModEmp.style.display == "none") {
        formModEmp.style.display = "block"
        formNvoEmp.style.display = "none"
    }
    const idempleado = document.getElementById("idEmpMod")
    const nombreEmpMod = document.getElementById("nombreEmpMod")
    const direcEmpMod = document.getElementById("direcEmpMod")
    const contEmpMod = document.getElementById("contEmpMod")
    const catEmpMod = document.getElementById("catEmpMod")

    let { nombre, direccion, contacto, categoria } = empleados.find(empleado => empleado.idemp == ID)
    let catindex = CATEGORIA.findIndex(cat => cat == categoria)
    optCatEmp("catEmpMod")

    idempleado.value = ID
    nombreEmpMod.value = nombre
    direcEmpMod.value = direccion
    contEmpMod.value = contacto
    catEmpMod.selectedIndex = catindex + 1
}
function cerrarEmpModif() {
    formModEmp.style.display = "none"
}
function guardarModifEmp() {//guarda cambios realizados en operario
    const idEmpMod = document.getElementById("idEmpMod")
    const IDemp = idEmpMod.value
    const IDreal = empleados.findIndex(empleado => empleado.idemp == IDemp)
    const nombreEmpMod = document.getElementById("nombreEmpMod")
    const direcEmpMod = document.getElementById("direcEmpMod")
    const contactoEmpMod = document.getElementById("contEmpMod")
    const catEmpMod = document.getElementById("catEmpMod")


    if (nombreEmpMod.value == "" || direcEmpMod.value == "" || contactoEmpMod.value == "" || catEmpMod.value == "") {
        Swal.fire({
            title: 'Cambio no admitido!',
            text: 'Por favor, llene bien los campos.',
            icon: 'error',
            confirmButtonText: 'OK',
        })
        verFormModifEmp(IDemp)
    } else {
        const modificado = new empleado()
        modificado.idemp = IDemp
        modificado.nombre = nombreEmpMod.value.toLocaleUpperCase()
        modificado.direccion = direcEmpMod.value.toLocaleUpperCase()
        modificado.contacto = parseInt(contactoEmpMod.value)
        modificado.categoria = CATEGORIA[catEmpMod.value]

        Swal.fire({
            showCancelButton: true,
            text: '¿Desea modificar el operario?',
            icon: 'warning',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                empleados[IDreal] = modificado
                cargarTablaEmpleados(empleados)
                EmpleadosLSset()
                cerrarEmpModif()
                Swal.fire({
                    title: 'Operario modificado correctamente',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                })
            }
        })
    }
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
setTimeout(() => {
    cargarTablas()
}, 3500);
//cargarTablas()
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
function cargarTablaProductos(arrProd) {
    tabprod.innerHTML = ``
    arrProd.forEach(producto => {
        tabprod.innerHTML += `<tr>
                            <td><button class="btnModProd" id=${producto.idpr} >📝</button></td>
                            <td>${producto.idpr}</td>
                            <td><strong>${producto.nombre}</strong></td>
                            <td>${producto.presentacion}</td>
                            <td>${producto.descripcion}</td>
                          </tr>`

    })
    let btnModProd = document.querySelectorAll('.btnModProd')
    btnModProd.forEach(btn => {
        btn.addEventListener('click', () => {
            verFormModifProd(btn.id)
        })
    })
}
function cargarTablaClientes(arrCli) {
    tabcli.innerHTML = ``
    arrCli.forEach(cliente => {
        tabcli.innerHTML += `<tr>
                                <td><button class="btnModCli" id='${cliente.idcli}' >📝</button></td>
                                <td>${cliente.idcli}</td>
                                <td><strong>${cliente.nombre}</strong></td>
                                <td>${cliente.direccion}</td>
                                <td><a href="mailto:${cliente.mail}">${cliente.mail}</a></td>
                                <td>${cliente.telefono}</td>                                
                            </tr>`
    })
    let btnModCli = document.querySelectorAll('.btnModCli')
    btnModCli.forEach(btn => {
        btn.addEventListener('click', () => {
            verFormModifCli(btn.id)
        })
    })
}
function cargarTablaEmpleados(arrEmp) {
    tabemp.innerHTML = ``
    arrEmp.forEach(empleado => {
        tabemp.innerHTML += `<tr>
                                <td><button class="btnModEmp" id='${empleado.idemp}' >📝</button></td>
                                <td>${empleado.idemp}</td>
                                <td><strong>${empleado.nombre}</strong></td>
                                <td>${empleado.categoria}</td>
                                <td>${empleado.direccion}</td>
                                <td>${empleado.contacto}</td>
                                
                           </tr>`
    })
    let btnModEmp = document.querySelectorAll('.btnModEmp')
    btnModEmp.forEach(modEmp => {
        modEmp.addEventListener('click', () => {
            verFormModifEmp(modEmp.id)
        })
    })
}
function cargarTablaLineas(arrLns) {

    btnslns.innerHTML = ``
    arrLns.forEach(linea => {
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
                                <td><button id="btnNvaLn"> 📃👉🏭 <br> </button>
                                </td>
                           </tr>`
    })
}


function arraytotal() {
    const arraytotal = { "productos": productos, "clientes": clientes, "empleados": empleados, "ordenes": ordenes, "lineas": lineas }
    return console.log(JSON.stringify(arraytotal))
}