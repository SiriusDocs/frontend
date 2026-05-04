import api from "./axiosInstance";
import type { UserProfile } from "../types/profile";

export const profileApi = {
    getMe: async (): Promise<UserProfile> => {
        const response = await api.get('/profile/me');
        return response.data.data ? response.data.data : response.data;
    }
};