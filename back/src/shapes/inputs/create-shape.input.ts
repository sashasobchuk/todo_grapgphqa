import {Field, ID, InputType} from "@nestjs/graphql";
import {ShapeFields, ShapeInput} from "./shape.input";


@InputType()
export class CreateShapeInput extends ShapeFields{


}