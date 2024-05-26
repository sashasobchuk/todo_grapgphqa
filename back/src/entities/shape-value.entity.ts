import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Field, ID, ObjectType} from "@nestjs/graphql";


@ObjectType()
@Entity('shape_values')
export class ShapeValueEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column('varchar',{nullable:true})
    text: string

}