import React, { useState } from "react";
import { InputFile } from "../components/TemplateCreating/InputFile";
import { TypeSelectField } from "../components/TemplateCreating/TypeSelectField";
import { templateApi } from "../api/templateApi";
import { type AllowedParamTypes } from "../types/template";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

type PageStep = "upload" | "processing" | "mapping" | "success";

export const TemplatePage = () => {

    const [step, setStep] = useState<PageStep>("upload");
    const [error, setError] = useState<string | null>(null);

    const [taskId, setTaskId] = useState<string | null>(null);
    const [fields, setFields] = useState<string[]>([]);

    const [fieldTypes, setFieldTypes] = useState<Record<string, AllowedParamTypes>>({});
    
    const handleFileUpload = async(file: File) => {
        try {
            setError(null);
            setStep("processing");

            const response = await templateApi.uploadFile({ file });
            const currentTaskId = response.data.task_id;
            setTaskId(currentTaskId);
            console.log(currentTaskId);
            
            let inProcess = true;
            while(inProcess){
                const taskStatus = await templateApi.getStatus({ task_id: currentTaskId });
                
                if (taskStatus.status === "error") {
                    throw new Error(taskStatus.message || "Ошибка парсинга");
                }
                
                if ("data" in taskStatus){
                    if ("names" in taskStatus.data) {
                        console.log(taskStatus.data.names);
                        setFields(taskStatus.data.names);
                        setStep("mapping");
                        inProcess = false;
                    }
                    else if ("status" in taskStatus.data && taskStatus.data.status === "processing") {
                        console.log("Wait");
                        await delay(2000);
                    } 
                }
            }
        } catch(error: any){
            setError(error.message || "Произошла ошибка");
            setStep("upload");
        }
    };

    const handleTypeChange = (fieldName: string, newType: AllowedParamTypes) => {
        setFieldTypes(prev => ({
            ...prev,
            [fieldName]: newType
        }));
    };

    const handleSubmit = async () => {
        if (!taskId) return;
        setError("");
        try {
            setStep("processing");
            const response = await templateApi.createTemplate({
                task_id: taskId,
                params: fieldTypes,
            });

            if (response.status === "success") {
                setStep("success");
            }
        } catch (err: any) {
            setError("Ошибка при сохранении параметров");
            setStep("mapping"); 
        }
    }

    const isAllFieldsMapped = fields.length > 0 && fields.every(field => fieldTypes[field]);

    return(
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-2xl text-center mb-6">Тестовая страничка загрузки шаблона</h1>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-center">
                        {error}
                    </div>
                )}

                <div className="bg-white rounded-3xl shadow-xl p-8">
                    {step === "upload" && (
                        <InputFile onFileSelect={handleFileUpload} />
                    )}

                    {step === "processing" && (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="w-16 h-16 border-4 border-gray-200 border-t-cyan-color rounded-full animate-spin mb-6" />
                            <h2 className="text-xl font-semibold text-cyan-color">Пожалуйста, подождите</h2>
                        </div>
                    )}

                    {step === "mapping" && (
                        <div className="animate-fade-in">
                            <h2 className="text-xl font-semibold mb-6 text-gray-800 pb-4">
                                Укажите типы данных для найденных переменных
                            </h2>

                            <div className="flex flex-col gap-3 mb-8 bg-gray-50 p-4 rounded-2xl">
                                {fields.map((fieldName) => (
                                    <TypeSelectField
                                        key={fieldName}
                                        name={fieldName}
                                        value={fieldTypes[fieldName] || ""}
                                        onChange={handleTypeChange}
                                    />
                                ))}
                            </div>

                            <button 
                                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                                    isAllFieldsMapped
                                    ? "bg-cyan-color hover:bg-cyan-600 text-white shadow-md shadow-cyan-color"
                                    : "bg-on-footer-color text-on-footer-accent-color cursor-not-allowed"
                                }`}
                                disabled={!isAllFieldsMapped}
                                onClick={handleSubmit}
                            >
                                {isAllFieldsMapped ? "Создать шаблон" : "Заполните все поля"}
                            </button>
                        </div>
                    )}

                    {step === "success" && (
                     <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Шаблон успешно создан!</h2>
                            <p className="text-gray-500 mb-8">Теперь вы можете использовать его для генерации документов.</p>
                            <button 
                                onClick={() => window.location.reload()} 
                                className="text-cyan-600 font-semibold hover:underline"
                            >
                                Загрузить еще один
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}