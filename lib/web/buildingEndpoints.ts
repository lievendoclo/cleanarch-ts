import * as express from "express";

import { CreateBuilding, CreateBuildingRequest } from "../app-api";

export function addBuildingEndpoints(params: { expressApplication: express.Application; createBuilding: CreateBuilding }): void {
    params.expressApplication.post("/building", (req, res) => {
        try {
            const request = req.body as CreateBuildingRequest;
            const response = params.createBuilding.createBuilding(request);
            res.json(response);
        } catch(err) {
            res.status(500).json({error: err.message})
        }
    });
}