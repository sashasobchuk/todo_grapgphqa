import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {CreateShapeInput} from "./inputs/create-shape.input";
import {ShapesService} from "./shapes.service";
import {ShapeEntity} from "../entities/shape.entity";
import {ShapeInput} from "./inputs/shape.input";
// import {Query} from "@nestjs/common";

@Resolver(()=>ShapeEntity)
export class ShapesResolver {
    constructor(private readonly shapesService:ShapesService) {}

    @Mutation(()=>ShapeEntity)
    async createShape(@Args('createShapeInput') createShapeInput:CreateShapeInput):Promise<ShapeInput>{
        return this.shapesService.createShape(createShapeInput)
    }

    @Query(()=>[ShapeEntity])
    async getShapes():Promise<ShapeEntity[]>{
        return this.shapesService.getShapes()
    }
}
