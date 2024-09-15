import { createServer } from "./config/create-server";
import { initPaymentRoutes } from "./presentation/routes/paymentRoutes";
import envs from "./config/envs";

const server = createServer();

initPaymentRoutes(server);

server.listen(envs.SERVER_PORT, () => {
  console.log(`App listening on port ${envs.SERVER_PORT}`);
});
