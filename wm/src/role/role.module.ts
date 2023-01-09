import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Association } from 'src/associations/associations.entity';
import { AssociationsModule } from 'src/associations/associations.module';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { RoleController } from './role.controller';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports : [AssociationsModule,UsersModule,TypeOrmModule.forFeature([Role,User,Association])],
  exports : [RoleService]
})
export class RoleModule {}
