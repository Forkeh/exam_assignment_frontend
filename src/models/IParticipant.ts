export interface IParticipant {
    id?: number;
    name: string;
    gender: string;
    age: number;
    club: string;
    disciplines: Array<string | number>;
}
