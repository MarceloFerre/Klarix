//PRODUCTOS



//array PRODUCTOS
const productos = []

//Tabla PRODUCTOS
const tabprod = document.getElementById("tabprod")

// listeners
let btnProd = document.getElementById("verProductos").addEventListener('click', verProd)
let inptFiltroProd = document.getElementById("filtroProd").addEventListener('keyup', filtroProd)
let btnVerFormNvoProd = document.getElementById("verFormNvoProd").addEventListener('click', verFormNvoProd)
let btnOcultarFormNvoProd = document.getElementById("cerrarNvoProd").addEventListener('click', verFormNvoProd)
let btnIngresarNvoProd = document.getElementById("ingresarNvoProd").addEventListener('click', ingresarNvoProd)
let cerrarModProd = document.getElementById("cerrarModProd").addEventListener('click', ocultarModProd)
let btnGuardarModProd = document.getElementById("guardarCambiosProd").addEventListener('click', guardarProdModif)

//oculta formularios al iniciar
const prods = document.getElementById("Productos")
prods.style.display = "none"
const formNvoProd = document.getElementById("formNuevoProd")
formNvoProd.style.display = "none"
const formModProd = document.getElementById("formModifProd")
formModProd.style.display = "none"

//Funciones Formularios
function crearIDprod() {
    let id = `PR${productos.length}`
    return id
}
function verProd() {//Boton PRODUCTOS
    prods.style.display == "none" ? prods.style.display = "block" : prods.style.display = "none"
}
function verFormNvoProd() {//Boton NUEVO PRODUCTO
    if (formNvoProd.style.display === "none") {
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
    if (formModProd.style.display === "none") {
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
function cargarTablaProductos(arrProd) {//TABLA PRODUCTOS

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

//Carga de Datos
function ProductosLSget() {//Busca PRODUCTOS en localStorage, si no encuentra los agrega haciendo FETCH a KXbd.JSON
    const prodsJson = (JSON.parse(localStorage.getItem('KXproductos')) || null)
    if (prodsJson) {
        prodsJson.forEach(producto => {
            productos.push(producto)
        })
        ProductosLSset()
        cargarTablaProductos(productos)
    } else {
        fetchProductos()
    }
}
function ProductosLSset() {//Guarda PRODUCTOS en localStorage
    const prodsJson = JSON.stringify(productos)
    localStorage.setItem('KXproductos', prodsJson)
}
function fetchProductos() {//Carga PRODUCTOS con fetch
    fetch('js/KXbd.JSON')
        .then((resp) => resp.json())
        .then((data) => {
            data.productos.forEach(producto => {
                productos.push(producto)
            });
            cargarTablaProductos(productos)
            ProductosLSset()
        })
}
//Clase XD
class producto {
    constructor(id, nombre, presentacion, descripcion) {
        this.idpr = id
        this.nombre = nombre
        this.presentacion = presentacion
        this.descripcion = descripcion
    }
}
//inicio
ProductosLSget()
