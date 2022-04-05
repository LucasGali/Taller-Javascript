// let precioOriginal = 120;
// let descuento = 20;

// let porcentajePrecioConDescuento = 100 - descuento;
// let precioConDescuento = precioOriginal * (porcentajeDescuento / 100);

// console.log({
//   precioOriginal,
//   descuento,
//   porcentajePrecioConDescuento,
//   precioConDescuento,
// });

function calcularPrecioConDescuento(precio, descuento) {
  let porcentajePrecioConDescuento = 100 - descuento;
  let precioConDescuento = precio * (porcentajePrecioConDescuento / 100);

  return precioConDescuento;
}

//   Cuando se realiza el submit del formulario
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let precio = parseFloat(document.querySelector("#precio").value);
  let descuento = parseFloat(document.querySelector("#descuento").value);

  if (precio > 0 && descuento > 0) {
    document.querySelector(
      "#resultado"
    ).value = `El producto con el descuento del ${descuento}% tiene un costo de $${calcularPrecioConDescuento(
      precio,
      descuento
    )}`;
  } else {
    alert("Debe ingresar números válidos");
  }
});

//Tarea
// Nuestros clientes están muy felices de poder calcular el precio final de sus productos después del descuento, pero la tienda tiene una nueva solicitud para nosotros: implementar descuentos con cupones.
