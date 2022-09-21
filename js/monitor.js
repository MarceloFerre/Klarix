
loader(10000)
function loader(timer) {
    let aviso = document.getElementById("aviso")
    aviso.innerHTML = `
    <div class="avisoemergente">
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
        aviso.style.display = "none"

        monitorLineas()
        Swal.fire({
            title: '⚗️ KLARIX ',
            text: 'Gestion de ambientes productivos',
            icon: 'success',
            timer: 3000,
            showConfirmButton: false,
        })
    }, timer);

}
function monitorLineas() {
    cardMonitor.innerHTML = ``
    lineas.forEach(linea => {
        let div = document.createElement('div')
        div.className = 'card'
        if (linea.ordenes.length > 0) {
            let orden = ordenes.find(ord => ord.idorden == linea.ordenactiva)
            let producto = productos.find(producto => producto.idpr == orden.idproducto)

            div.title = `📑 ${linea.ordenactiva} - ${producto.nombre} - ${producto.presentacion}`

            div.innerHTML = `<div class="cardtitulo" title="🏭 ${linea.idlinea} - ${linea.nombre} | ${linea.descripcion}" >🏭 ${linea.nombre}</div>
            <div class="cardot"><p class="cardottext"> 📑 ${linea.ordenactiva}</p><div class="cardprod">${producto.nombre}</div></div>
            <div class="cardpresen" title="${producto.nombre} - ${producto.presentacion} | ${producto.descripcion}">${producto.presentacion} - ${producto.descripcion}</div>
            <div class="cardestadoicono"  title="${EmojiEstado(orden.estado)} ${orden.estado} | progreso: ${parseInt((orden.unidadesproducidas / orden.unidadespedidas) * 100)}%">${EmojiEstado(orden.estado)}</div>
            <div class="cardestado"  title="${orden.estado} | progreso: ${parseInt((orden.unidadesproducidas / orden.unidadespedidas) * 100)}%">${orden.estado}</div>
            <div class="cardUnidades" title="${orden.estado} | progreso: ${parseInt((orden.unidadesproducidas / orden.unidadespedidas) * 100)}%" >${orden.unidadesproducidas}/${orden.unidadespedidas} | ${parseInt((orden.unidadesproducidas / orden.unidadespedidas) * 100)}% <progress class="progress" value="${parseInt((orden.unidadesproducidas / orden.unidadespedidas * 100))}" max="100"></progress></div>
            <div class="cardpie">
            <button class="masinfo"id="${linea.idlinea}">+info</button>
            </div>
        </div>`

        } else {
            div.innerHTML = `<div class="cardtitulo">🏭 ${linea.nombre}</div>
            <div class="cardot"><p class="cardottext"> 📑 Sin ordenes</p><div class="cardprod">Sin Ordenes ...</div></div>
            <div class="cardpresen">Esperando ... </div>
            <div class="cardestadoicono"> ${EmojiEstado("DESHABILITADO")} </div>
            <div class="cardestado">DESHABILITADO</div>
            <div class="cardUnidades"><small><b>+info</b> para asignar 🔻</small><progress class="progress" value="0"></progress></div>
            <div class="cardpie">
            <button onclick="masinfoasign()" title="Asignar Ordenes 📥">+info</button>
            </div>
        </div>`

        }
        cardMonitor.append(div)
        const btnsmasinfo = document.querySelectorAll('.masinfo')
        btnsmasinfo.forEach(btn => {
            btn.addEventListener('click', () => {
                VerAdmin()
                cargarLinea(btn.id)
                cargarBtnsLineas(lineas)
                document.getElementById("Lineas").style.display = "block"
            })
        })
    })
}
function EmojiEstado(estado) {
    switch (estado) {
        case "NO ASIGNADO":
            return "❎"
            break;
        case "ESPERA":
            return "💬"
            break;
        case "PREPARACION":
            return "⏳"
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
            return "✖️"
            break;
        default:
            return "🧉"
    }
}
function masinfoasign() {

    VerAdmin()

    cargarTabOTasignar(ordenes)
    formsOTsels("nvaOtProd", "nvaOtCli")
    document.getElementById("Ordenes").style.display = "block"
    document.getElementById("OTasign").style.display = "block"
    Swal.fire({
        title: `Asignar Ordenes`,
        html: `<div class="asignarorden"><p>Presione <button>➕📄 Crear Orden</button> para crear una orden.</p><p>Presione <button =class="asOtBtn">📝</button> para modificar una orden.</p><p>Presione <button =class="asOtBtn">📥</button> para asignar una orden a una sala.<p></div>`,
        icon: 'info',
        showConfirmButton: true,
    })
}

//elementos para mostrar los 3 modulos
const Monitor = document.getElementById("Monitor")
const Admin = document.getElementById("Admin")
const Audit = document.getElementById("Audit")

Monitor.style.display = "block"
Admin.style.display = "none"
Audit.style.display = "none"

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
function VerMonitor() {//Ver MONITOR
    if (Monitor.style.display == "none") {
        Monitor.style.display = "block"
        Admin.style.display = "none"
        Audit.style.display = "none"
        monitorLineas()
    }
    monitorLineas()

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
    const arraytotal = { "productos": productos, "clientes": clientes, "operarios": operarios, "ordenes": ordenes, "lineas": lineas }
    return console.log(JSON.stringify(arraytotal))
}