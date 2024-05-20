import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../enteties/user.entity";
import { UsersService } from './services/users/users.service';
import { UsersResolver } from './resolvers/users/users.resolver';

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity])],
    providers: [UsersService, UsersResolver]
})
export class UsersModule {}
