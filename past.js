
fetch('https://amazing-events.herokuapp.com/api/events')
.then(response => response.json())
.then((response) => {
  let objeto =  response;
  datosPast = objeto.events
  datos= datosPast.filter( element => element.date < response.currentDate)
  categoriasFiltradas = datos.map( element => element.category)
  setcategorias = new Set (categoriasFiltradas)
  categoryCheck = Array.from(setcategorias)
  categoryCheck.forEach( element => CrearCheckBox (element))
  $check.appendChild(fragmento)
  nuevaTarjeta (datos);
  
  $form.addEventListener("keyup", (e) =>{
    nuevaTarjeta(filtrarSearchBar (filtradoCheck(datos)))
  }
  )
  $form.addEventListener("change", (e) => {
    nuevaTarjeta(filtrarSearchBar (filtradoCheck(datos)))
  })
})
.catch(negative => conteiner_cards.innerHTML = `<h2 class="text-bg-danger p-4">The site is under maintenance</h2>`)
let datos = []
const $buscador = document.getElementById('buscador')
const $form = document.getElementById("form")
const $check= document.getElementById("check_conteiner")
const conteiner_cards = document.querySelector('.conteiner_cards')

let categoriasFiltradas
let setcategorias
let categoryCheck
let fragmento = new DocumentFragment() ;
function CrearCheckBox (lista){
  let div = document.createElement('div')
  div.classList.add("form-check")
  div.innerHTML = `
  <label class="form-check-label">
  <input class="form-check-input" type="checkbox" title="${lista}" value="${lista}">
  ${lista}
  </label>`
  fragmento.appendChild(div)
}

function crearTarjetas (info){
  const card = document.createElement('section')
  card.classList.add('conteiner_card')
  card.innerHTML =`
    <img src="${info.image}" class="card-img-top" alt="${info.name}" title="${info.category}">
    <div class="card_body">
    <h5 class="card-title">${info.name}</h5>
    <p class="card-text">${info.description}</p>
    <div class="card_footer">
    <h4>$${info.price}</h4>
    <a href="./details.html?id=${info._id}" class="btn btn-primary">More info...</a>
    </div>
    </div>`
  fragmento.appendChild(card) 
}
function nuevaTarjeta (info){
  conteiner_cards.innerHTML = ''
  if (info.length == 0){
    conteiner_cards.innerHTML = `<h2 class="text-bg-danger p-3">There are no results for your search</h2>`
  }else{
  info.forEach((element) => crearTarjetas(element))
  conteiner_cards.appendChild(fragmento)
}
}
let checked = []
$form.addEventListener("submit", (e) => e.preventDefault() )

function filtradoCheck(info){
  let checkedBtn = Array.from($form.querySelectorAll(`input[type="checkbox"]:checked`))
  checked = checkedBtn.map(element => element.value)
  
  if ((checked.length) != 0){ 
   return info.filter( element => checked.includes(element.category))
  }else{
    return info
  }
}
function filtrarSearchBar (info){
  let searchBar = $buscador.value
    if (searchBar != ''){
     return info.filter(element => element.name.toLowerCase().includes(searchBar.toLowerCase()) || element.description.toLowerCase().includes(searchBar.toLowerCase()))
  }else{
    return info
  }
}