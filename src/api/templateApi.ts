import api from "./axiosInstance";
import type { UploadDto, UploadResponse, GetStatusDto, GetStatusRespone, CreateTempDto, CreateTempResponse } from "../types/template";

export const templateApi = {
    uploadFile: async (data: UploadDto) => {
        const formData = new FormData();
        formData.append('file', data.file);
        const response = await api.post<UploadResponse>('/temp/files/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    getStatus: async (data: GetStatusDto) => {
        const response = await api.get<GetStatusRespone>(`/temp/files/status/${data.task_id}`);
        return response.data;
    },

    createTemplate: async (data: CreateTempDto) => {
        const response = await api.post<CreateTempResponse>('/temp/params/create', data);
        return response.data
    },
}