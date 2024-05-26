import { Module } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { DashboardsController } from './dashboards.controller';
import { DashboardsResolver } from './resolvers/dashboards.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {DashboardEntity} from "../entities/dashboard.entity";

@Module({
  imports:[TypeOrmModule.forFeature([DashboardEntity])],
  providers: [DashboardsService, DashboardsResolver],
  controllers: [DashboardsController]
})
export class DashboardsModule {}
