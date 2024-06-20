import axios, { AxiosResponse } from "axios";
import { IPagination } from "@/models/IPagination";
import { API_URL } from "@/config/settings";
import { IParticipant } from "@/models/IParticipant";

async function getAllParticipants(queryParams: string): Promise<AxiosResponse<IPagination<IParticipant>, unknown>> {
    return await axios.get(`${API_URL}/participants?` + queryParams);
}

export { getAllParticipants };
