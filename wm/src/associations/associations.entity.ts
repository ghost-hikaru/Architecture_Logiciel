import { User } from "src/users/user.entity";
import { Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";

@Entity()
export class Association{
  @PrimaryGeneratedColumn()
  public id : number;

  @Column()
  public name : string;

  @ManyToMany(type => User, { eager: true })
  @JoinTable()
  users: User[];
}
