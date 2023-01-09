import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Association } from 'src/associations/associations.entity';
import { AssociationsModule } from 'src/associations/associations.module';
import { AssociationsService } from 'src/associations/associations.service';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { MinutesController } from './minutes.controller';
import { Minutes } from './minutes.entity';
import { MinutesService } from './minutes.service';

@Module({
  controllers: [MinutesController],
  providers: [MinutesService, AssociationsService],
  imports : [UsersModule, AssociationsModule, TypeOrmModule.forFeature([Association,User, Minutes])]
})
export class MinutesModule {}
