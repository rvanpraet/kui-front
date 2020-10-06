import { Server, Model } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
    let server = new Server({
        environment,

        models: {
            design: Model
        },

        seeds(server) {
            server.create("design", {
                imageUrl:
                    "https://dummyimage.com/600x600/000000/fff&text=Design+One"
            });
            server.create("design", {
                imageUrl:
                    "https://dummyimage.com/600x600/000000/fff&text=Design+Two"
            });
            server.create("design", {
                imageUrl:
                    "https://dummyimage.com/600x600/000000/fff&text=Design+Three"
            });
        },

        routes() {
            this.namespace = "api";

            this.get("/userId/designs", schema => {
                return schema.designs.all();
            });
        }
    });

    return server;
}
