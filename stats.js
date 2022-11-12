fetch('https://amazing-events.herokuapp.com/api/events')
.then(response => response.json())
.then((response) => {
    datos = response.events
    setCategoria = new Set (datos.map( element => element.category))
    categorias = Array.from(setCategoria)
    currentDate = response.currentDate
    crearTablas ()
})
.catch(negative => console.log(negative))
//----------------Declaracion de variables --------
let datos;
let setCategoria;
let categorias;
let currentDate;


function crearTablas (){

}

function crearTabla



{/* <tr>
<td class="tg-0lax"></td>
<td class="tg-0lax"></td>
<td class="tg-0lax"></td>
</tr> */}