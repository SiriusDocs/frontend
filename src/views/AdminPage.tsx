import React, { useEffect, useState } from 'react';
import { adminApi } from '../api/adminApi'; 
import type { PendingUser } from '../types/admin';
import { Header } from '../components/Header';

export const AdminPage = () => {
    const [users, setUsers] = useState<PendingUser[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedRoles, setSelectedRoles] = useState<Record<number, string>>({});
    const [assigningUserId, setAssigningUserId] = useState<number | null>(null);

    const AVAILABLE_ROLES = ['teacher', 'librarian'];

    const fetchUsers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await adminApi.getPendingUsers({ limit: 10, offset: 0 });
            setUsers(data.users);
            setTotalCount(data.total_count);
            
            const defaultRoles: Record<number, string> = {};
            data.users.forEach(u => defaultRoles[u.user_id] = AVAILABLE_ROLES[0]);
            setSelectedRoles(defaultRoles);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Ошибка при загрузке пользователей');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChange = (userId: number, role: string) => {
        setSelectedRoles(prev => ({ ...prev, [userId]: role }));
    };

    const handleAssignRole = async (userId: number) => {
        const roleToAssign = selectedRoles[userId];
        if (!roleToAssign) return;

        setAssigningUserId(userId);
        try {
            await adminApi.assignRole({
                target_user_id: userId,
                new_role: roleToAssign
            });
            setUsers(prev => prev.filter(u => u.user_id !== userId));
            setTotalCount(prev => prev - 1);
            
        } catch (err: any) {
            alert(err.response?.data?.message || 'Ошибка при назначении роли');
        } finally {
            setAssigningUserId(null);
        }
    };

    const handleRejectUser = (userId: number) => {
        // Пока просто лог в консоль, заглушка
        console.log(`Пользователь ${userId} отклонен`);
        alert(`Запрос пользователя #${userId} отклонен`);
    };

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
            <div className="w-12 h-12 border-4 border-field-color border-t-accent rounded-full animate-spin"></div>
            <p className="text-light-gray font-medium text-lg animate-pulse">Загрузка пользователей...</p>
        </div>
    );

    return (
        <>
            <Header />

            <div className="max-w-7xl mx-auto p-6 md:p-10 font-montserrat">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-medium text-title-color">Панель администратора</h2>
                        <p className="text-light-gray mt-2">
                            Всего пользователей ожидающих подтверждения: <span className="font-semibold text-accent">{totalCount}</span>
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="bg-[#6a1a2115] border-l-4 border-error-color text-error-color p-4 rounded-r-lg mb-6 flex items-center gap-3 shadow-sm">
                        <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">{error}</span>
                    </div>
                )}

                {users.length === 0 && !error ? (
                    <div className="bg-white rounded-xl shadow-md p-12 text-center border border-divider-color">
                        <div className="w-20 h-20 bg-field-color rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <svg className="w-10 h-10 text-cyan-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-light-gray">Нет пользователей, ожидающих назначения роли.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-md border border-divider-color overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-field-color text-light-gray text-sm uppercase tracking-wider font-semibold border-b border-divider-color">
                                        <th className="px-4 py-4">ID</th>
                                        <th className="px-4 py-4">Пользователь</th>
                                        <th className="px-4 py-4">Email</th>
                                        <th className="px-4 py-4">Дата регистрации</th>
                                        <th className="px-4 py-4 text-center">Действие</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-divider-color">
                                    {users.map(user => (
                                        <tr 
                                            key={user.user_id} 
                                            className="hover:bg-selected-color/40 transition-colors duration-200 group"
                                        >
                                            <td className="px-4 py-4 font-medium text-dark-blue">
                                                #{user.user_id}
                                            </td>
                                            <td className="px-4 py-4 font-semibold text-default-text-color">
                                                {user.username}
                                            </td>
                                            <td className="px-4 py-4 text-light-gray">
                                                {user.email}
                                            </td>
                                            <td className="px-4 py-4 text-light-gray">
                                                {new Date(user.created_at).toLocaleDateString('ru-RU', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex gap-3 items-center justify-center min-w-[460px]">
                                                    <select 
                                                        value={selectedRoles[user.user_id] || ''}
                                                        onChange={(e) => handleRoleChange(user.user_id, e.target.value)}
                                                        disabled={assigningUserId === user.user_id}
                                                        className="bg-input-color border border-divider-color text-default-text-color text-sm rounded-lg px-3 py-2.5 outline-none focus:border-accent transition-all cursor-pointer disabled:opacity-60 w-40"
                                                    >
                                                        {AVAILABLE_ROLES.map(role => (
                                                            <option key={role} value={role}>
                                                                {role === 'teacher' ? 'Учитель' : role === 'librarian' ? 'Библиотекарь' : role}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    
                                                    <button 
                                                        onClick={() => handleAssignRole(user.user_id)}
                                                        disabled={assigningUserId === user.user_id}
                                                        className="w-[140px] bg-gradient-to-r from-start-grade-color to-end-grade-color text-white py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:scale-95 flex justify-center items-center"
                                                    >
                                                        {assigningUserId === user.user_id ? (
                                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                        ) : (
                                                            'Назначить'
                                                        )}
                                                    </button>

                                                    <button
                                                        onClick={() => handleRejectUser(user.user_id)}
                                                        disabled={assigningUserId === user.user_id}
                                                        className="w-[140px] bg-error-color text-white py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:scale-95 flex justify-center items-center disabled:opacity-50"
                                                    >
                                                        Отклонить
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};