import api from "./axiosInstance";
import type { GetPendingUsersDto, GetPendingUsersResponse, AssignRoleDto, AssignRoleResponse } from "../types/admin";

export const adminApi = {
    getPendingUsers: async (params?: GetPendingUsersDto) => {
        const response = await api.get<GetPendingUsersResponse>('/admin/pending-users', { 
            params: {
                limit: params?.limit ?? 10,
                offset: params?.offset ?? 0
            } 
        });
        return response.data.data;
    },

    assignRole: async (data: AssignRoleDto) => {
        const response = await api.post<AssignRoleResponse>('/admin/assign-role', data);
        return response.data;
    },
};