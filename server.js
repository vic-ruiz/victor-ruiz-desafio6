const express = require("express");
const Container = require("./container");
const container = new Container("./products.txt");
const app = express();
const PORT = 8080;
const http = require("http");
const { Server: ioServer } = require("socket.io");
const httpServer = http.createServer(app);
const io = new ioServer(httpServer);

const routesProducts = require("./routes/routesProducts");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", routesProducts);

app.use(express.static(__dirname + "/public"));
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/form", {});
});

io.on("connection", (socket) => {
  console.log("🟢 Usuario conectado");

  const productos = container.getAll();

  socket.emit("bienvenidoLista", productos);

  socket.on("productoAgregado", () => {
    console.log("Alguien presionó el click");
    const productos = container.getAll();
    io.sockets.emit("listaActualizada", productos);
  });


  socket.on("disconnect", () => {
    console.log("🔴 Usuario desconectado");
  });
});

const server = httpServer.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

server.on("error", (error) => console.log(error));
