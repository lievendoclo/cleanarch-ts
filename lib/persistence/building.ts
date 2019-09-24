import { Building, BuildingGateway } from "../domain";

export class BuildingGatewayImpl implements BuildingGateway {
    public createBuilding(building: Building): Building {
        return building;
    }
}