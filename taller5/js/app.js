import { getProductos } from '../helpers/fetch.js'

let productos = []
let categorias = []

getProductos().then((response) => {
  productos = [...response]
  document.querySelector('#mensaje').remove()

  obtenerCategorias(productos)
  cargarProductos(productos)

  // console.log(productos)
  // console.log(categorias)
})

const obtenerCategorias = (array) => {
  let arreglo = []

  array.map((item) => {
    arreglo.push(item.category)
  })

  categorias = [...new Set(arreglo)]

  categorias.map((item) => {
    let option = `<option value="${item}">${item}</option>`
    document.querySelector('#lista_categorias').innerHTML += option
  })
}

const filtrarProductos = (e) => {
  let categoria = e.target.value

  if (categoria === 'todo') {
    return cargarProductos(productos)
  }

  let newArray = productos.filter((item) => {
    return item.category === categoria
  })
  cargarProductos(newArray)
  // console.log(e.target.value)
}

document
  .querySelector('#lista_categorias')
  .addEventListener('change', filtrarProductos)

const cargarProductos = (array) => {
  document.querySelector('#container_cards').innerHTML = ''

  array.map((producto) => {
    const {
      title,
      price,
      image,
      rating: { rate },
    } = producto

    let div = document.createElement('div')
    div.classList = 'col-12 col-md-6'
    let tarjeta = `<div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-4">
      <img
        src=${image}
        class="img-fluid rounded-start p-2"
        alt=${title}
      />
    </div>
    <div class="col-md-8">
      <div class="card-body h-100 d-flex flex-column justify-content-between">
      <div>
      <h5 class="card-title">
        ${title}
      </h5>
      
      <p class="card-text">
        <small class="text-muted">$ ${price}</small>
      </p>
      
      </div>
      <div>
      <button type="button" class="btn btn-warning float-end">
        Calificación
        <span class="badge bg-light text-dark">${rate}</span>
      </button>
      
      </div>
      </div>
    </div>
  </div>
</div>`

    div.innerHTML = tarjeta
    document.querySelector('#container_cards').appendChild(div)
  })
}
