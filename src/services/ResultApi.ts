import axios, { AxiosResponse } from "axios";
import { IPagination } from "@/models/IPagination";
import { API_URL } from "@/config/settings";
import { IResult } from "@/models/IResult";

async function getAllResults(queryParams: string): Promise<AxiosResponse<IPagination<IResult>, unknown>> {
    return await axios.get(`${API_URL}/results?` + queryParams);
}

export { getAllResults };
