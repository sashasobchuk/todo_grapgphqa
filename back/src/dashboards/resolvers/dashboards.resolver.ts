import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {DashboardsService} from "../dashboards.service";
import {DashboardEntity} from "../../entities/dashboard.entity";
import {CreateDashboardInput} from "../inputs/create-dashboard.input";
import {GetDashboardInput} from "../inputs/get-dashboard.input";
import {UpdateDashboardInput} from "../inputs/update-dashboard.input";

@Resolver(of => DashboardEntity)
export class DashboardsResolver {
    constructor(private readonly dashboardsService:DashboardsService) {}

    @Mutation(()=>DashboardEntity)
    async createDashBoard(@Args('createDashboardInput') createDashboardInput:CreateDashboardInput){
        return this.dashboardsService.createDashboard(createDashboardInput)
    }

    @Mutation(()=>DashboardEntity)
    async updateDashBoard(@Args('updateDashboardInput') updateDashboardInput:UpdateDashboardInput){
        return this.dashboardsService.updateDashboard(updateDashboardInput)
    }

    @Query(()=>[DashboardEntity])
    async getAllDashBoards():Promise<DashboardEntity[]>{
        return this.dashboardsService.getAllDashBoards()
    }

    @Query(()=>DashboardEntity)
    async getDashBoard(@Args('getDashBoardInput') getDashboardInput:GetDashboardInput):Promise<DashboardEntity>{
        return this.dashboardsService.getDashBoard(getDashboardInput)
    }

}
