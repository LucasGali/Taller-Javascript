import {fetchCrypto} from '../helpers/fetchCrypto.js';

let cryptos = [];

fetchCrypto().then((response) => {
  cryptos = [...response]

  console.log(cryptos)
  cargarCryptos(cryptos)
  
})

setInterval()

document.querySelector('#btn-update').addEventListener('click', () => {
  fetchCrypto().then((response) => {
    cryptos = [...response]
  
    console.log("hola", cryptos)
    cargarCryptos(cryptos)
    
  })
})


const cargarCryptos = (array) => {
  document.querySelector('#tableBody').innerHTML = ''
  
  array.map((crypto) => {
    const {
      rank,
      priceUsd,
      symbol,
      name,
      marketCapUsd,
      vwap24Hr,
      supply,
      volumeUsd24Hr,
      changePercent24Hr
    } = crypto

    const price = numeral(priceUsd).format('$0,0.00')
    const marketCap = numeral(marketCapUsd).format('($0.00 a)')
    const vwap = numeral(vwap24Hr).format('$0,0.00')
    const supp = numeral(supply).format('$0.00 a')
    const volume = numeral(volumeUsd24Hr).format('$0.00 a')
    const change = parseFloat(changePercent24Hr).toFixed(2)
    const icon = symbol.toLowerCase()
    
    let tr = document.createElement('tr')
    let tabla = `
    <td>${rank}</td>
    <td><img class="icon" src="https://assets.coincap.io/assets/icons/${icon}@2x.png">
    ${name}</td>
    <td>${price}</td>
    <td>${marketCap}</td>
    <td>${vwap}</td>
    <td>${supp}</td>
    <td>${volume}</td>
    <td class=${change > 0 ? "text-green" : "text-red"}>${change}%</td>
    `

    tr.innerHTML = tabla
    document.querySelector('#tableBody').appendChild(tr)
  })
}