import { JoinTable, OneToMany } from "typeorm";
import { Members } from "./association.member";


export class AssociationDTO{

    public name : string;


    public membres : Members[];
    
}