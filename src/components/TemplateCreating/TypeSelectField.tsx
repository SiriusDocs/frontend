import React from 'react';
import { type AllowedParamTypes } from '../../types/template';

interface TypeSelectFieldProps {
    name: string;
    value: AllowedParamTypes | "";
    onChange: (fieldName: string, newType: AllowedParamTypes) => void;
}

export const TypeSelectField = ({ name, value, onChange}: TypeSelectFieldProps) => {
    return (
        <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
                <div className="bg-cyan-50 text-cyan-color font-mono text-sm px-3 py-1.5 rounded-xl font-medium">
                    {name}
                </div>
            </div>

            <select
                value={value}
                onChange={(e) => onChange(name, e.target.value as AllowedParamTypes)}
                className="bg-field-color text-on-footer-color text-sm rounded-lg focus:ring-cyan-color block p-2.5 outline-none min-w-[200px] cursor-pointer transition-color"    
            > 
                <option value="" disabled>Выберите тип</option>
                <optgroup label="Текст">
                    <option value="string">Строка</option>
                    <option value="text">Длинный текст</option>
                </optgroup>
                <optgroup label="Числа">
                    <option value="int">Целое число</option>
                    <option value="float">Дробное число</option>
                </optgroup>
                <optgroup label="Логические">
                    <option value="boolean">Да / Нет</option>
                </optgroup>
                <optgroup label="Время и дата">
                    <option value="date">Дата</option>
                    <option value="datetime">Дата и время</option>
                </optgroup>
            </select>
        </div>
    )
}