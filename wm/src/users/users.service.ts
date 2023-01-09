import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/role/role.entity';
import { RoleService } from 'src/role/role.service';



@Injectable()
export class UsersService {    
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>,
        //@Inject(forwardRef(() => RoleService))
        //private readonly roleService : RoleService
    ){}
    
    /*
    async getRole(id: number): Promise<Role[]> {
        let roles = this.roleService.getAll();
        console.log(roles);
        let usersrole: Role[] = [];
        for(let i=0; i<(await roles).length;i++){
            if(roles[i].users === this.getById(id)){
                usersrole.push(roles[i]);   
            }
        }
        return usersrole;
    }*/

    async create(firstname: string, lastname:string, age:number, motDePasse:string): Promise<User> {
        const password: string = motDePasse;
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);

        const neUwU = await this.repository.create({
            firstname: firstname,
            lastname: lastname,
            age: age,
            password: hash
        });
        this.repository.save(neUwU);
        return neUwU;
    }

    getById(idU:number): Promise<User>{
        return this.repository.findOneBy({id:(idU)});
    }

    getAll():Promise<User[]>{
        return this.repository.find();
    }

    async getMaj(id:number,firstname: string, lastname:string, age: number):Promise<User>{
        console.log(firstname);
        console.log(lastname);
        console.log(age);
        if(firstname !== undefined){
            //(await this.getById(id)).firstname = firstname;
            this.repository.update(id, {firstname : firstname});
        }if(lastname !== undefined){
            //(await this.getById(id)).lastname = lastname;
            this.repository.update(id, {lastname : lastname});
        }if(age !== undefined){
            //(await this.getById(id)).age = 12;
            this.repository.update(id, {age : age});
        }
        return await this.repository.findOneBy({id:(id)});
    }

    async delete(id:number):Promise<User[]>{
        await this.repository.delete(id);
        return this.getAll();
    }
    contains(search : string, userString : string): boolean{
        if(userString.startsWith(search)){return true}
        if(userString.endsWith(search)){return true}
        else{return false}
    }
    async getSearch(searchVar : string): Promise<User[]>{
        let UserSearched:User[] = [];
        (await this.repository.find()).forEach(user => {
            if(user.firstname.startsWith(searchVar)|| user.firstname.endsWith(searchVar) 
            || user.lastname.startsWith(searchVar) || user.lastname.endsWith(searchVar)|| +searchVar==user.age || +searchVar==user.id){
                UserSearched.push(user);
            }
        }) 
        return UserSearched;
    }
}
