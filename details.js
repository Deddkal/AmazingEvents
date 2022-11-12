fetch('https://amazing-events.herokuapp.com/api/events')
.then(response => response.json())
.then((response) => {
    datosDetails = response.events
    evento = datosDetails.find((eventos) => eventos._id == id);
    creartarjeta(evento)
    conteiner_cards.appendChild(fragmento)
})
.catch(negative => conteiner_cards.innerHTML = `<h2 class="text-bg-danger p-4">The site is under maintenance</h2>`)

let datosDetails;
let queryString = location.search;
let params = new URLSearchParams(queryString);
let id = params.get("id");
let evento;

const conteiner_cards = document.querySelector('.conteiner_cards')
const fragmento = new DocumentFragment() ;

function creartarjeta (tarjeta){
    const card = document.createElement('section')
    card.classList.add('conteiner_details', 'bg-dark')
    
    card.innerHTML = `
    <img src="${tarjeta.image}" class="details_img" alt="${tarjeta.name}" title="${tarjeta.category}">
    <div class="details_body">
    <h3 class="details_name">${tarjeta.name}</h3>
    <p class="details_info">${tarjeta.description}</p>
    <h5> Date: ${tarjeta.date} </h5>
    <h5> Place: ${tarjeta.place} </h5>
    <h5> Category: ${tarjeta.category} </h5>
    ${tarjeta.assistance?"<h5>Assistance: " +tarjeta.assistance + "</h5>":"<h5>Estimate: " + tarjeta.estimate + "</h5>"}
    <h5> Capacity: ${tarjeta.capacity} </h5>
    <h5>$${tarjeta.price}</h5>
    </div>`
    fragmento.appendChild(card)
}








