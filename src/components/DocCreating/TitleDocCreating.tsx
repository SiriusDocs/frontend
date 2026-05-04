import React, {useState} from "react";
import Roadmap from "./Roadmap";

export const TitleDocCreating = () => {

    const [formData, setFormData] = useState({
        disciplineName: '',
        disciplineType: 'practice',
        agreedBy: '',
        approvedBy: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePreview = () => {

    };

    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
        { id: 1, title: 'Титульный лист'},
        { id: 2, title: 'Общая характеристика'},
        { id: 3, title: 'Содержание дисциплины'},
        { id: 4, title: 'Оценочные материалы'},
        { id: 5, title: 'Информационное обеспечение дисциплины'},
        { id: 6, title: 'Техническое обеспечение дисциплины'},
        { id: 7, title: 'Методические материалы'},
    ];

    const handleNext = () => {
        if (currentStep < steps.length) setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    // Пока заглушка для первой странички
    return (
       <div className="min-h-screen p-8">
            <Roadmap currentStep={currentStep} steps={steps} />

            <div className="bg-white rounded-xl shadow-md p-8 mt-12 max-w-4xl mx-auto min-h-[400px] flex flex-col justify-between">
                
                {currentStep === 1 && (
                    <div className="flex flex-col flex-grow">
                        <div className="grid grid-cols-2 gap-x-16 gap-y-4 w-full max-w-3xl mx-auto mt-4">
                            <div className="flex flex-col">
                                <label className="text-xl text-creating-lable-color font-medium mb-1.5">
                                    Название учебной дисциплины
                                </label>

                                <div className="rounded-[6px] bg-gradient-to-r from-start-grade-color to-end-grade-color p-[1px] w-full">
                                    <input
                                        type="text"
                                        name="disciplineName"
                                        value={formData.disciplineName}
                                        onChange={handleChange}
                                        className="w-full h-full rounded-[5px] bg-creating-input-color px-3 py-1.5 text-md outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col justify-self-end w-[70%]">
                                <label className="text-xl text-creating-lable-color font-medium mb-2">
                                    Согласована:
                                </label>

                                <div className="rounded-[6px] bg-gradient-to-r from-start-grade-color to-end-grade-color p-[1px]">
                                    <input
                                        type="text"
                                        name="agreedBy"
                                        placeholder="Кем?"
                                        value={formData.agreedBy}
                                        onChange={handleChange}
                                        className="w-full h-full rounded-[5px] bg-creating-input-color px-3 py-1.5 text-md outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-16">
                                <label className="flex items-center space-x-2 cursor-pointer group">
                                    <input 
                                        type="radio"
                                        name="disciplineType"
                                        value="practice"
                                        checked={formData.disciplineType === "practice"}
                                        onChange={handleChange}
                                        className="w-4 h-4 accent-start-grade-color cursor-pointer"
                                    />
                                    <span className="text-xl text-creating-lable-color">Практика</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer group">
                                    <input 
                                        type="radio"
                                        name="disciplineType"
                                        value="module"
                                        checked={formData.disciplineType === "module"}
                                        onChange={handleChange}
                                        className="w-4 h-4 accent-start-grade-color cursor-pointer"
                                    />
                                    <span className="text-xl text-creating-lable-color">Модуль</span>
                                </label>
                            </div>


                            <div className="flex flex-col justify-self-end w-[70%]">
                                <label className="text-xl text-creating-lable-color font-medium mb-2">
                                    Утверждена:
                                </label>
                                <div className="rounded-[6px] bg-gradient-to-r from-start-grade-color to-end-grade-color p-[1px]">
                                    <input
                                        type="text"
                                        name="approvedBy"
                                        placeholder="Кем?"
                                        value={formData.approvedBy}
                                        onChange={handleChange}
                                        className="w-full h-full rounded-[5px] bg-creating-input-color px-3 py-1.5 text-md outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}  

                <div className="flex justify-between items-center mt-12 md:pr-24 relative">
                    <button 
                        onClick={handlePreview}
                        className="bg-gradient-to-r from-start-grade-color to-end-grade-color hover:opacity-90 text-white text-xl font-medium px-8 py-2.5 rounded-[5px] transition-all shadow-md"
                    >
                        Предпросмотр
                    </button>    
                    <button
                        onClick={handleNext}
                        className="bg-gradient-to-r from-start-grade-color to-end-grade-color hover:opacity-90 text-white text-xl font-medium px-8 py-2.5 rounded-[5px] transition-all z-10 shadow-md"
                    >
                        Далее
                    </button>    
                </div> 
            </div>
       </div>

    )
}