import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService){}

    @Inject(UsersService)
    private readonly userService : UsersService;
    
    public async validateUser(username:number, password: string) : Promise<User> {
        const user = await this.userService.getById(username);

        
        if (bcrypt.compareSync(password,user.password)){
            return user;
        } 
        
        return undefined;
    }
    /*
    validateUserLogin(user : User) {
        return this.validateUser(String(user.id), user.password);
    }*/

    async login(user: any) {
        const payload = { username: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
