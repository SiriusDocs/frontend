import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    const { isAuthenticated, logout } = useAuth();
    {/* Заглушки */}
    const user = {
        fisrtName: "Иван",
        secondName: "Иванов"
    }
    {/* Заглушки */}

    const closeDropdown = () => setIsDropdownOpen(false);

    const handleLogout = () => {
        logout();
        closeDropdown();
    }

    return (
        <div className="header flex p-4 mx-10 my-6 items-center justify-between rounded-2xl shadow-md">
            <div className="flex items-center">
                <img className="max-h-[35px] w-auto" src="/src/assets/big-logo.png" alt="Logo"/>
                <nav className="flex p-4 px-12 items-center justify-between bg-white">
                    <Link
                        to="/"
                        className="no_underline text-cyan-color font-semibold text-xl cursor-pointer hover:opacity-80"
                    >
                        СириусДокументы
                    </Link>
                </nav>
            </div>

            <div className="flex items-center">
                {isAuthenticated ? (
                    <div className="flex items-center">
                        <Link 
                            to="/profile"
                            className="flex items-center transition-all group"
                        >
                            <h3 className="text-on-footer-color text-lg mx-2 group-hover:text-cyan-color transition-colors">
                                {user.fisrtName} {user.secondName}
                            </h3>

                            <div className="mr-12 flex items-center justify-center group-hover:ring-2 group-hover:ring-cyan-color/20 transition-all">
                                <img className="max-h-[50px] h-8 w-auto cursor-pointer" src="/src/assets/profile.svg" />
                            </div>
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center">
                        <Link 
                            to="/auth"
                            className="flex items-center transition-all group"
                        >
                            <div className="mr-12 flex items-center justify-center">
                                <button
                                    className="bg-cyan-color text-white px-6 py-2 rounded-md text-md font-medium hover:bg-cyan-color/90 transition-colors"
                                >
                                    Войти
                                </button>
                            </div>
                        </Link>
                    </div>
                )}
                
    
                <div className="relative inline-block">
                    <img 
                        className="max-h-[20px] w-auto cursor-pointer" src="/src/assets/menu.svg" 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    />
                    
                    {isDropdownOpen && (
                        <div className="absolute right-0 top-full mt-4 w-56 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-2 overflow-hidden">
                            <Link
                                to='/contacts'
                                onClick={closeDropdown}
                                className="block px-4 py-2 text-on-footer-color hover:text-cyan-color transition-colors"
                            >
                                Контакты
                            </Link>

                            {isAuthenticated && (
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-on-footer-color hover:text-cyan-color transition-colors"
                                >
                                    Выйти
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
