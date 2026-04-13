interface InputFileProps {
    onFileSelect?: (file: File) => void;
}

export const InputFile = ({ onFileSelect }: InputFileProps) => {
    return (
        <div className="mb-16 w-full flex flex-col items-center">
            <label className="bg-white shadow-md rounded-2xl w-full p-12 text-center cursor-pointer hover:opacity-50">
                <input 
                    type="file" 
                    className="sr-only" 
                    accept=".rtf,.odt,.docx" 
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file && onFileSelect) {
                            onFileSelect(file);
                        }
                    }}
                />
                <span className="text-xl text-cyan-color">Загрузить файл шаблона</span>
            </label>
        </div>
    )
}