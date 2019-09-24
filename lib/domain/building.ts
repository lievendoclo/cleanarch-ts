export interface Building {
    id: string;
    name: string;
}

export interface BuildingGateway {
    createBuilding(building: Building): Building;
}