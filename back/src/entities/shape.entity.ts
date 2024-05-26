import {Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Field, ID, ObjectType} from "@nestjs/graphql";
import {ShapeValueEntity} from "./shape-value.entity";
import {DashboardEntity} from "./dashboard.entity";


@ObjectType()
@Entity('shapes')
export class ShapeEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column('integer',{nullable:false})
    x: number

    @Field(() => ID)
    @Column('integer',{nullable:false})
    y: number

    @Field()
    @Column('varchar',{nullable:false,default:'square'})
    type: string

    @Field(() => ID)
    @Column('integer',{nullable:false})
    width: number

    @Field(() => ID)
    @Column('integer',{nullable:false})
    height: number

    @Field(() => ID)
    // @Column('integer',{nullable:false})
    @OneToOne(()=>ShapeValueEntity)
    value: ShapeValueEntity


    @Field()
    @Column('integer',{nullable:false})
    z: number

    @Field(()=>DashboardEntity)
    @ManyToOne(()=>DashboardEntity,dashboard=>dashboard.shapes)
    dashboard: DashboardEntity

    @Field()
    @CreateDateColumn()
    createdAt?:Date

    @Field()
    @UpdateDateColumn()
    updatedAt?:Date

}