
const fetchPeople = async () => {
  try {
    const resp = await fetch("https://swapi.dev/api/people")
    const { results }  = await resp.json();
    return results
  } catch (e) {
    throw new Error('no se encontro informacion en API');
  }
}

let people = []

fetchPeople().then((response) => {
  people = [...response]
  console.log(people)
  cargarPersonajes(people)
})

const getPlanet = async (test) => {
  try {
    const resp = await fetch(test)
    const data = await resp.json();
    console.log(data);
  } catch (e) {
    throw new Error('no se encontro informacion')
  }
}

const cargarPersonajes = (array) => {
  document.querySelector('#accordionExample').innerHTML=''

  array.map((character, index) => {
    const { name, birth_year, eye_color, hair_color, skin_color, mass, gender, height, homeworld} = character

  let div = document.createElement('div')
  div.classList = 'accordion-item'
  // // let h2 = document.createElement('h2')
  let collapsable = `
  <h2 class="accordion-header" id="heading${index}">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
    ${name}
    </button>
  </h2>
  <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <h3><strong>Data</strong></h3>
        <strong>Birth year: </strong>${birth_year}<br>
        <strong>Gender: </strong>${gender}<br>
        <strong>Hair color: </strong>${hair_color}<br>
        <strong>Height: </strong>${height}cm<br>
        <strong>Mass: </strong>${mass}kg<br>
        <strong>Planet: </strong>
        <button class="btn btn-success" onclick="getPlanet('${homeworld}')">View
        </button>
      </div>
    </div>
  </div>
  `

  div.innerHTML = collapsable
  document.querySelector('#accordionExample').appendChild(div)
  })
}