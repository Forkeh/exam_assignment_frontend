import { API_URL } from "@/config/settings";
import IBook from "@/models/IBook";
import axios, { AxiosResponse } from "axios";

function getAllBooks(): Promise<AxiosResponse<IBook[]>> {
    return axios.get(`${API_URL}/books`);
}

export { getAllBooks };
