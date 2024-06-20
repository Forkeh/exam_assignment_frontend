import axios, { AxiosResponse } from "axios";
import { API_URL } from "@/config/settings";
import { IDiscipline } from "@/models/IDiscipline";
import { IResult } from "@/models/IResult";
import { IPagination } from "@/models/IPagination";

async function getAllDisciplines(): Promise<AxiosResponse<IPagination<IResult>, unknown>> {
    return await axios.get(`${API_URL}/disciplines`);
}

export { getAllDisciplines };
