class producto {
    constructor(id, nombre, presentacion, descripcion) {

        this.idpr = id
        this.nombre = nombre
        this.presentacion = presentacion
        this.descripcion = descripcion
    }
}

class cliente {
    constructor(id, nombre, direccion, mail, telefono) {
        this.idcli = id
        this.nombre = nombre
        this.direccion = direccion
        this.mail = mail
        this.telefono = telefono
    }
}

class empleado {
    constructor(id, nombre, direccion, contacto, idcat) {
        this.idemp = id
        this.nombre = nombre
        this.direccion = direccion
        this.contacto = contacto
        this.categoria = CATEGORIA[idcat]
    }

}

class linea {
    constructor(id, nombre, descripcion) {
        this.idlinea = id
        this.nombre = nombre
        this.descripcion = descripcion
        this.empleados = []
        this.ordenes = []
        this.ordenactiva = ordenes[0]
    }
}
class orden {
    constructor(idorden, idcliente, idproducto, unidades) {
        this.idorden = idorden
        this.idcliente = idcliente
        this.idproducto = idproducto
        this.unidadespedidas = unidades
        this.unidadesproducidas = 0
        this.unidadesfin = 0
        this.estado = "NO ASIGNADO"
    }
}
