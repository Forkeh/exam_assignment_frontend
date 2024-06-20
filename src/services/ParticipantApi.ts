import axios, { AxiosResponse } from "axios";
import { IPagination } from "@/models/IPagination";
import { API_URL } from "@/config/settings";
import { IParticipant } from "@/models/IParticipant";

async function getAllParticipants(queryParams: string): Promise<AxiosResponse<IPagination<IParticipant>, unknown>> {
    return await axios.get(`${API_URL}/participants?` + queryParams);
}

async function createParticipant(data: IParticipant): Promise<AxiosResponse<IParticipant, unknown>> {
    return await axios.post(`${API_URL}/participants`, data);
}

async function updateParticipant(data: IParticipant): Promise<AxiosResponse<IParticipant, unknown>> {
    return await axios.put(`${API_URL}/participants/${data.id}`, data);
}

async function deleteParticipant(id: number): Promise<AxiosResponse<IParticipant, unknown>> {
    return await axios.delete(`${API_URL}/participants/${id}`);
}

export { getAllParticipants, deleteParticipant, createParticipant, updateParticipant };
