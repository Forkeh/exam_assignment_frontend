import { IDiscipline } from "./IDiscipline";
import { IParticipant } from "./IParticipant";

export interface IResult {
    id: number;
    discipline: IDiscipline;
    participant: IParticipant;
    result: string;
}
