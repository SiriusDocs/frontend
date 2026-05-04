import React from 'react';

const Roadmap = ({ currentStep, steps }: { currentStep: number; steps: { id: number; title: string }[] }) => {
    const progressWidth = ((currentStep - 1) / (steps.length - 1)) * 100;

    return (
        <div className="w-full max-w-4xl mx-auto py-8 px-4 font-sans">
            <h1 className="text-3xl font-light text-creating-lable-color mb-6">
                Заполнение ПУД
            </h1>
            <div className="relative flex justify-between items-center w-full">
                <div className="absolute top-5 left-0 right-0 h-[8px] bg-on-footer-accent-color -z-10 rounded-full" />

                <div className="absolute top-5 left-0 h-[8px] bg-accent -z-10 transition-all duration-800 ease-in-out rounded-full" style={{ width: `${progressWidth}%` }} />
            
                {steps.map((step) => {
                    const isActive = step.id === currentStep;
                    const isCompleted = step.id <= currentStep;

                    return(
                        <div key={step.id} className="relative flex flex-col items-center">
                            <div 
                                className={`w-12 h-12 flex items-center justify-center rounded-full text-xl text-white font-medium transition-colors duration-300 ${isCompleted ? 'bg-accent' : 'bg-on-footer-accent-color text-transperent'}`}>
                                    {isCompleted ? step.id : ''}
                            </div>

                            <div 
                                className={`absolute top-12 text-md font-medium whitespace-nowrap text-center transition-opacity duration-300 ${isActive ? 'opacity-100 text-accent' : 'opacity-0 pointer-events-none'}`}>
                                    {step.title}
                            </div>
                        </div>
                    )
                })}
                            
            </div>
        </div>
    )
}

export default Roadmap;