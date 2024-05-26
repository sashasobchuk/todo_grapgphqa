import { Module } from '@nestjs/common';
import {ShapesService} from "./shapes.service";
import {ShapesResolver} from "./shapes.resolver";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {ShapeEntity} from "../entities/shape.entity";

@Module({
    imports:[TypeOrmModule.forFeature([ShapeEntity])],
    providers: [ShapesService, ShapesResolver]

})
export class ShapesModule {

}
