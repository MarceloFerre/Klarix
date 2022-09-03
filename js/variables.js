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
//HARDCODE
function agregarProductos() {
    productos.push(new producto("PR0", "KETOFEN 100", "10 COMPRIMIDOS", "KETOPROFENO 100MG"))
    productos.push(new producto("PR1", "KETOFEN 100", "20 COMPRIMIDOS", "KETOPROFENO 100MG"))
    productos.push(new producto("PR2", "NOVEMINA FUERTE", "10 COMPRIMIDOS", "DIPIRONA 500MG"))
    productos.push(new producto("PR3", "NOVEMINA FUERTE", "20 COMPRIMIDOS", "DIPIRONA 500MG"))
    productos.push(new producto("PR4", "IBUPIRAC 600", "10 COMPRIMIDOS", "IBUPROFENO 600MG"))
    productos.push(new producto("PR5", "IBUPIRAC 600", "20 COMPRIMIDOS", "IBUPROFENO 600MG"))
    productos.push(new producto("PR6", "IBUPIRAC 400", "10 COMPRIMIDOS", "IBUPROFENO 400MG"))
}
function agregarEmpleados() {
    empleados.push(new empleado(crearIDop(), "JUAN PEREZ", "CAFE 1223", 091999888, 0))
    empleados.push(new empleado(crearIDop(), "JOHN PEREZ", "CAFE 1226", 091223344, 0))
    empleados.push(new empleado(crearIDop(), "MARIO PEREZ", "CHOCOLATE 741", 099888777, 0))
    empleados.push(new empleado(crearIDop(), "PEDRO RODRIGUEZ", "MATEAMARGO 8787", 095856974, 0))
    empleados.push(new empleado(crearIDop(), "RICARDO RICARDE", "CHOCOLATE 1626", 22885577, 0))
    empleados.push(new empleado(crearIDop(), "CARLOS PEREZ", "CAFE 1223", 091999888, 0))
    empleados.push(new empleado(crearIDop(), "ALBERTO BELLO", "TENEGRO 333", 091989898, 1))
    empleados.push(new empleado(crearIDop(), "DANILO FERNANDEZ", "TENEGRO 7788", 22886633, 1))
    empleados.push(new empleado(crearIDop(), "SEBASTIAN ALTEZ", "TERERE S/N", 22929299, 1))
    empleados.push(new empleado(crearIDop(), "DANIEL VIERA", "CERVEZA 987", 091125896, 1))
    empleados.push(new empleado(crearIDop(), "JARRY GONZALES", "CHOCOLATE 658", 24092178, 1))
    empleados.push(new empleado(crearIDop(), "JOSE MANSINO", "JUGO 357", 091316797, 2))
    empleados.push(new empleado(crearIDop(), "CLARISA CURIEL", "JUGO 369", 091666066, 3))
    empleados.push(new empleado(crearIDop(), "CINTIA CORDEL", "JUGO 355", 091224477, 2))
    empleados.push(new empleado(crearIDop(), "LORENA NOGUEIRA", "MATEAMARGO 284", 096483726, 2))
}
function agregarClientes() {
    clientes.push(new cliente("CL0", "FARMACIA ESQUINA", "MALDONADO 2233", "farmaciaesquina@farmacias.uy", 25045377))
    clientes.push(new cliente("CL1", "SANATORIO ITALIANO", "AV.LIBERTAD S/N", "administracion@hospitaliano.com", 24096687))
    clientes.push(new cliente("CL2", "POLICLINICO ALLENDE", "CERVEZA 3698", "allende@coliclinico.uy", 25876982))
    clientes.push(new cliente("CL3", "DISTRIBUIDORA PHARMAPHIA", "", "pharmaphia@repartos.uy", 2504553377))
}
function agregarLineas() {
    lineas.push(new linea("LN0", "MANUAL 1", "ENVASADO Y ACONDICIONAMIENTO MANUAL"))
    lineas.push(new linea("LN1", "MANUAL 2", "ACONDICIONAMIENTO MANUAL"))
    lineas.push(new linea("LN2", "AUTOMATICA 1", "ENVASADORA AUTOMATICA MEDIANA"))
    lineas.push(new linea("LN3", "AUTOMATICA 2", "ENVASADORA AUTOMATICA GRANDE"))
}
function agregarOrdenes() {
    ordenes.push(new orden(crearIDorden(), "CL0", "PR0", 750))
    ordenes.push(new orden(crearIDorden(), "CL1", "PR1", 190))
    ordenes.push(new orden(crearIDorden(), "CL2", "PR2", 7500))
    ordenes.push(new orden(crearIDorden(), "CL3", "PR3", 20000))
    ordenes.push(new orden(crearIDorden(), "CL0", "PR4", 15700))
    ordenes.push(new orden(crearIDorden(), "CL1", "PR5", 750))
    ordenes.push(new orden(crearIDorden(), "CL2", "PR6", 200))
    ordenes.push(new orden(crearIDorden(), "CL3", "PR0", 11))
    ordenes.push(new orden(crearIDorden(), "CL0", "PR1", 450))
    ordenes.push(new orden(crearIDorden(), "CL1", "PR2", 2000))
    ordenes.push(new orden(crearIDorden(), "CL2", "PR3", 55000))
    ordenes.push(new orden(crearIDorden(), "CL3", "PR4", 360))
    ordenes.push(new orden(crearIDorden(), "CL0", "PR5", 500))
    ordenes.push(new orden(crearIDorden(), "CL1", "PR6", 500))
    ordenes.push(new orden(crearIDorden(), "CL2", "PR0", 750))

}
function incrustarDatos() {
    //agregarProductos()
    ProductosLSget()
    //agregarClientes()
    ClientesLSget()
    //agregarEmpleados()
    EmpleadosLSget()
    //agregarOrdenes()
    OrdenesLSget()
    //agregarLineas()
    LineasLSget()
}
incrustarDatos()

//FUNCIONES CON JSON Y LOCALSTORAGE
function ProductosLSset() {//Guarda PRODUCTOS en localStorage
    const prodsJson = JSON.stringify(productos)
    localStorage.setItem('KXproductos', prodsJson)
}
function ProductosLSget() {//Busca PRODUCTOS en localStorage, si no encuentra los agrega del hardcode
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
function ClientesLSget() {//busca CLIENTES en localStorage, si no encuentra los agrega del hardcode
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
function EmpleadosLSget() {//Busca EMPLEADOS en localStorage, si no encuentra los agrega del hardcode
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
function OrdenesLSget() {//Busca ORDENES en localStorage, si no encuentra los agrega del hardcode
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
function LineasLSget() {//Busca LINEAS DE PROD en localStorage, si no encuentra los agrega del hardcode
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
