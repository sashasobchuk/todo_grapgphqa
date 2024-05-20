import {Field, InputType} from "@nestjs/graphql";

@InputType() // те саме шо dto
export class CreateUserInput {


    @Field()
    email:string

    @Field({nullable:true})
    name:string
}