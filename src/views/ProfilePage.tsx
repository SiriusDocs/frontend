import React, { useEffect, useState } from 'react';
import { profileApi } from '../api/SLOP_profileApi'; // Укажи свой путь
import type { UserProfile } from '../types/profile'; // Укажи свой путь
import profilePic from '../assets/profile.svg'; // Импорт твоей SVG-картинки

export const ProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await profileApi.getMe();
                setProfile(data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Не удалось загрузить профиль пользователя');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Локализация ролей для красивого вывода
    const getRoleName = (role: string) => {
        switch (role.toLowerCase()) {
            case 'teacher': return 'Учитель';
            case 'librarian': return 'Библиотекарь';
            case 'admin': return 'Администратор';
            case 'pending': return 'В ожидании';
            default: return role;
        }
    };

    // Состояние загрузки (крутилка как в админке)
    if (isLoading) return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 font-montserrat">
            <div className="w-12 h-12 border-4 border-field-color border-t-accent rounded-full animate-spin"></div>
            <p className="text-light-gray font-medium text-lg animate-pulse">Загрузка профиля...</p>
        </div>
    );

    // Состояние ошибки
    if (error) return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-[#6a1a2115] border-l-4 border-error-color text-error-color rounded-r-lg flex items-center gap-3 shadow-sm font-montserrat">
            <svg className="w-8 h-8 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-lg">{error}</span>
        </div>
    );

    // Если данные почему-то пусты
    if (!profile) return null;

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-6 font-montserrat">
            {/* Убрали transition-all и hover:shadow-xl, теперь это просто карточка */}
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg border border-divider-color overflow-hidden">
                
                {/* Декоративная шапка карточки */}
                <div className="h-32 bg-gradient-to-r from-start-grade-color to-end-grade-color relative"></div>

                <div className="px-8 pb-10 relative">
                    {/* Аватарка, вылезающая на градиент */}
                    <div className="flex justify-center -mt-16 mb-6 relative z-10">
                        <div className="w-32 h-32 bg-white rounded-full p-2 shadow-md border-2 border-selected-color">
                            <img 
                                src={profilePic} 
                                alt="Аватар профиля" 
                                className="w-full h-full object-cover rounded-full bg-field-color"
                            />
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-title-color mb-1">{profile.username}</h1>
                        <p className="text-light-gray text-sm">{profile.email}</p>
                    </div>

                    {/* Если роль pending — показываем плашку ожидания */}
                    {profile.role === 'pending' ? (
                        <div className="bg-selected-color/50 border border-selected-color rounded-2xl p-6 text-center shadow-sm">
                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-accent">
                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-dark-blue mb-2">Роль не назначена</h3>
                            <p className="text-light-gray text-sm leading-relaxed">
                                Ваша учетная запись находится на проверке. 
                                Пожалуйста, ожидайте, пока администратор назначит вам соответствующую роль.
                            </p>
                        </div>
                    ) : (
                        // Иначе выводим подробную информацию
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-field-color rounded-xl border border-divider-color">
                                <span className="text-light-gray text-sm font-medium">Ваша роль</span>
                                <span className="px-4 py-1.5 bg-gradient-to-r from-start-grade-color to-end-grade-color text-white text-sm font-semibold rounded-lg shadow-sm">
                                    {getRoleName(profile.role)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-field-color rounded-xl border border-divider-color">
                                <span className="text-light-gray text-sm font-medium">ID Пользователя</span>
                                <span className="text-dark-blue font-semibold">#{profile.user_id}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};