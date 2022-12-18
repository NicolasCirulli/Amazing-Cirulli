import { render, crearCards, crearCheckBoxes, filtrar } from './module/funciones.js'
const main = document.getElementById('main-js')
const search = document.getElementById('search-js')
const checkboxes = document.getElementById('checkboxes-js')
let eventos;
fetch('https://amazing-events.onrender.com/api/events')
    .then( res => res.json() )
    .then( ( { events, currentDate} ) => {
        eventos = events.filter( event => event.date < currentDate )
        render( crearCheckBoxes( new Set( eventos.map( event => event.category) ) ), checkboxes)
        render( crearCards( eventos ) , main )
    } )
    .catch(err=>console.log(err))


search.addEventListener( 'input', () => {
    let filtrados = filtrar( eventos, search.value )
    filtrados.length > 0 
        ? render( crearCards( filtrados ) , main )
        : main.innerHTML = `<h3 class="text-white text-center"> There are no events matching your search </h3>`
})
checkboxes.addEventListener( 'change', () => {
    let filtrados = filtrar( eventos, search.value )
    filtrados.length > 0 
        ? render( crearCards( filtrados ) , main )
        : main.innerHTML = `<h3 class="text-white text-center"> There are no events matching your search </h3>`
} )