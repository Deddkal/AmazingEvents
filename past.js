
const $form = document.getElementById("form")
const $check= document.getElementById("check_conteiner")
const datos =  data.events;
const conteiner_cards = document.querySelector('.conteiner_cards')
let categoriasFiltradas = datos.map( element => element.category)
let setcategorias = new Set (categoriasFiltradas)
let categoryCheck = Array.from(setcategorias)
let fragmento = new DocumentFragment() ;

datosPast= datos.filter( element => element.date < data.currentDate)

function CrearCheckBox (lista){
  let div = document.createElement('div')
  div.classList.add("form-check")
  div.innerHTML = `
  <label class="form-check-label">
  <input class="form-check-input" type="checkbox" value="${lista}">
  ${lista}
  </label>`
  fragmento.appendChild(div)
}

categoryCheck.forEach( element => {
  CrearCheckBox (element)
})
$check.appendChild(fragmento)

function crearTarjetas (info){
  const card = document.createElement('section')
  card.classList.add('conteiner_card')
  card.innerHTML =`
    <img src="${info.image}" class="card-img-top" alt="Imagen Evento">
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
    conteiner_cards.innerHTML = `<h2 class="text-bg-danger p-3"> No hay eventos en su busqueda</h2>`
  }else{
  info.forEach((element) => crearTarjetas(element))
  conteiner_cards.appendChild(fragmento)
}
}

let checked = []
let searchBar = $form[7].value
nuevaTarjeta (datosPast);
$form.addEventListener("submit", (e) => e.preventDefault() )
$form.addEventListener("keyup", (e) =>{
  searchBar = $form[7].value
  datosfiltrado = filtrarSearchBar (filtradoCheck(datosPast, checked), searchBar)
  nuevaTarjeta(datosfiltrado)
  return searchBar
}
)
$form.addEventListener("change", (e) => {
  let checkedBtn = Array.from($form.querySelectorAll(`input[type="checkbox"]:checked`))
  checked = checkedBtn.map(element => element.value)
  datosfiltrado = filtrarSearchBar (filtradoCheck(datosPast, checked), searchBar)
  nuevaTarjeta(datosfiltrado)
  return checked
})

function filtradoCheck(info, filtrar){
  let datosFiltrado = []
  if ((filtrar.length) != 0){ 
   return datosFiltrado = info.filter( element => filtrar.includes(element.category))
  }else{
    return datosFiltrado = info
  }
}

function filtrarSearchBar (info, filtrar){
  let datoFiltrado = []
    if (filtrar != ''){
     return datoFiltrado = info.filter ( element => element.name.toLowerCase().includes(filtrar.toLowerCase()))
  }else{
    return datoFiltrado = info
  }
}

