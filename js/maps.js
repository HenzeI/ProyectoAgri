import 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';

function generarMapGeo(mapa, lat, lon) {

    const map = L.map(mapa).setView([51.505, -0.09], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map)
    
    map.setView([lat, lon], 15)

    L.marker([lat, lon])
        .addTo(map)
        .bindPopup("📍 Estás aquí")
        .openPopup()
}

async function obtenerDatosMeteo(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,apparent_temperature,visibility,pressure_msl,uv_index,precipitation,cloudcover&daily=temperature_2m_max,temperature_2m_min&timezone=auto`

    try {
        const respuesta = await fetch(url);
        return await respuesta.json();
    } catch (error) {
        throw new Error("Error al obtener los datos meteorologicos" + error.message);
    }
}

export { generarMapGeo, obtenerDatosMeteo }