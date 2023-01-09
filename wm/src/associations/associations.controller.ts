import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { Association } from './associations.entity';
import { AssociationsService } from './associations.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Association')
@Controller('associations')
export class AssociationsController {
  constructor(private service: AssociationsService){}

  //@UseGuards(AuthGuard('jwt'))
  @ApiTags('Get')
  @Get()
  getAll(): Promise<Association[]>{   
    return this.service.getAll();;
  }
  @Get(':searching/ByName')
  async getSearch(@Param() parametre): Promise<Association[]>{
    return this.service.getSearch(parametre.searching);
  }
  
  //@UseGuards(AuthGuard('jwt'))
  @ApiTags('Get')
  @Get(':id')
  async getById(@Param() parametre): Promise<Association>{  
    let assoId = await this.service.getById(parametre.id);
    if(assoId === undefined){
      throw new HttpException('Could not find a association with the id ${parametre.id}', HttpStatus.NOT_FOUND);
    }
    return this.service.getById(parametre.id);
  }

  @ApiTags('Création')
  @Post()
  create(@Body() input: any): Promise<Association> {
    this.service.create(input.idUsers,input.name);
    return input;
  }

  @ApiTags('Mise à jour')
  @Put(':id')
  getMAJ(@Param() parametre, @Body() input: any): Promise<Association>{
    let assoMAJ = this.service.getById(parametre.id);
    if(assoMAJ === undefined){
      throw new HttpException('Could not find a association with the id ${parametre.id}', HttpStatus.NOT_FOUND);
    }
    return this.service.getMaj(parametre.id,input.idUsers,input.name);
  }

  @ApiTags('Delete')
  @Delete(':id')
  suppr(@Param() parametre): Promise<Association[]>{
    let assoDelete = this.service.getById(parametre.id);
    if(assoDelete === undefined){
      throw new HttpException('Could not find a association with the id ${parametre.id}', HttpStatus.NOT_FOUND);
    }
    return this.service.delete(parametre.id);
  }
  
  @ApiTags('Get')
  @Get(':id/members')
  getMembers(@Param() parameter): Promise<User[]>{
    let assoMembre = this.service.getById(parameter.id);
    if(assoMembre === undefined){
      throw new HttpException('Could not find a association with the id ${parametre.id}', HttpStatus.NOT_FOUND);
    }
    return this.service.getMembre(parameter.id);
  }

}
