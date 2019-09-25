export interface CreateBuilding {
    createBuilding: (request: CreateBuildingRequest) => CreateBuildingResponse;
}

export interface CreateBuildingRequest {
    name: string;
}

export interface CreateBuildingResponse {
    id: string;
    name: string;
}