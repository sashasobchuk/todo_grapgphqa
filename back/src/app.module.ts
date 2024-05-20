import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver} from "@nestjs/apollo";

@Module({
  imports: [
      // getTypeOrmModule(),

      ConfigModule.forRoot({isGlobal:true,envFilePath:'../.env'}),
      // TypeOrmModule.forRoot(getTypeOrmModule())

      TypeOrmModule.forRootAsync({
          imports:[ConfigModule, GraphQLModule.forRoot({
              autoSchemaFile:'schema.gql',
              sortSchema:true,
              playgraund:true,
              driver:ApolloDriver
          })],
          inject:[ConfigService],
          useFactory: async (config:ConfigService)=> {
              return ({
                  // driver:ApolloDriver,
                  type: config.get<'aurora-postgres'>('TYPEORM_CONNECTION'),
                  host:config.get<'aurora-postgres'>('TYPEORM_HOST'),
                  username: config.get<string>('TYPEORM_USERNAME'),
                  password: config.get<string>('TYPEORM_PASSWORD'),
                  database: config.get<string>('TYPEORM_DATABASE'),
                  port: +config.get<number>('TYPEORM_PORT'),
                  logging: true,
                  synchronize: true,
                  autoLoadEntities: true,
                  entities: [__dirname, 'dist/**/*.entity{.ts,.js}']
              })
          }
      }),
      // UserModule,
      UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
