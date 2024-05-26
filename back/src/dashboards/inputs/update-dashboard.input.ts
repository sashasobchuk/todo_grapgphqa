import {Field, ID, InputType

} from "@nestjs/graphql";
import {ShapeEntity} from "../../entities/shape.entity";
import {ShapeInput} from "../../shapes/inputs/shape.input";


@InputType()
export class UpdateDashboardInput {

    @Field(()=>ID)
    id:number

    @Field({nullable:true})
    status:string

    @Field(()=>[ShapeInput],{nullable:true})
    shapes:ShapeInput[]
}