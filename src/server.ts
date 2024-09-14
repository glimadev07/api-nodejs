import createServer from "./config/create-server";

const port = 3000;
const server = createServer();

// TODO - inicializar camada de apresentação que contém a configuração dos endpoints
// initPresentationLayer(app)

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
