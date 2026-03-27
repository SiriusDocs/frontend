import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const AuthPage = () => {
    const { login } = useAuth();
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        if (error) setError('');
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login( formData )
        } catch (err: any) {
            if (err.response) {
                const status = err.response.status;

                if (status === 401){
                    setError('Неверный email или пароль')
                } else if (status === 500){
                    setError('Ошибка сервера. Попробуйте позже')
                }
            } else if (err.request) {
                setError('Сервер не отвечает')
            } else {
                setError('Произошла неизвестная ошибка')
            }
        }
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center">
            <div className="w-full max-w-xs text-left mb-8">
                <h1 className="text-2xl font-semibold text-title-color">
                    Здравствуйте!
                    <br />
                    Войдите в систему
                </h1>
            </div>

            <form 
                className="w-full max-w-xs flex flex-col justify-center shadow-md rounded-xl p-4" 
                onSubmit={handleSubmit}
            >
                <div className="flex justify-center mb-6">
                    <img 
                        className="max-h-[40px] h-16 w-auto mb-4" 
                        src="/src/assets/profile.svg"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="font-medium text-left text-sm text-on-footer-color mb-1 ml-1">
                        Email
                    </label>

                    <input 
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-input-color border border-transparent focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none rounded-lg p-1.5 transition-all"  
                        required
                    />
                </div>
                
                <div className="flex flex-col mb-4">
                    <label className="font-medium text-left text-sm text-on-footer-color mb-1 ml-1">
                        Пароль
                    </label>

                    <input 
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-input-color border border-transparent focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none rounded-lg p-1.5 transition-all"  
                    />
                </div>

                {error && <div className="text-error-color text-sm text-center mb-2">{error}</div>}
                
                <button
                    type="submit"
                    className="bg-accent text-white font-medium hover:bg-accent/90 active:scale-[0.98] py-3 rounded-lg transition-all shadow-md shadow-accent/20 cursor-pointer"
                >
                    Войти
                </button>

                <div className="flex flex-col mt-6">
                    <label className="font-medium text-sm text-center">
                        Ещё нет аккаунта?{" "} 
                        <Link 
                            to="/regist"
                            className="text-accent font-semibold hover:text-dark-blue hover:underline transition-all"
                        >
                            Зарегистрируйтесь
                        </Link>
                    </label>
                </div>
            </form>
        </div>
    )
}