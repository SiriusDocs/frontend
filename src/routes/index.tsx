import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage } from "../views/AuthPage";
import { TitlePage } from "../views/TitlePage";
import { RegistPage } from "../views/RegistPage";
import { MainPage } from "../views/MainPage";
import { PublicRoute } from "../components/PublicRoute";
import { ProtectedRoute } from "../components/ProtectedRoute";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TitlePage />} />
                <Route path="/auth" element={
                    <PublicRoute>
                        <AuthPage />
                    </PublicRoute>
                } />
                <Route path="/regist" element={
                    <PublicRoute>
                        <RegistPage />
                    </PublicRoute>
                } />
                <Route path="/main" element={
                    <ProtectedRoute>
                        <MainPage />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;