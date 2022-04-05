// billetes de 50 cantidad 3
// billetes de 20 cantidad 2
// billetes de 10 cantidad 2

let billetes = [
  { valor: 50, cantidad: 3 },
  { valor: 20, cantidad: 2 },
  { valor: 10, cantidad: 2 },
];

let extraer = 0;
let cantBilletes = 0;
let papeles = 0;
let entregado = [];
let total = 0; //total de dinero en el cajero

const totalCajero = () => {
  //    for (const item of billetes) {
  //        total=total + item.valor *item.cantidad
  //    }
  total = 0;
  billetes.forEach((billete) => {
    total += billete.valor * billete.cantidad;
  });
};

//Solicitar dinero
const solicitarDinero = () => {
  entregado = [];
  //si el dinero a extraer es menor o igual al dinero del cajero
  if (extraer <= total) {
    for (const billete of billetes) {
      if (extraer > 0) {
        cantBilletes = Math.floor(extraer / billete.valor); //30 / 20=1

        //obtener la cantidad de papel billete que entregará el cajero
        if (cantBilletes > billete.cantidad) {
          papeles = billete.cantidad;
        } else {
          papeles = cantBilletes;
        }

        billete.cantidad -= papeles;

        entregado.push({ valor: billete.valor, cantidad: papeles });
        extraer -= billete.valor * papeles;
        //30 //10 //0
      }
    }
    mostrarBilletes();
    totalCajero();
  } else {
    alert("El cajero no dispone de la cantidad solicitada");
  }
};

//mostrar los billetes en pantalla

const mostrarBilletes = () => {
  let contenedorBilletes = document.getElementById("container_billete");
  contenedorBilletes.innerHTML = "";

  //recorrer el arreglo entregable
  for (const papel of entregado) {
    switch (papel.valor) {
      case 50:
        let img50 = null;
        for (let index = 0; index < papel.cantidad; index++) {
          img50 = document.createElement("img");
          img50.src = "./img/b50.png";
          contenedorBilletes.appendChild(img50);
        }
        break;
      case 20:
        let img20 = null;
        for (let index = 0; index < papel.cantidad; index++) {
          img20 = document.createElement("img");
          img20.src = "./img/b20.png";
          contenedorBilletes.appendChild(img20);
        }
        break;
      case 10:
        let img10 = null;
        for (let index = 0; index < papel.cantidad; index++) {
          img10 = document.createElement("img");
          img10.src = "./img/b10.png";
          contenedorBilletes.appendChild(img10);
        }
        break;
    }
  }

  //switch por cada billete.valor
  // dentro de cada caso sacar cantidad y dibujar la cantidad de billetes
};

//botones del cajero
function botonPresionado(valor) {
  extraer += valor;
  document.querySelector("#inputValue").value = extraer;
}

document.querySelector("#btn").addEventListener("click", solicitarDinero);

document.querySelector("#inputValue").addEventListener("click", () => {
  document.querySelector("#inputValue").value = "";
  extraer = 0;
  document.getElementById("container_billete").innerHTML = "";
  entregado = [];
});

totalCajero();
