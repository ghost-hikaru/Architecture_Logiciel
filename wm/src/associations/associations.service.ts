import { Injectable, Inject } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { Association } from './associations.entity';
import { UsersService } from './../users/users.service';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';


export class AssociationsService {
    @Inject(UsersService)
    private readonly userService : UsersService;

    constructor(
        @InjectRepository(Association)
        private repository: Repository<Association>,
    ){}

    async create(idUsers: number[], name:string): Promise<Association> {
        const newAssociation = await this.repository.create({name: name}); 

        let usertab : User[] = [];
        for(let i=0;i<idUsers.length;i++){
            usertab.push((await this.userService.getById(idUsers[i])));
        }
        newAssociation.users = usertab;

        this.repository.save(newAssociation);
        return newAssociation;
    }

    async getById(id:number):Promise<Association>{
        return await this.repository.findOneBy({id:(id)});
    }

    async getAll():Promise<Association[]>{
        return await this.repository.find();
    }

    async getMaj(id: number, idUsers: number[], name:string):Promise<Association>{
        if(idUsers !== undefined){
            let usertab : User[] = [];
            for(let i=0;i<idUsers.length;i++){
                usertab.push((await this.userService.getById(idUsers[i])));
            }
            (await this.getById(id)).users = usertab;
        }else if(name !== undefined){
            (await this.getById(id)).name = name;
        }
        return this.getById(id);
    }

    async delete(id:number):Promise<Association[]>{
        await this.repository.delete(id);
        return this.getAll();
    }

    async getMembre(id:number): Promise<User[]>{
       return (await this.getById(id)).users;
    }

    async getSearch(searchVar : string): Promise<Association[]>{
        let AssociationSearched:Association[] = [];
        (await this.repository.find()).forEach(association => {
        if(association.name.startsWith(searchVar) ){
            AssociationSearched.push(association);   
        }})
        return AssociationSearched;
    }

}
