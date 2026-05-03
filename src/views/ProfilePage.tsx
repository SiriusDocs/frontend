import { useEffect, useState } from 'react';
import { profileApi } from '../api/profileApi'; 
import type { UserProfile } from '../types/profile'; 
import profilePic from '../assets/profile.svg'; 

export const ProfilePage = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // пока зашлушка
    const [notifications, setNotifications] = useState(true)

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

    const getRoleName = (role: string) => {
        switch (role.toLowerCase()) {
            case 'teacher': return 'Учитель';
            case 'librarian': return 'Библиотекарь';
            case 'admin': return 'Администратор';
            case 'pending': return 'В ожидании';
            default: return role;
        }
    };

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-teal-500 rounded-full animate-spin"></div>
            <p className="text-slate-400 font-medium text-lg animate-pulse">Загрузка профиля...</p>
        </div>
    );

    if (error) return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-red-50 border-l-4 border-error-color text-error-color rounded-r-lg flex items-center gap-3 shadow-sm">
            <svg className="w-8 h-8 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-lg">{error}</span>
        </div>
    );

    if (!profile) return null;

    return (
        <div className="min-h-screen p-8">
            {/* Тут должен быть header */}

            <div className="max-w-6xl mx-auto mb-8">
                <h1 className="text-[32px] font-light text-title-color mb-8 font-montserrat">Личный кабинет</h1>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-12 max-w-6xl mx-auto flex flex-col md:flex-row gap-20">
                <div className="flex flex-col items-center min-w-[280px]">
                    <div className="w-64 h-64 bg-field-color rounded-full mb-6 overflow-hidden border border-divider-color shadow-inner flex items-center justify-center overflow-hidden">
                        <img
                            src={profilePic}
                            alt="Avatar"
                            className="w-[85%] h-[85%] object-cover items-center"
                        />
                    </div>

                    <h2 className="text-3xl font-medium text-title-color mb-1 text-center">
                        {profile.username}
                    </h2>

                    <p className="text-light-gray text-xl capitalize">
                        {getRoleName(profile.role)}
                    </p>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                    <div className="flex flex-col">
                        <label className="text-xl text-creating-lable-color font-medium mb-2">
                            E-mail
                        </label>
                        <div className="rounded-[6px] bg-gradient-to-r from-start-grade-color to-end-grade-color p-[1px] w-full">
                            <input
                                type='text'
                                readOnly  /* пока заглушка */
                                value={profile.email}
                                className="w-full h-full rounded-[5px] bg-creating-input-color px-4 py-2.5 text-md outline-none"
                            />
                        </div>
                        <div className="flex justify-end mt-2">
                            <button className="bg-gradient-to-r from-start-grade-color to-end-grade-color hover:opacity-90 text-white px-6 py-1.5 rounded-[5px] text-sm font-medium transition-all">
                                Сменить
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xl text-creating-lable-color font-medium mb-2">
                            Язык по умолчанию
                        </label>
                        <div className="rounded-[6px] bg-gradient-to-r from-start-grade-color to-end-grade-color p-[1px] w-full">
                            <div className="relative h-full">
                                <select className="w-full h-full rounded-[5px] bg-creating-input-color px-4 py-2.5 text-md outline-none appearance-none cursor-pointer">
                                    {/*пока зашлушка*/}
                                    <option>Русский</option>
                                    <option>English</option>
                                </select>
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-start-grade-color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xl text-creating-lable-color font-medium mb-2">
                            Пароль
                        </label>
                        <div className="rounded-[6px] bg-gradient-to-r from-start-grade-color to-end-grade-color p-[1px] w-full">
                            <input
                                type="password"
                                value="********"
                                readOnly
                                className="w-full h-full rounded-[5px] bg-creating-input-color px-4 py-2.5 text-md outline-none"
                            />
                        </div>
                        <div className="flex justify-end mt-2">
                            <button className="bg-gradient-to-r from-start-grade-color to-end-grade-color hover:opacity-90 text-white px-6 py-1.5 rounded-[5px] text-sm font-medium transition-all">
                                Сменить
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xl text-creating-lable-color font-medium mb-4">
                            Уведомления
                        </label>
                        <div 
                            onClick={() => setNotifications(!notifications)}
                            className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
                                notifications ? 'bg-teal-100' : 'bg-gray-200'
                            }`}
                        >
                            <div className={`w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                                notifications 
                                ? 'translate-x-8 bg-gradient-to-r from-start-grade-color to-end-grade-color' 
                                : 'translate-x-0 bg-white'
                            }`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};