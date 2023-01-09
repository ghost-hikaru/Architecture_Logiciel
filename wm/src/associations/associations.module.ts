import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { AssociationsController } from './associations.controller';
import { Association } from './associations.entity';
import { AssociationsService } from './associations.service';

@Module({
    controllers: [AssociationsController],
    providers: [AssociationsService],
    imports : [UsersModule, TypeOrmModule.forFeature([Association,User])],
    exports : [AssociationsService]
})
export class AssociationsModule {}
