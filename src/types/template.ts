export type AllowedParamTypes = 
    | "string" | "text"
    | "int" | "integer" | "number"
    | "float" | "double"
    | "bool" | "boolean"
    | "date" | "datetime" | "timestamp";

export interface UploadDto {
    file: File;
}

export interface UploadResponse {
    status: "success",
    data: {
        task_id: string;
    };
}

export interface CreateTempDto {
    params: Record<string, AllowedParamTypes>;
    task_id: string;
}

export interface CreateTempSuccess {
    data: {
        template_id: string;
    };
    message: string;
    status: string;
}

export interface CreateTempError {
    message: string;
    status: string;
}

export interface GetStatusDto {
    task_id: string;
}

export interface GetStatusSuccess {
    status: string;
    message?: string;
    data: {
        names: string[];
    };
}

export interface GetStatusProcessing {
    status: string;
    message?: string;
    data: {
        status: "processing";
    };
}

export interface GetStatusError {
    status: "error";
    message: string;
}

export type CreateTempResponse = CreateTempSuccess | CreateTempError;
export type GetStatusRespone = GetStatusSuccess | GetStatusProcessing | GetStatusError;