fetch('https://amazing-events.herokuapp.com/api/events')
.then(response => response.json())
.then((response) => {
    datos = response.events
    currentDate = response.currentDate
    datos.forEach(elemento => datosPorcentajes.push(nuevoObjeto(elemento)) )
    datosPast = datosPorcentajes.filter( element => element.date < response.currentDate)
    datosComing = datosPorcentajes.filter( element => element.date > response.currentDate)
    categoriasUncoming = Array.from(new Set (datos.filter(element => element.date > response.currentDate).map( element => element.category)))
    categoriasPast = Array.from(new Set (datos.filter(element => element.date < response.currentDate).map( element => element.category)))
    objetoCategoria()
	objetoCategoriaPast()
	crearTablas ()
	console.log(datosPast.filter(e => e.category == "Cinema"))
	
	listaCategorias(gananciaComing)
})
.catch(negative => console.log(negative))


//----------------Declaracion de variables --------
let datos;
let datosComing;
let datosPast;
let setCategoria;
let categorias;
let currentDate;
let $present = document.getElementById('table_event_stats')
let $upcoming = document.getElementById('table_events_upcoming')
let $past = document.getElementById('table_events_past')
let porcentaje;
let datosPorcentajes = []
let fragmento = new DocumentFragment()
let fragTemporal = new DocumentFragment()
let categoriasEvento=[]
let gananciaComing = []
let gananciasPast = []
let categoriasPast;
let categoriasUncoming;

//------------------ Funciones crear tablas ------------
function crearTablas (){
crearTablaEvent(datosPast)
$present.appendChild(fragmento)
crearTablaFuturo(gananciaComing)
$present.appendChild(fragmento)
crearTablaPasado(gananciasPast)
$present.appendChild(fragmento)
}

function crearTablaEvent(array){
    let lineaTabla = document.createElement('table')
    lineaTabla.className = "table-conteiner m-auto text-bg-dark table_flow"
    lineaTabla.innerHTML = `<thead class="">
    <tr>
        <th class="tg-0lax fs-2" colspan="3">Event statistics</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td class="tg-0lax fs-3">Event with the highest percentage of attendance</td>
        <td class="tg-0lax fs-3">Event with the lowest percentage of attendance</td>
        <td class="tg-0lax fs-3">Event with larger capacity</td>
    </tr>
    <tr>
        <td class="fst-italic">${array.filter(e => e.porcentaje).sort( (a,b) => b.porcentaje - a.porcentaje ).map(e => e.name).slice(0,1)}</td>
        <td class="fst-italic">${array.filter(e => e.porcentaje).sort( (a,b) => b.porcentaje - a.porcentaje ).map(e => e.name).slice(-1)}</td>
        <td class="fst-italic">${array.filter(e => e.capacity).sort( (a,b) => b.capacity - a.capacity ).map(e => e.name).slice(0,1)}</td>
    </tr>
    </tbody>`
    fragmento.appendChild(lineaTabla)
}

function crearTablaFuturo(array){
    let lineaTabla = document.createElement('table')
    lineaTabla.className = "table-conteiner m-auto text-bg-dark table_flow"
    
    lineaTabla.innerHTML = `<thead class="">
    <tr>
        <th class="tg-0lax fs-2" colspan="3">Upcoming events statistics by category</th>
    </tr>
    <tr>
        <th class="tg-0lax fs-3">Categories</th>
        <th class="tg-0lax fs-3">Revenue</th>
        <th class="tg-0lax fs-3">Percentage of attendance</th>
    </tr>
    </thead>
    `
	array.forEach(element => listaCategorias(element))
    lineaTabla.appendChild(fragTemporal)
    fragmento.appendChild(lineaTabla)
}

function listaCategorias(categoria){
    let template = document.createElement('tbody')
    template.innerHTML = `<tr>
    <td class="fst-italic">${categoria.nombre}</td>
    <td class="fst-italic">$${categoria.revenue}</td>
    <td class="fst-italic">${Math.round(categoria.estimate*100/categoria.capacity)}%</td>
    </tr>`
    fragTemporal.appendChild(template)
}

function crearTablaPasado(array){
    let lineaTabla = document.createElement('table')
    lineaTabla.className = "table-conteiner m-auto text-bg-dark table_flow"
    
    lineaTabla.innerHTML = `<thead class="">
    <tr>
        <th class="tg-0lax fs-2" colspan="3">Upcoming events statistics by category</th>
    </tr>
    <tr>
        <th class="tg-0lax fs-3">Categories</th>
        <th class="tg-0lax fs-3">Revenue</th>
        <th class="tg-0lax fs-3">Percentage of attendance</th>
    </tr>
    `
	array.forEach(element => listaCategoriasP(element))
    lineaTabla.appendChild(fragTemporal)
    fragmento.appendChild(lineaTabla)
}

function listaCategoriasP(categoria){
    let template = document.createElement('tbody')
    template.innerHTML = `<tr>
    <td class="fst-italic">${categoria.nombre}</td>
    <td class="fst-italic">$${categoria.revenue}</td>
    <td class="fst-italic">${Math.round(categoria.assistance*100/categoria.capacity)}%</td>
    </tr>`
    fragTemporal.appendChild(template)
}



//--------- Funciones Datos -------
function porcentajes (dato, capacidad) {return porcentaje = Math.round(dato*100/capacidad)}

function nuevoObjeto(elemento){
   let aux;
   if(elemento.estimate){
   aux = {
    name: elemento.name,
    capacity: elemento.capacity,
    estimate: elemento.estimate,
    porcentaje: porcentajes(elemento.estimate, elemento.capacity),
    category: elemento.category,
    price: elemento.price,
    date: elemento.date,
	revenue: elemento.estimate*elemento.price
   }
}else{
    aux = {
        name: elemento.name,
        capacity: elemento.capacity,
        assistance: elemento.assistance,
        porcentaje: porcentajes(elemento.assistance,elemento.capacity),
        category: elemento.category,
        price: elemento.price,
        date: elemento.date,
		revenue: elemento.assistance*elemento.price
       }
}
   return aux 
}

let pruebacategorias =[]

function objetoCategoria (){
   	categoriasUncoming.map( evento =>gananciaComing.push({
		nombre: evento,
		revenue: datosComing.filter(e => e.category == evento).map(e => e.revenue).reduce((actual,total) => actual+=total), 
		estimate: datosComing.filter(e => e.category == evento).map(e => parseInt(e.estimate)).reduce((actual,total) => actual+=total),
		capacity : datosComing.filter(e => e.category == evento).map(e => parseInt(e.capacity)).reduce((actual,total) => actual+=total)  
	}))
}

function objetoCategoriaPast (){
	categoriasPast.map( evento => gananciasPast.push({
	 nombre: evento,
	 revenue: datosPast.filter(e => e.category == evento).map(e => e.revenue).reduce((actual,total) => actual+=total), 
	 assistance: datosPast.filter(e => e.category == evento).map(e => parseInt(e.assistance)).reduce((actual,total) => actual+=total),
	 capacity : datosPast.filter(e => e.category == evento).map(e => parseInt(e.capacity)).reduce((actual,total) => actual+=total)  
 }))
}
