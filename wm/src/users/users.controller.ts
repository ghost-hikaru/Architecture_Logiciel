import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { UserInput } from './userInput';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/role/role.entity';


@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private service: UsersService){}

  //@UseGuards(AuthGuard('jwt'))
  @ApiTags('Get')
  @Get()
  getAll(): Promise<User[]>{
    return this.service.getAll();
  }
  @Get(':searching/ByName')
  public async getSearch(@Param() parametre): Promise<User[]>{
    return this.service.getSearch(parametre.searching);
  }

  //@UseGuards(AuthGuard('jwt'))
  @ApiTags('Get')
  @Get(':id')
  async getById(@Param() parametre): Promise<User>{  
    let userId = await this.service.getById(parametre.id);
    if(userId === undefined || userId === null){
      throw new HttpException('Could not find a user with the id ${parametre.id}', 404);
    }
    return userId;
  }

  @ApiTags('Création')
  @Post()
  @ApiCreatedResponse({description: 'The user has been successfully created.'})
  create(@Body() input: UserInput): Promise<User> {
    return this.service.create(input.firstname,input.lastname,input.age,input.password);
  }

  @ApiTags('Mise à jour')
  @Put(':id')
  getMAJ(@Param() parametre,@Body() input: any): Promise<User>{
    let userMaj =  this.service.getById(parametre.id);
    if(userMaj === undefined){
      throw new HttpException('Could not find a user with the id ${parametre.id}', HttpStatus.NOT_FOUND);
    }
    return this.service.getMaj(parametre.id,input.firstname,input.lastname,+input.age);
  }

  @ApiTags('Delete')
  @Delete(':id')
  public async suppr(@Param() parametre): Promise<User[]>{
    let userDelete =  this.service.getById(parametre.id);
    if(userDelete === undefined){
      throw new HttpException('Could not find a user with the id ${parametre.id}', HttpStatus.NOT_FOUND);
    }
    return this.service.delete(parametre);
  }


  /*
  @ApiTags('Get')
  @Get(':id/roles')
  getRoles(@Param() parametre): Promise<Role[]>{
    let user =  this.service.getById(parametre.id);
    if(user === undefined){
      throw new HttpException('Could not find a user with the id ${parametre.id}', HttpStatus.NOT_FOUND);
    }
    return this.service.getRole(parametre.id);
  }*/

}
