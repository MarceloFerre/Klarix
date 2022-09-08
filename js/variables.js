//CONSTANTES

const PRIORIDAD = ["BAJA", "MEDIA", "ALTA", "URGENTE"]
const ESTADO = ["NO ASIGNADO", "ESPERA", "PREPARACION", "PRODUCIENDO", "DETENIDO", "FINALIZANDO", "TERMINADO", "DESHABILITADO"]
const CATEGORIA = ["OP.COMUN", "OP.ESPECIALIZADO", "JEFE DE LINEA", "CHECKER QC", "ADMINISTRATIVO", "MANTENIMIENTO"]

//DECLARACION DE ARREGLOS
const productos = []
const clientes = []
const empleados = []
const lineas = []
const ordenes = []

const monitores = [
    {
        titulo: 'Manual 1',
        ot: 'OT14',
        prod: 'KETOFEN 100MG',
        present: '10 COMPRIMIDOS',
        icono: '▶️',
        estado: 'Produciendo',
        undspedidas: 100,
        undsprod: 50,
        progreso: 0.50,


    },
    {
        titulo: 'Manual 2',
        ot: 'OT17',
        prod: 'NOVEMINA FUERTE',
        present: '20 COMPRIMIDOS',
        icono: '▶️',
        estado: 'Produciendo',
        undspedidas: 200,
        undsprod: 140,
        progreso: 0.7,
    },
]
//CREACION DE IDs
function crearIDprod() {
    let id = `PR${productos.length}`
    return id
}
function crearIDcli() {
    let id = `CL${clientes.length}`
    return id
}
function crearIDop() {
    let id = `OP${empleados.length}`
    return id
}
function crearIDlinea() {
    let id = `LN${lineas.length}`
    return id
}
function crearIDorden() {
    let id = `OT${ordenes.length}`
    return id
}
//Carga de datos con Fetch

function agregarProductos() {
    fetch('js/KXbd.JSON')
        .then((resp) => resp.json())
        .then((data) => {
            data.productos.forEach(producto => {
                productos.push(producto)
            });
        })

}
function agregarEmpleados() {
    fetch('js/KXbd.JSON')
        .then((resp) => resp.json())
        .then((data) => {
            data.empleados.forEach(empleado => {
                empleados.push(empleado)
            });
        })
}
function agregarClientes() {
    fetch('js/KXbd.JSON')
        .then((resp) => resp.json())
        .then((data) => {
            data.clientes.forEach(cliente => {
                clientes.push(cliente)
            });

        })
}
function agregarLineas() {
    fetch('js/KXbd.JSON')
        .then((resp) => resp.json())
        .then((data) => {
            data.lineas.forEach(linea => {
                lineas.push(linea)
            });

        })
}
function agregarOrdenes() {
    fetch('js/KXbd.JSON')
        .then((resp) => resp.json())
        .then((data) => {
            data.ordenes.forEach(orden => {
                ordenes.push(orden)
            });

        })
}
function Iniciar() {

    ProductosLSget()
    ClientesLSget()
    EmpleadosLSget()
    OrdenesLSget()
    LineasLSget()
}
Iniciar()

//FUNCIONES CON JSON Y LOCALSTORAGE
function ProductosLSset() {//Guarda PRODUCTOS en localStorage
    const prodsJson = JSON.stringify(productos)
    localStorage.setItem('KXproductos', prodsJson)
}
function ProductosLSget() {//Busca PRODUCTOS en localStorage, si no encuentra los agrega haciendo FETCH a KXbd.JSON
    const prodsJson = (JSON.parse(localStorage.getItem('KXproductos')) || [])
    if (prodsJson.length == 0) {
        agregarProductos()
        ProductosLSset()
    } else {
        prodsJson.forEach(producto => {
            productos.push(producto)
        })
    }
}
function ClientesLSset() {//Guarda CLIENTES en localStorage
    const clisJson = JSON.stringify(clientes)
    localStorage.setItem('KXclientes', clisJson)
}
function ClientesLSget() {//busca CLIENTES en localStorage, si no encuentra los agrega haciendo FETCH a KXbd.JSON
    const clisJson = (JSON.parse(localStorage.getItem('KXclientes')) || [])
    if (clisJson.length == 0) {
        agregarClientes()
        ClientesLSset()
    } else {
        clisJson.forEach(cliente => {
            clientes.push(cliente)
        })
    }
}
function EmpleadosLSset() {//Guarda EMPLEADOS en localStorage
    const empsJson = JSON.stringify(empleados)
    localStorage.setItem('KXempleados', empsJson)
}
function EmpleadosLSget() {//Busca EMPLEADOS en localStorage, si no encuentra los agrega haciendo FETCH a KXbd.JSON
    const empsJson = (JSON.parse(localStorage.getItem('KXempleados')) || [])
    if (empsJson.length == 0) {
        agregarEmpleados()
        EmpleadosLSset()
    } else {
        empsJson.forEach(empleado => {
            empleados.push(empleado)
        })
    }
}
function OrdenesLSset() {//Guarda ORDENES en localStorage
    const otsJson = JSON.stringify(ordenes)
    localStorage.setItem('KXordenes', otsJson)
}
function OrdenesLSget() {//Busca ORDENES en localStorage, si no encuentra los agrega haciendo FETCH a KXbd.JSON
    const otsJson = (JSON.parse(localStorage.getItem('KXordenes')) || [])
    if (otsJson.length == 0) {
        agregarOrdenes()
        OrdenesLSset()
    } else {
        otsJson.forEach(orden => {
            ordenes.push(orden)
        })
    }
}
function LineasLSset() {//Guarda LINEAS DE PROD en localStorage
    const lnsJson = JSON.stringify(lineas)
    localStorage.setItem('KXlineas', lnsJson)
}
function LineasLSget() {//Busca LINEAS DE PROD en localStorage, si no encuentra los agrega haciendo FETCH a KXbd.JSON
    const lnsJson = (JSON.parse(localStorage.getItem('KXlineas')) || [])
    if (lnsJson.length == 0) {
        agregarLineas()
        LineasLSset()
    } else {
        lnsJson.forEach(linea => {
            lineas.push(linea)
        })
    }
}

