import * as express from "express";
import { Server } from "http";

import * as appApi from "./app-api";
import * as appImpl from "./app-impl";
import * as domain from "./domain";
import * as persistence from "./persistence";
import * as web from "./web";

export interface Configuration {
    serverPort: number;
}

const defaultConfiguration: Configuration = {
    serverPort: parseInt(process.env["SERVER_PORT"]) || 3000,
}

const defaultExpressApplication: express.Application = express();
defaultExpressApplication.use(express.json());

const defaultStartParams = {
    expressApplication: defaultExpressApplication,
    configuration: defaultConfiguration,
}

export function startApplication(params: {expressApplication?: express.Application; configuration?: Configuration}): Server {
    const paramsToUse = {
        ...defaultStartParams,
        ...params,
    }
    const buildingGateway: domain.BuildingGateway = new persistence.BuildingGatewayImpl();
    const createBuilding: appApi.CreateBuilding = new appImpl.CreateBuildingImpl(buildingGateway);
    const server = paramsToUse.expressApplication.listen(paramsToUse.configuration.serverPort, () => console.log(`Listening on port ${paramsToUse.configuration.serverPort}`));
    web.addBuildingEndpoints({expressApplication: paramsToUse.expressApplication, createBuilding});
    return server;
}
