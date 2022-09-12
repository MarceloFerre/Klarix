//CLIENTES

//Array CLIENTES
 const clientes = []
//Tabla CLIENTES
const tabcli = document.getElementById("tabcli")

//listeners
let btnCli = document.getElementById("verCli").addEventListener('click', verCli)
let inptFiltroCli = document.getElementById("filtroCli").addEventListener('keyup', filtroCli)
let btnVerFormNvoCli = document.getElementById("verFormNvoCli").addEventListener('click', verFormNvoCli)
let btnCerrarFormNvoCli = document.getElementById("ocultarNvoCli").addEventListener('click', verFormNvoCli)
let btnIngresarNvoCli = document.getElementById("ingresarNvoCli").addEventListener('click', ingresarNvoCli)
let cerrarModCli = document.getElementById("cerrarModCli").addEventListener('click', ocultarModifCli)
let btnGuardarModCli = document.getElementById("guardarCliModif").addEventListener('click', guardarCliModif)

//oculta formularios al iniciar
const clis = document.getElementById("Clientes")
clis.style.display = "none"
const formNvoCli = document.getElementById("formNuevoCli").style.display = "none"
const formModCli = document.getElementById("formModifCli").style.display = "none"

//Funciones Formularios
function crearIDcli() {
    let id = `CL${clientes.length}`
    return id
}
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

//Carga de datos
function ClientesLSget() {//busca CLIENTES en localStorage, si no encuentra los agrega haciendo FETCH a KXbd.JSON
    const clisJson = (JSON.parse(localStorage.getItem('KXclientes')) || [])
    if (clisJson.length == 0) {
        fetchClientes()
        ClientesLSset()
    } else {
        clisJson.forEach(cliente => {
            clientes.push(cliente)
        })
    }
    cargarTablaClientes(clientes)

}
function ClientesLSset() {//Guarda CLIENTES en localStorage
    const clisJson = JSON.stringify(clientes)
    localStorage.setItem('KXclientes', clisJson)
}
function fetchClientes() {
    fetch('js/KXbd.JSON')
        .then((resp) => resp.json())
        .then((data) => {
            data.clientes.forEach(cliente => {
                clientes.push(cliente)
            });

        })
}
//Clase 
class cliente {
    constructor(id, nombre, direccion, mail, telefono) {
        this.idcli = id
        this.nombre = nombre
        this.direccion = direccion
        this.mail = mail
        this.telefono = telefono
    }
}
//inicio
ClientesLSget()