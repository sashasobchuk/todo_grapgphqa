import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Field, ID, ObjectType} from "@nestjs/graphql";
import {UserEntity} from "./user.entity";
import {ShapeEntity} from "./shape.entity";


@ObjectType()
@Entity('dashboards')
export class DashboardEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column('varchar',)
    name:string


    @Field(()=>UserEntity)
    @ManyToOne(()=>UserEntity, user=>user.dashboards,{nullable:true})
    user?: UserEntity


    @Field()
    @CreateDateColumn()
    createdAt: Date

    @Field()
    @UpdateDateColumn()
    updatedAt: Date

    @Field()
    @Column('varchar',{nullable:true})
    status?:string

    @Field(()=>[ShapeEntity],{nullable:true})
    @OneToMany(()=>ShapeEntity, shape=>shape.dashboard,{nullable:true,cascade:true})
    shapes?: ShapeEntity[]

}