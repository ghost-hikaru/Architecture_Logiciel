import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AssociationsModule } from './associations/associations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Association } from './associations/associations.entity';
import { RoleModule } from './role/role.module';
import { Role } from './role/role.entity';
import { MinutesModule } from './minutes/minutes.module';
import { Minutes } from './minutes/minutes.entity';
import { AuthModule } from './auth/auth.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type : 'mysql',
      host : 'db',
      port : 3306,
      username : 'root',
      password : 'root',
      database : 'nest',
      entities : [User,Association,Role, Minutes],
      synchronize :  true,
    }),
    UsersModule, AssociationsModule, AuthModule, RoleModule, MinutesModule, RabbitmqModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
