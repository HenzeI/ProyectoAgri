// Librerias
// FireBase
import { inicioSesion, registrarse, cambiarContrasena } from "./auth.js"
// Leaflet
import { generarMapGeo, obtenerDatosMeteo } from "./maps.js"



document.addEventListener("DOMContentLoaded", inicio)

function inicio() {

    // DOM'S
    let indexDOM = document.getElementById("index")
    let dashboardDOM = document.getElementById("dashboard")

    // FireBase
    let campoEmail = document.getElementById("campoEmail")
    let campoContrasena = document.getElementById("campoPassword")

    let formulario = document.getElementById("formulario")
    let registro = document.getElementById("registrarse")
    let cambiarContrasena = document.getElementById("cambiarContrasena")

    if (formulario) {
        formulario.addEventListener("submit", async (e) => {

            if (localStorage.getItem("usuario"))
                localStorage.removeItem("usuario")
    
            try { 
                let usuario = await inicioSesion(campoEmail.value, campoContrasena.value)
    
                localStorage.setItem("usuario", usuario)
    
                console.log(usuario)
            } catch (error) {
                console.log(error)
            }
        })
    }

    if (registro) {
        registro.addEventListener("click", async (e) => {

            if (localStorage.getItem("usuario"))
                localStorage.removeItem("usuario")
    
            try { 
                let usuario = await registrarse(campoEmail.value, campoContrasena.value)
    
                localStorage.setItem("usuario", usuario)
    
                console.log(usuario)
            } catch (error) {
                console.log(error)
            }
        })
    }

    


    if (dashboardDOM) {
        let bienvenida = document.createElement("p")
        bienvenida.textContent = `Bienvenido ${localStorage.getItem("usuario")}`
        dashboardDOM.appendChild(bienvenida)

        // Leaflet y OpenMeteo
        let mapa = document.createElement("div")
        mapa.id = "map"
        dashboardDOM.appendChild(mapa)
    
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                    
                    generarMapGeo(mapa, position.coords.latitude, position.coords.longitude)
    
                    console.log(await obtenerDatosMeteo(position.coords.latitude, position.coords.longitude));
                }
            )
        } else {
            alert("Tu navegador no soporta geolocalización.")
        }
    }


    

    



/*     if (document.getElementById("dashboard")) {
        document.getElementById("dashboard").textContent = localStorage.getItem(sessionStorage.key(0))
    }

    let campoEmail = document.getElementById("campoEmail")
    let campoContrasena = document.getElementById("campoPassword")

    document.getElementById("formulario").addEventListener("submit", (e) => {
        try { 
            let usuario = inicioSesion(campoEmail.value, campoContrasena.value)

            localStorage.setItem(usuario, usuario)

            console.log(usuario)
        } catch (error) {
            console.log(error)
        }
    })

    document.getElementById("registrarse").addEventListener("click", (e) => {
        formRegistrarse(e)
    })

    document.getElementById("cambiarContrasena").addEventListener("click", (e) => {
        formCambiarContrasena(e)
    }) */

}

/* function formRegistrarse(e) {
    document.getElementById("tipoAutenticacion").textContent = "Registrarse"

    try { 
        let usuario = registrarse(campoEmail.value, campoContrasena.value)
        e.preventDefault()
        console.log(usuario)
    } catch (error) {
        console.log(error)
    }
}

function formCambiarContrasena(e) {
    try { 
        let usuario = cambiarContrasena(campoEmail.value)
        e.preventDefault()
        console.log(usuario)
    } catch (error) {
        console.log(error)
    }
} */
