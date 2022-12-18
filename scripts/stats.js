import { renderTabla } from "./module/funciones.js"
const tablaUno = document.getElementById("tabla-uno")
const tablaDos = document.getElementById("tabla-dos")
const tablaTres = document.getElementById("tabla-tres")
let estructura = {
    porcentajeMasAlto:{nombre:'', porcentaje: 0},
    porcentajeMasBajo:{nombre:'', porcentaje: null},
    masCapacidad:{nombre:'', capacity: 0},
    upcoming:{},
    past: {}
}

fetch('https://amazing-events.onrender.com/api/events')
    .then( res => res.json() )
    .then( ( { events, currentDate } ) => {
        const fn = (estadisticas, evento) => {

            let propiedad = evento.date > currentDate ? 'estimate' : 'assistance'
            let porcentaje = Number(( evento[propiedad] / (evento.capacity / 100)).toFixed(2))
            let revenues = evento.price * evento[propiedad]
            let categoria = evento.category
            let fecha = evento.date > currentDate ? 'upcoming' : 'past'
        
            if(!estadisticas[fecha][categoria]) estadisticas[fecha][categoria] =  { revenues,porcentaje, count:1}
            else{
                estadisticas[fecha][categoria].revenues += revenues
                estadisticas[fecha][categoria].porcentaje += porcentaje
                estadisticas[fecha][categoria].count += 1
            }
            if(estadisticas.masCapacidad.capacity < evento.capacity){
                estadisticas.masCapacidad.capacity = evento.capacity
                estadisticas.masCapacidad.nombre = evento.name
            }
            if(estadisticas.porcentajeMasAlto.porcentaje < porcentaje){
                estadisticas.porcentajeMasAlto.porcentaje = porcentaje
                estadisticas.porcentajeMasAlto.nombre = evento.name
            }
            if(estadisticas.porcentajeMasBajo.porcentaje > porcentaje || !estadisticas.porcentajeMasBajo.porcentaje ){
                estadisticas.porcentajeMasBajo.porcentaje = porcentaje
                estadisticas.porcentajeMasBajo.nombre = evento.name
            }
        
            return estadisticas
        }

        let stats = events.reduce( fn , estructura)


        tablaUno.innerHTML += `
            <tr>
                <td>${stats.porcentajeMasAlto.nombre} %${stats.porcentajeMasAlto.porcentaje}</td>
                <td>${stats.porcentajeMasBajo.nombre} %${stats.porcentajeMasBajo.porcentaje}</td>
                <td>${stats.masCapacidad.nombre} ${stats.masCapacidad.capacity}</td>
            </tr>
        `
        renderTabla(stats.upcoming, tablaDos)
        renderTabla(stats.past, tablaTres)

    } )
    .catch(err=>console.log(err))




