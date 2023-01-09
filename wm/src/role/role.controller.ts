import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put } from '@nestjs/common';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { RoleInput } from './role.input';
import { UsersService } from 'src/users/users.service';
import { AssociationsService } from 'src/associations/associations.service';

@ApiTags('Rôle')
@Controller('role')
export class RoleController {
    
  constructor(private service: RoleService,){}

  @Inject(UsersService)
  private readonly userService : UsersService;
  @Inject(AssociationsService)
  private readonly associationService : AssociationsService;

  //@UseGuards(AuthGuard('jwt'))
  @ApiTags('Get')
  @Get()
  getAll(): Promise<Role[]>{   
    return this.service.getAll();;
  }

  
  //@ApiCreatedResponse({description: 'The role has been successfully created.'})
  @ApiTags('Création')
  @Post()
  create(@Body() input: RoleInput): Promise<Role> {
    return this.service.create(input.name,input.idUser,input.idAssociation);
  }

  @ApiTags('Get')
  @Get(':idU/:idA')
  async getById(@Param() parametre): Promise<Role>{ 
    let assoId = await this.associationService.getById(parametre.idA);
    let userId = await this.userService.getById(parametre.idU);


    if(assoId === undefined || assoId === null){
      throw new HttpException('Could not find a user with the id ${parametre.id}', HttpStatus.NOT_FOUND);
    }else if(userId === undefined){
      throw new HttpException('Could not find a association with the id ${parametre.id}', HttpStatus.NOT_FOUND);
    }

    return this.service.getById(parametre.idU, parametre.idA);
  }


  
  @ApiTags('Mise à jour')
  @Put(':idU/:idA')
  getMAJ(@Param() parametre,@Body() input: any): Promise<Role>{
    let assoId = this.associationService.getById(parametre.idA);
    let userId = this.userService.getById(parametre.idU);

    if(userId === undefined){
      throw new HttpException('Could not find a user with the id ${parametre.id}', HttpStatus.NOT_FOUND);
    }else if(assoId === undefined){
      throw new HttpException('Could not find a association with the id ${parametre.id}', HttpStatus.NOT_FOUND);
    }

    return  this.service.getMaj(input.name,parametre.idU,parametre.idA);
  }

  @ApiTags('Delete')
  @Delete(':idU/:idA')
  suppr(@Param() parametre): Promise<Role[]>{
    let assoId = this.associationService.getById(parametre.idA);
    let userId = this.userService.getById(parametre.idU);

    if(userId === undefined){
      throw new HttpException('Could not find a user with the id ${parametre.id}', HttpStatus.NOT_FOUND);
    }else if(assoId === undefined){
      throw new HttpException('Could not find a association with the id ${parametre.id}', HttpStatus.NOT_FOUND);
    }
    return this.service.delete(parametre.idU,parametre.idA);
  }
  
}
