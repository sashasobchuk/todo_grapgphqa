import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Field, ID, ObjectType} from "@nestjs/graphql";


@ObjectType()
@Entity('users')
export class UserEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @CreateDateColumn()
    createdAt: Date

    @Field()
    @UpdateDateColumn()
    updatedAt: Date

    @Field()
    @Column('varchar')
    email: string

    @Field({nullable: true})
    @Column('varchar', {nullable: true})
    name: string
}