import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DashboardEntity} from "../entities/dashboard.entity";
import {Repository} from "typeorm";
import {CreateDashboardInput} from "./inputs/create-dashboard.input";
import {GetDashboardInput} from "./inputs/get-dashboard.input";
import {UpdateDashboardInput} from "./inputs/update-dashboard.input";

@Injectable()
export class DashboardsService {
    constructor(
        @InjectRepository(DashboardEntity)
        private readonly dashBoardRepository:Repository<DashboardEntity>
    ) {
    }

    async createDashboard(dashboardInput:CreateDashboardInput):Promise<DashboardEntity>{
        return this.dashBoardRepository.save(dashboardInput)
    }

    async getAllDashBoards():Promise<DashboardEntity[]>{
        return this.dashBoardRepository.find()
    }

    async getDashBoard(getDashboardInput:GetDashboardInput):Promise<DashboardEntity|undefined>{
        if (!getDashboardInput.userId && !getDashboardInput.name && !getDashboardInput.id) {
            return
        }
        const query = this.dashBoardRepository.createQueryBuilder('dashboard')
            .leftJoinAndSelect('dashboard.shapes', 'shapes');
        if (getDashboardInput.userId) {
            query.orWhere('dashboard.user.id = :userId', {userId: getDashboardInput.userId})
        }

        if (getDashboardInput.name) {
            query.orWhere('dashboard.name = :name', {name: getDashboardInput.name})
        }

        if (getDashboardInput.status) {
            query.andWhere('dashboard.status = :status', {status: getDashboardInput.status})
        }

        return await query.getOne();
    }

    async updateDashboard(updateDashboardInput:UpdateDashboardInput){

        return this.dashBoardRepository
            .update({
                id:updateDashboardInput.id
            }, {
                shapes:updateDashboardInput.shapes
            })
    }

    // async createDashboard(dashboardInput:CreateDashboardInput):Promise<DashboardEntity>{
    //     return this.dashBoardRepository.save(dashboardInput)
    // }

}
