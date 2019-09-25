import { CreateBuilding, CreateBuildingRequest, CreateBuildingResponse } from "../app-api";
import { Building, BuildingGateway } from "../domain";

export class CreateBuildingImpl implements CreateBuilding {
    constructor(private readonly buildingGateway: BuildingGateway) {
        this.buildingGateway = buildingGateway;
    }

    public createBuilding(request: CreateBuildingRequest): CreateBuildingResponse {
        if(!request.name) {
            throw Error("Request 'name' is mandatory")
        }
        const building: Building = {
            id: "generated",
            name: request.name,
        };
        const created = this.buildingGateway.createBuilding(building);
        return {
            id: created.id,
            name: created.name,
        };
    }
}
