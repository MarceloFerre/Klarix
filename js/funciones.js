//CREACION DE IDs
function crearIDprod() {
    let id = `PR${productos.length}`
    return id
}
function crearIDcli() {
    let id = `CL${clientes.length}`
    return id
}
function crearIDemp() {
    let id = `EMP${empleados.length}`
    return id
}
function crearIDlinea() {
    let id = `LN${lineas.length}`
    return id
}
function crearIDorden() {
    let id = `ORD${ordenes.length}`
    return id
}

//FUNCIONES CONSOLA ARRAY PRODUCTOS
/*
function nuevoProd() {
    let id = crearIDprod()
    let nombre = prompt("Ingrese el nombre del producto").toLocaleUpperCase()
    let presentacion = prompt("Ingrese datos de la presentación").toLocaleUpperCase()
    let descripcion = prompt("Ingrese una descripcion del producto").toLocaleUpperCase()
    productos.push(new producto(id, nombre, presentacion, descripcion))
    console.log("Nuevo producto agregado")
    console.table(productos[productos.length - 1])
}*/
function devolverProd(id) {
    console.table(productos[id])
    return productos[id]
}
function modifProd(idpr) {
    console.log("Producto original")
    const original = productos.find((producto) => producto.idpr === idpr)
    console.table(original)

    let nombre = prompt("Modificar nombre:", original.nombre).toLocaleUpperCase()
    let presentacion = prompt("Modificar presentación:", original.presentacion).toLocaleUpperCase()
    let descripcion = prompt("Modificar descripcion:", original.descripcion).toLocaleUpperCase()
    let modificado = new producto(original.idpr, nombre, presentacion, descripcion)
    console.log("Producto modificado")
    console.table(modificado)

    const indice = productos.indexOf(original)
    console.log(indice)
    if (confirm("Desea guardar cambios?")) {
        productos[indice].nombre = modificado.nombre
        productos[indice].presentacion = modificado.presentacion
        productos[indice].descripcion = modificado.descripcion
    }
}
function buscarProdNombre() {
    const criterio = prompt("ingrese criterio de busqueda").toUpperCase()
    const resultado = productos.filter((producto) => producto.nombre.includes(criterio))
    console.table(resultado)

}
function menuProd() {
    let control = true
    while (control) {
        let opcion = parseInt(prompt("PRODUCTOS\n1) Ver todos los productos\n2) Ingresar producto nuevo\n3) Modificar producto\n4)Buscar producto"))
        console.log(opcion)
        switch (opcion) {
            case 1: {
                console.table(productos)
                break;
            }
            case 2: {
                nuevoProd()
                break;
            }
            case 3: {
                console.table(productos)
                modifProd(prompt("Ingrese el ID del Producto").toLocaleUpperCase())
                break;
            }
            case 4: {
                buscarProdNombre()
                break;
            }
            default: {
                console.log("Opcion incorrecta")
            }

        }    control = confirm("Seguir trabajando con productos?")
    }
}
//FUNCIONES ARRAY CLIENTES
//FUNCIONES ARRAY EMPLEADOS

//FUNCIONES ARRAY SALAS

//FUNCIONES ORDENES

//MENU PRINCIPAL
function menu() {
    let control = true
    while (control) {
        let opcion = parseInt(prompt("MENU PRINCIPAL\n1) PRODUCTOS\n2) CLIENTES \n3) EMPLEADOS\n4)SALAS"))
        switch (opcion) {
            case 1: { menuProd() }
            case 2: { }
            case 3: { }
            case 4: { }
        }
        control = confirm("VOLVER AL MENU PRINCIPAL?")

    }

}


