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
import {DashboardEntity} from "./dashboard.entity";


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

    @Field(()=>DashboardEntity)
    @OneToMany(()=>DashboardEntity, dashboard =>dashboard.user)
    dashboards: DashboardEntity[]
}