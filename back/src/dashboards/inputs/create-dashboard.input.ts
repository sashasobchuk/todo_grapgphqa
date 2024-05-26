import {Field, ID, InputType} from "@nestjs/graphql";


@InputType()
export class CreateDashboardInput {

    @Field({nullable:true})
    name:string

    @Field(()=>ID,{nullable:true})
    userId:string

    @Field({nullable:true})
    status:string
}