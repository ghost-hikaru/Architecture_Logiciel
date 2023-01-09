import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssociationsService } from 'src/associations/associations.service';
import { UsersService } from 'src/users/users.service';
import { getRepository } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
    
    @Inject(UsersService)
    private readonly userService : UsersService;
    @Inject(AssociationsService)
    private readonly assoService : AssociationsService;
    
    constructor(
        @InjectRepository(Role)
        private repository: Repository<Role>,
    ){}

    async getAll():Promise<Role[]>{
        return await this.repository.find();
    }

    async create(name:string,idUsers: number, idAssociation : number): Promise<Role> {
        const newRole = await this.repository.create({name: name}); 
        let user = (await this.userService.getById(idUsers));
        let association = (await this.assoService.getById(idAssociation));

        newRole.users = user;
        newRole.association = association;
        
        this.repository.save(newRole);
        return newRole;
    }

    async getById(idUser : number, idAssociation : number):Promise<Role>{
        let usersFind = (await this.userService.getById(idUser));
        let associationFind = (await this.assoService.getById(idAssociation));
        if(associationFind === null){
            throw new HttpException('Could not find a association with the id ${parametre.id}', 404);
        }
        return await this.repository.findOneBy({users: usersFind,association: associationFind});
    
    }

    
    async getMaj(name:string, idUser: number, idAsso: number ):Promise<Role>{
        if(name !== undefined){
            (await this.getById(idUser,idAsso)).name = name;
        }
        return this.getById(idUser,idAsso);
    }

    async delete(idUser:number, idAsso:number):Promise<Role[]>{
        await this.repository.delete((await this.getById(idUser,idAsso)));
        return this.getAll();
    }

}
