import { createServer, Model, RestSerializer } from "miragejs";
import { database } from "../database";

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer
    },

    models: {
      wish: Model,
      cart: Model,
      product: Model
    },

    routes() {
      this.namespace = "api";
      this.timing = 2000;
      this.resource("wishes");
      this.resource("products");
      this.resource("carts");
    },

    seeds(server) {
      database.forEach((product) => server.create("product", { ...product }));
      [database[0]].forEach((product) => server.create("wish", { ...product }));
      [database[0]].forEach((product) =>
        server.create("cart", { ...product, cartQuantity: 1 })
      );
    }
  });
}
