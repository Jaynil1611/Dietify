import { createServer, Model, RestSerializer } from "miragejs";
import { database } from "../database";

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer,
    },

    models: {
      wish: Model,
      cart: Model,
      product: Model,
    },

    routes() {
      this.namespace = "api";
      this.timing = 300;
      this.resource("wishes");
      this.resource("products");
      this.resource("carts");
    },

    seeds(server) {
      database.forEach((product) => server.create("product", { ...product }));
      server.create("wish", { ...database[0] });
      server.create("cart", { ...database[0], cartQuantity: 1 });
    },
  });
}
