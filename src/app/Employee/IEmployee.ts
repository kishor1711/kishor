import { ISkill } from '../Employee/ISkill'
export class IEmployee{
    id:number;
    fullName:string;
    email:string;
    phone?:number;
    contactPreference:string;
    skills:ISkill[];

}