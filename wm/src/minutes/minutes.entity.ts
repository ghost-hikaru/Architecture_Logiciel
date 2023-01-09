import { Association } from "src/associations/associations.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Minutes{
    @PrimaryGeneratedColumn()
    public id : number;

    @Column()
    public content : string;

    @Column()
    public date : string;

    @ManyToOne(type => Association, { eager: true })
    @JoinColumn()
    public association: Association;

    @ManyToMany(type => User, { eager: true })
    @JoinTable()
    public users: User[];
    
}