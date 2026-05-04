export interface PendingUser {
    user_id: number;
    username: string;
    email: string;
    created_at: string;
}

export interface GetPendingUsersDto {
    limit?: number;
    offset?: number;
}

export interface GetPendingUsersResponse {
    status: string;
    data: {
        total_count: number;
        users: PendingUser[];
    }
}

export interface AssignRoleDto {
    new_role: string;
    target_user_id: number;
}

export interface AssignRoleResponse {
    [key: string]: any;
}