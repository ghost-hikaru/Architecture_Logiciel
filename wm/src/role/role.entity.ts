import { Association } from "src/associations/associations.entity";
import { User } from "src/users/user.entity";
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";

@Entity()
export class Role{
    @PrimaryGeneratedColumn()
    public id : number;

    @ManyToOne(type => User,{eager:true})
    @JoinColumn()
    users: User;

    @ManyToOne(type => Association, {eager: true})
    @JoinColumn()
    association : Association;

    @Column()
    public name: string;

}