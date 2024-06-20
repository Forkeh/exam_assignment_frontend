import axios, { AxiosResponse } from "axios";
import { IPagination } from "@/models/IPagination";
import { API_URL } from "@/config/settings";
import { IResult } from "@/models/IResult";
import { IResultRequest } from "@/models/IResultRequest";

async function getAllResults(queryParams: string): Promise<AxiosResponse<IPagination<IResult>, unknown>> {
    return await axios.get(`${API_URL}/results?` + queryParams);
}

async function createResult(data: IResultRequest): Promise<AxiosResponse<IResult, unknown>> {
    return await axios.post(`${API_URL}/results`, data);
}

async function updateResult(data: IResultRequest): Promise<AxiosResponse<IResult, unknown>> {
    return await axios.put(`${API_URL}/results/${data.id}`, data);
}

export { getAllResults, createResult, updateResult };
