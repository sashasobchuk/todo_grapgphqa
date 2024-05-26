import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DashboardEntity} from "../entities/dashboard.entity";
import {Repository} from "typeorm";
import {CreateShapeInput} from "./inputs/create-shape.input";
import {ShapeInput} from "./inputs/shape.input";
import {ShapeEntity} from "../entities/shape.entity";

@Injectable()
export class ShapesService {
    constructor(
        @InjectRepository(ShapeEntity)
        private readonly shapeRepository:Repository<ShapeEntity>
    ) {
    }
    async createShape(createShapeInput:CreateShapeInput):Promise<ShapeInput>{
        let bro = await this.shapeRepository.save(createShapeInput)
        return bro
    }
    async getShapes(){
        return this.shapeRepository.find()
    }

}
