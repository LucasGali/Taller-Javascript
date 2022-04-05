// obtener toda la database
//obtener los objetos que sean nft (type)
// traer la imagen y el nombre
let informacion = []
let nfts = []

const getData = async () => {
  const response = await fetch('./data.json')
  const { data } = await response.json()
  return data
}

getData().then((response) => {
  informacion = response

  nfts = informacion.items.filter((item) => {
    return item.type === 'nft'
  })

  // console.log(nfts);
  document.querySelector("#direccion").innerHTML = informacion.address;
  cargarGaleria()
})

const cargarGaleria = () => {
  document.querySelector('#contenedor').innerHTML = ''

  nfts.map((item, index) => {
    const { nft_data } = item

    if (nft_data) {
      let div = document.createElement('div')
      // let div_card = document.createElement('div_card')
      div.classList = 'col'
      let columnas = ` <div class="card">
      <img src=${nft_data[0].external_data.image_512} class="card-img-top" alt=${nft_data[0].external_data.name}>
      <div class="card-body">
        <h5 class="card-title">${nft_data[0].external_data.name}</h5>
       
      </div>
    </div>`

    div.innerHTML = columnas;

    document.querySelector("#contenedor").appendChild(div);
      // div.classList = 'card-body'

      // let tarjeta = `<div><img src=${nft_data.external_data.image}</div>`
      // class = "card"
      // img
      // class="card-body"
      // <p> nombre del nft </p>
    }
  })
}
