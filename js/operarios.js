//OPERARIOS
//Array OPERARIOS
const operarios = []
const CATEGORIA = ["OP.COMUN", "OP.ESPECIALIZADO", "JEFE DE LINEA", "CHECKER QC", "ADMINISTRATIVO", "MANTENIMIENTO"]

//Tabla OPERARIOS
const tabope = document.getElementById("tabope")
//Listeners
let btnOpe = document.getElementById("verOpe").addEventListener('click', verOpe)
let selOpeCat = document.getElementById("opeCat").addEventListener('mouseup', verCatFiltros)
let inptFiltroOpe = document.getElementById("filtroOpe").addEventListener('keyup', filtroOpe)
let selOpeCategoria = document.getElementById("opeCategoria").addEventListener('mouseup', filtroOpeCategorias)
let btnVerFormNvoOpe = document.getElementById("verFormNvoOpe").addEventListener('click', verFormNvoOpe)
let btnCerrarFormNvoOpe = document.getElementById("ocultarNvoOpe").addEventListener('click', verFormNvoOpe)
let btnIngresarNvoOpe = document.getElementById("ingresarNvoOpe").addEventListener('click', ingresarNvoOpe)
let btnCerrarFormModOpe = document.getElementById("ocultarOpeModif").addEventListener('click', cerrarOpeModif)
let btnGuardarModOpe = document.getElementById("guardarOpeModif").addEventListener('click', guardarModifOpe)
const selectCat = document.getElementById("opeCategoria").style.display = "none"

//Ocultar Formularios cuando inicia
const opes = document.getElementById("Operarios")
opes.style.display = "none"
const formNvoOpe = document.getElementById("formNuevoOpe").style.display = "none"
const formModOpe = document.getElementById("formModifOpe").style.display = "none"

