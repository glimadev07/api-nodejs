import { createServer } from "./config/create-server";
import { initPaymentRoutes } from "./presentation/routes/paymentRoutes";
import dotenv from "dotenv";
import envs from "./config/envs";

dotenv.config();

const server = createServer();

initPaymentRoutes(server);

server.listen(envs.SERVER_PORT, () => {
  console.log(`App listening on port ${envs.SERVER_PORT}`);
});
