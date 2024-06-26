import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UsersService} from "../../services/users/users.service";
import {UserEntity} from "../../../entities/user.entity";
import {CreateUserInput} from "../../inputs/create-user.input";
import {UpdateUserInput} from "../../inputs/update-user.input";

@Resolver('User')
export class UsersResolver {
    constructor(private readonly userService:UsersService) {

    }

    @Mutation(()=>UserEntity)
    async createUser(@Args('createUser') createUserInput:CreateUserInput):Promise<UserEntity>{
        return this.userService.createUser(createUserInput)
    }

    @Mutation(()=>UserEntity)
    async updateUser(@Args('updateUser') updateUserInput:UpdateUserInput):Promise<UserEntity>{
        return this.userService.updateUser(updateUserInput)
    }

    @Mutation(()=>Number)
    async removeUser(@Args('id') id:number):Promise<number>{
        return this.userService.removeUser(id)
    }

    @Query(()=>UserEntity)
    async getOneUser(@Args('id') id:number):Promise<UserEntity>{
        return this.userService.getOneUser(id)
    }

    @Query(()=>[UserEntity])
    async getAllUsers():Promise<UserEntity[]>{
        return this.userService.getAllUsers()
    }


}