//Funciones Formularios
function crearIDop() {
    let id = `OP${operarios.length}`
    return id
}
function verOpe() {//Boton Operarios
    opes.style.display == "none" ? opes.style.display = "block" : opes.style.display = "none"
}
function optCatOpe(optid) {//todos los select con categorias de operarios
    //optid es el id del select en el html
    const optCat = document.getElementById(optid)
    optCat.innerHTML = `<option value="">Categoría</option>`
    for (let i = 0; i < CATEGORIA.length; i++) {
        optCat.innerHTML += `<option value="${i}">${CATEGORIA[i]}</option>`
    }
}
function filtroOpe() {//Busca operarios por sus propiedades
    const filtro = document.getElementById("filtroOpe").value.toLocaleUpperCase()
    const categoria = document.getElementById("opeCat").value
    let busqueda = []
    switch (categoria) {
        case "ID":
            busqueda = operarios.filter((operario) => operario.idope.includes(filtro))
            break;
        case "nombre":
            busqueda = operarios.filter((operario) => operario.nombre.includes(filtro))
            break;
        case "direccion":
            busqueda = operarios.filter((operario) => operario.direccion.includes(filtro))
            break;
        case "contacto":
            busqueda = operarios.filter((operario) => operario.contacto == parseInt(filtro))
            break;
        default: busqueda = operarios
    }
    if (busqueda.length > 0) {
        cargarTablaOperarios(busqueda)
    } else {
        cargarTablaOperarios(operarios)
    }
}
function verCatFiltros() {//si selecciona filtrar por categoria, muestra select Categorias y oculta input Busqueda
    const opeCat = document.getElementById("opeCat").value
    const filtro = document.getElementById("filtroOpe")

    if (opeCat == "categoria") {
        selectCat.style.display = "block"
        filtro.style.display = "none"
        optCatOpe("opeCategoria")
    } else {
        selectCat.style.display = "none"
        if (filtro.style.display == "none") { filtro.style.display = "block" }
    }
}
function filtroOpeCategorias() {//busca operarios por su categoría
    const filtrocat = CATEGORIA[document.getElementById("opeCategoria").value]
    let busqueda = operarios.filter((operario) => operario.categoria == filtrocat)
    cargarTablaOperarios(busqueda)
}
function verFormNvoOpe() {//muestra formulario nuevo operario
    if (formNvoOpe.style.display == "none") {
        formNvoOpe.style.display = "block"
        formModOpe.style.display = "none"
    } else {
        formNvoOpe.style.display = "none"
    }
    const idOpeNvo = document.getElementById("idOpeNvo")
    idOpeNvo.value = crearIDop()
    optCatOpe("catOpeNvo")
}
function ingresarNvoOpe() {//guarda operario nuevo
    const idOpeNvo = document.getElementById("idOpeNvo")
    const nombreOpeNvo = document.getElementById("nombreOpeNvo")
    const direcOpeNvo = document.getElementById("direcOpeNvo")
    const contactoOpeNvo = document.getElementById("contOpeNvo")
    const catOpeNvo = document.getElementById("catOpeNvo")


    if (nombreOpeNvo.value == "" || direcOpeNvo.value == "" || contactoOpeNvo.value === 0 || catOpeNvo.value == 0) {
        Swal.fire({
            title: 'Operario incorrecto',
            text: 'Por favor, llene bien los campos.',
            icon: 'error',
            confirmButtonText: 'OK',
        })
    } else {
        const OpeNvo = new operario()
        OpeNvo.idope = idOpeNvo.value
        OpeNvo.nombre = nombreOpeNvo.value.toLocaleUpperCase()
        OpeNvo.direccion = direcOpeNvo.value.toLocaleUpperCase()
        OpeNvo.contacto = parseInt(contactoOpeNvo.value)
        OpeNvo.categoria = CATEGORIA[catOpeNvo.value]


        operarios.push(OpeNvo)
        cargarTablaOperarios(operarios)
        OperariosLSset()
        verFormNvoOpe()

        idOpeNvo.value = crearIDop()
        nombreOpeNvo.value = ""
        direcOpeNvo.value = ""
        contactoOpeNvo.value = ""
        catOpeNvo.value = ""
        Swal.fire({
            title: 'Operario ingresado correctamente',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
        })
    }


}
function verFormModifOpe(ID) {//muestra y carga datos al formulario modificar operario

    if (formModOpe.style.display == "none") {
        formModOpe.style.display = "block"
        formNvoOpe.style.display = "none"
    }
    const idoperario = document.getElementById("idOpeMod")
    const nombreOpeMod = document.getElementById("nombreOpeMod")
    const direcOpeMod = document.getElementById("direcOpeMod")
    const contOpeMod = document.getElementById("contOpeMod")
    const catOpeMod = document.getElementById("catOpeMod")

    let { nombre, direccion, contacto, categoria } = operarios.find(operario => operario.idope == ID)
    let catindex = CATEGORIA.findIndex(cat => cat == categoria)
    optCatOpe("catOpeMod")

    idoperario.value = ID
    nombreOpeMod.value = nombre
    direcOpeMod.value = direccion
    contOpeMod.value = contacto
    catOpeMod.selectedIndex = catindex + 1
}
function cerrarOpeModif() {
    formModOpe.style.display = "none"
}
function guardarModifOpe() {//guarda cambios realizados en operario
    const idOpeMod = document.getElementById("idOpeMod")
    const IDope = idOpeMod.value
    const IDreal = operarios.findIndex(operario => operario.idope == IDope)
    const nombreOpeMod = document.getElementById("nombreOpeMod")
    const direcOpeMod = document.getElementById("direcOpeMod")
    const contactoOpeMod = document.getElementById("contOpeMod")
    const catOpeMod = document.getElementById("catOpeMod")


    if (nombreOpeMod.value == "" || direcOpeMod.value == "" || contactoOpeMod.value == "" || catOpeMod.value == "") {
        Swal.fire({
            title: 'Cambio no admitido!',
            text: 'Por favor, llene bien los campos.',
            icon: 'error',
            confirmButtonText: 'OK',
        })
        verFormModifOpe(IDope)
    } else {
        const modificado = new operario()
        modificado.idope = IDope
        modificado.nombre = nombreOpeMod.value.toLocaleUpperCase()
        modificado.direccion = direcOpeMod.value.toLocaleUpperCase()
        modificado.contacto = parseInt(contactoOpeMod.value)
        modificado.categoria = CATEGORIA[catOpeMod.value]

        Swal.fire({
            showCancelButton: true,
            text: '¿Desea modificar el operario?',
            icon: 'warning',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                operarios[IDreal] = modificado
                cargarTablaOperarios(operarios)
                OperariosLSset()
                cerrarOpeModif()
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
function cargarTablaOperarios(arrOpe) {
    tabope.innerHTML = ``
    arrOpe.forEach(operario => {
        tabope.innerHTML += `<tr>
                                <td><button class="btnModOpe" id='${operario.idope}' >📝</button></td>
                                <td>${operario.idope}</td>
                                <td><strong>${operario.nombre}</strong></td>
                                <td>${operario.categoria}</td>
                                <td>${operario.direccion}</td>
                                <td>${operario.contacto}</td>
                                
                           </tr>`
    })
    let btnModOpe = document.querySelectorAll('.btnModOpe')
    btnModOpe.forEach(modOpe => {
        modOpe.addEventListener('click', () => {
            verFormModifOpe(modOpe.id)
        })
    })
}
//Cargar Datos
function OperariosLSget() {//Busca OPERARIOS en localStorage, si no encuentra los agrega haciendo FETCH a KXbd.JSON
    const opesJson = (JSON.parse(localStorage.getItem('KXoperarios')) || [])
    if (opesJson.length == 0) {
        agregarOperarios()
        OperariosLSset()
    } else {
        opesJson.forEach(operario => {
            operarios.push(operario)
        })
    }
    cargarTablaOperarios(operarios)

}
function OperariosLSset() {//Guarda OPERARIOS en localStorage
    const opesJson = JSON.stringify(operarios)
    localStorage.setItem('KXoperarios', opesJson)
}
function agregarOperarios() {//Carga OPERARIOS con Fetch
    fetch('js/KXbd.JSON')
        .then((resp) => resp.json())
        .then((data) => {
            data.operarios.forEach(operario => {
                operarios.push(operario)
            });
        })
}

//Clase
class operario {
    constructor(id, nombre, direccion, contacto, idcat) {
        this.idope = id
        this.nombre = nombre
        this.direccion = direccion
        this.contacto = contacto
        this.categoria = CATEGORIA[idcat]
    }
}

//inicio
OperariosLSget()
