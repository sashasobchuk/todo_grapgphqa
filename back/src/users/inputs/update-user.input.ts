import {Field, ID, InputType} from "@nestjs/graphql";

@InputType() // те саме шо dto
export class UpdateUserInput {

    @Field(()=>ID)
    id:number

    @Field({nullable:true})
    email:string

    @Field({nullable:true})
    name:string
}