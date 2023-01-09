import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Minutes } from './minutes.entity';
import { UsersService } from 'src/users/users.service';
import { AssociationsService } from 'src/associations/associations.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class MinutesService {
    @Inject(UsersService)
    private readonly userService : UsersService;

    @Inject(AssociationsService)
    private readonly assoService : AssociationsService;
    
    constructor(
        @InjectRepository(Minutes)
        private repository: Repository<Minutes>,
    ){}

    async create(content : string, idVoters: number[], date : string, idAsso:number): Promise<Minutes> {
        const newMinutes = await this.repository.create({
            content: content, 
            date:date,
            association: (await this.assoService.getById(idAsso))
        }); 

        let usertab : User[] = [];
        
        for(let i=0;i<idVoters.length;i++){
            usertab.push((await this.userService.getById(idVoters[i])));
        }
        newMinutes.users = usertab;
        
        this.repository.save(newMinutes);
        return newMinutes;
    }

    async getById(id:number):Promise<Minutes>{
        return await this.repository.findOneBy({id:(id)});
    }

    async getAll():Promise<Minutes[]>{
        return await this.repository.find();
    }

    async getMaj(id: number, content : string, date : string, idUsers: number[], idAsso:number):Promise<Minutes>{
        if(idUsers !== undefined){
            let usertab : User[] = [];
            for(let i=0;i<idUsers.length;i++){
                usertab.push((await this.userService.getById(idUsers[i])));
            }
            (await this.getById(id)).users = usertab;
        }else if(content !== undefined){
            (await this.getById(id)).content = content;
        }else if(date !== undefined){
            (await this.getById(id)).date = date;
        }else if(idAsso !== undefined){
            (await this.getById(id)).association = (await this.assoService.getById(idAsso));
        }
        return this.getById(id);
    }

    async delete(id:number):Promise<Minutes[]>{
        await this.repository.delete(id);
        return this.getAll();
    }


}
