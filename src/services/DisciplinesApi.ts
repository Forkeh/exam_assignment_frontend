import axios, { AxiosResponse } from "axios";
import { API_URL } from "@/config/settings";
import { IDiscipline } from "@/models/IDiscipline";

async function getAllDisciplines(): Promise<AxiosResponse<IDiscipline[], unknown>> {
    return await axios.get(`${API_URL}/disciplines`);
}

// async function getAllDisciplinesNoPagination(): Promise<AxiosResponse<IResult[], unknown>> {
//     return await axios.get(`${API_URL}/disciplines/no-pagination`);
// }

export { getAllDisciplines };
