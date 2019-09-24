import { Server } from "http";
import * as assert from "power-assert";
import * as rm from "typed-rest-client";

import { Configuration, startApplication } from "../lib/main";

describe("Outside-in testing", () => {
    let server: Server;
    let restClient: rm.RestClient;
    before("starting server", () => {
        const testConfiguration: Configuration = {
            serverPort: 3001
        }
        server = startApplication({configuration: testConfiguration});
        restClient = new rm.RestClient("Building", "http://localhost:3001")
    });

    describe("/building", () => {
        it("POST should accept valid payload", async () => {
            const response = await restClient.create<{id: string}>("/building", {name: "test"});
            assert(!!response);
            assert.equal(response.statusCode, 200)
            assert(response.result.id);
        });

        it("POST should reject invalid payload", async () => {
            try {
                await restClient.create<{}>("/building", {firstName: "test"}, { acceptHeader: "application/json"});
                assert(false, "should not get here");
            } catch (err) {
                assert.equal(err.statusCode, 500)
            }
        })
    });

    after("stopping server", () => {
        server.close();
    });
});
