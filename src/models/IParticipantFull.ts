import { IDiscipline } from "./IDiscipline";

export interface IParticipantFull {
    id?: number;
    name: string;
    gender: string;
    age: number;
    club: string;
    disciplines: IDiscipline[];
    ageGroup: string;
}
