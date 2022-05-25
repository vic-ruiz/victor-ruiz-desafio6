const socket = io();

socket.on("bienvenidoLista", (data) => {
  const html = data
    .map((product) => {
      return `<div class="card col-2">
    <div>${product.title}</div>
    <div>${product.price}</div>
    <div><img src=${product.thumbnail} width="40px"></div>
    </div>`;
    })
    .join(" ");
  document.getElementById("lista").innerHTML = html;
});

const btn = document.getElementById("btn");

btn.addEventListener("click", (evt) => {
  socket.emit("productoAgregado");
});

socket.on("listaActualizada", (data) => {
  const html = data
    .map((product) => {
      return `<div class="card col-2">
      <div>${product.title}</div>
      <div>${product.price}</div>
      <div><img src=${product.thumbnail} width="40px"></div>
      </div>`;
    })
    .join(" ");
  document.getElementById("lista").innerHTML = html;
});


