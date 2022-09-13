
loader()
function loader() {

    cardMonitor.innerHTML = `<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <div class="aviso">
        <div class="avtitulo">
            <h2>Cargando datos</h2>
        </div>
        <div class="avimg">
            <img src="logo.gif">
            <h3 id="comentCarga">Buscando y recuperando datos</h3>
            <progress id="progCarga" class="progress" max="1400" value="0"></progress>
           
        </div>
        <div class="avpie"></div>
    </div>`

    let progCarga = document.getElementById("progCarga")
    let comentCarga = document.getElementById("comentCarga")
    progCarga.value = 0

    setInterval(() => {
        progCarga.value++
        if (progCarga.value > 1200) {
            comentCarga.innerHTML = "Finalizando..."
        } else if (progCarga.value > 1000) {
            comentCarga.innerHTML = "Cargando Lineas..."
        } else if (progCarga.value > 800) {
            comentCarga.innerHTML = "Cargando Ordenes..."
        } else if (progCarga.value > 600) {
            comentCarga.innerHTML = "Cargando Operarios..."
        } else if (progCarga.value > 400) {
            comentCarga.innerHTML = "Cargando Clientes..."
        } else if (progCarga.value > 200) {
            comentCarga.innerHTML = "Cargando Productos..."
        }
    }, 5);
    setTimeout(() => {
        clearInterval
        monitorLineas()
        Swal.fire({
            title: '⚗️ KLARIX ',
            text: 'Gestion de ambientes productivos',
            icon: 'success',
            timer: 3000,
            showConfirmButton: false,
        })
    }, 9000);

}
function monitorLineas() {
    cardMonitor.innerHTML = ``
    lineas.forEach(linea => {
        let orden = ordenes.find(ord => ord.idorden == linea.ordenactiva)
        let producto = productos.find(producto => producto.idpr == orden.idproducto)
        let div = document.createElement('div')
        div.className = 'card'
        div.title = `📑 ${linea.ordenactiva} - ${producto.nombre} - ${producto.presentacion}`
        if (linea.ordenes.length < 1) {
            div.innerHTML = `<div class="cardtitulo">🏭 ${linea.nombre}</div>
                <div class="cardot">📑 Sin ordenes</div>
                <div class="cardprod">Esperando...</div>
                <div class="cardpresen"> </div>
                <div class="cardestadoicono"> ⏱️ </div>
                <div class="cardestado">Esperando por ordenes</div>
                <div class="cardUnidades"><progress class="progress" value="0"></progress></div>
                <div class="cardpie">
                <a href="#">+info</a>
                </div>
            </div>
`
        } else {

            div.innerHTML = `<div class="cardtitulo" title="🏭 ${linea.idlinea} - ${linea.nombre} | ${linea.descripcion}" >🏭 ${linea.nombre}</div>
                <div class="cardot"><p class="cardottext"> 📑 ${linea.ordenactiva}</p><div class="cardprod">${producto.nombre}</div></div>
                <div class="cardpresen" title="${producto.nombre} - ${producto.presentacion} | ${producto.descripcion}">${producto.presentacion} - ${producto.descripcion}</div>
                <div class="cardestadoicono"  title="${EmojiEstado(orden.estado)} ${orden.estado} | progreso: ${parseInt((orden.unidadesproducidas / orden.unidadespedidas) * 100)}%">${EmojiEstado(orden.estado)}</div>
                <div class="cardestado"  title="${orden.estado} | progreso: ${parseInt((orden.unidadesproducidas / orden.unidadespedidas) * 100)}%">${orden.estado}</div>
                <div class="cardUnidades" title="${orden.estado} | progreso: ${parseInt((orden.unidadesproducidas / orden.unidadespedidas) * 100)}%" >${orden.unidadesproducidas}/${orden.unidadespedidas} | ${parseInt((orden.unidadesproducidas / orden.unidadespedidas) * 100)}% <progress class="progress" value="${parseInt((orden.unidadesproducidas / orden.unidadespedidas * 100))}" max="100"></progress></div>
                <div class="cardpie">
                <a href="#">+info</a>
                </div>
            </div>
`            }
        cardMonitor.append(div)
    })
}
function EmojiEstado(estado) {
    switch (estado) {
        case "NO ASIGNADO":
            return "✖️"
            break;
        case "ESPERA":
            return "⏳"
            break;
        case "PREPARACION":
            return "⌛"
            break;
        case "PRODUCIENDO":
            return "▶️"
            break;
        case "DETENIDO":
            return "⏸️"
            break;
        case "FINALIZANDO":
            return "⏭️"
            break;
        case "TERMINADO":
            return "✅"
            break;
        case "DESHABILITADO":
            return "🚫"
            break;
        default:
            return "🧉"
    }
}
function barraPrincipal() {
    //buttons de la barra de navegacion
    let btnMonitor = document.getElementById("VerMonitor")
    btnMonitor.addEventListener('click', VerMonitor)
    let btnAdmin = document.getElementById("VerAdmin")
    btnAdmin.addEventListener('click', VerAdmin)
    let btnAudit = document.getElementById("VerAudit")
    btnAudit.addEventListener('click', VerAudit)
}
barraPrincipal()

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

function arraytotal() {
    const arraytotal = { "productos": productos, "clientes": clientes, "empleados": empleados, "ordenes": ordenes, "lineas": lineas }
    return console.log(JSON.stringify(arraytotal))
}