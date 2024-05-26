import {Field, ID, InputType} from "@nestjs/graphql";


@InputType()
export class GetDashboardInput {

    @Field({nullable:true})
    name:string

    @Field(()=>ID,{nullable:true})
    userId:number

    @Field(()=>ID,{nullable:true})
    id:number

    @Field({nullable:true})
    status:string
}