import {Field, ID, InputType} from "@nestjs/graphql";
import {ShapeEntity} from "../../entities/shape.entity";



@InputType()
export class ShapeFields {

    @Field()
    x: number;

    @Field()
    y: number;

    @Field()
    type: string;

    @Field()
    width: number;

    @Field()
    height: number;

    @Field()
    z: number;

    @Field(() => ID, { nullable: true })
    valueId?: number;
}

@InputType()
export class ShapeInput  extends ShapeFields{

    @Field(() => ID, { nullable: false })
    id: number;
}


