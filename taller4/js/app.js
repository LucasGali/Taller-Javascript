const getDatosHeroes = async () => {
  try {
    const response = await fetch("../data/superheroes.json");
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

getDatosHeroes().then((respuesta) => {
  console.log(respuesta);
});
