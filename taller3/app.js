let url = "https://jsonplaceholder.typicode.com/users";
let usuarios = [];

//Petición http
const getData = async () => {
  const respuesta = await fetch(url);

  const datos = await respuesta.json();

  return datos;
};

//obtener la data
getData().then(function (respuesta) {
  console.log(respuesta);
  usuarios = [...respuesta];
  cargarTabla();
  cargarDatosEmpresa();
});

// nombre
// correo
//telefono
//ciudad
// domicilio: calle-street , suite , Coord( lat, long)

const obtenerDatosPersonales = () => {
  /*
Tenemos una base de datos de usuarios que necesitamos ordenar en una tabla. La información la recibimos desde el backend en formato JSON.
La tabla debe tener los siguientes encabezados:

- Nombre
- Correo
- Teléfono
- Dirección: Hoeger Mall - Apt. 692 (Coord: 29.4572, -164.2990)
- Ciudad

Se deben obtener esos datos de la información recibida. En el caso de la dirección la información debe mostrarse como el siguiente ejemplo:

- Hoeger Mall - Apt. 692 (Coord: 29.4572, -164.2990)

*/
  let datosPersonales = [];

  usuarios.map((user) => {
    const {
      name: nombre,
      email,
      phone,
      address: {
        street,
        suite,
        city,
        geo: { lat, lng },
      },
    } = user;

    datosPersonales.push({
      nombre,
      correo: email,
      telefono: phone,
      calle: street,
      direccion: suite,
      latitud: lat,
      longitud: lng,
      ciudad: city,
    });
  });
  return datosPersonales;
};

const cargarTabla = () => {
  let contenedor = document.querySelector("#cuerpoTabla");
  let datos = obtenerDatosPersonales();

  datos.map((item) => {
    const {
      nombre,
      correo,
      telefono,
      calle,
      direccion,
      latitud,
      longitud,
      ciudad,
    } = item;
    //- Hoeger Mall - Apt. 692 (Coord: 29.4572, -164.2990)
    let tr = document.createElement("tr");
    let contenido = `<td>${nombre}</td>
    <td>${correo}</td>
    <td>${telefono}</td>
    <td>${calle} - ${direccion} (Coord: ${latitud}, ${longitud})</td>
    <td>${ciudad}</td>`;

    tr.innerHTML = contenido;
    contenedor.appendChild(tr);
  });
};

const obtenerDatosEmpresa = () => {
  //name, catchPhrase
  let empresa = [];
  usuarios.map((item) => {
    const { name: nombre, catchPhrase: slogan } = item.company;
    empresa.push({ nombre, slogan });
  });

  return empresa;
};

const cargarDatosEmpresa = () => {
  let contenedor = document.getElementById("containerQuotes");
  let datos = obtenerDatosEmpresa();

  datos.map((empresa) => {
    const { nombre, slogan } = empresa;
    let figure = document.createElement("figure");
    let contenido = `<blockquote class="blockquote">
    <p>${slogan}</p>
    </blockquote>
    <figcaption class="blockquote-footer">
    ${nombre}
    </figcaption> `;

    figure.innerHTML = contenido;
    contenedor.appendChild(figure);
  });
};
