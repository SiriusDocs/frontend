import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage } from "../views/AuthPage";
import { TitlePage } from "../views/TitlePage";
import { RegistPage } from "../views/RegistPage";
// import { CreatingDocPage } from "../views/CreatingDocPage";
import { PublicRoute } from "../components/PublicRoute";
import { ProtectedRoute } from "../components/ProtectedRoute";
// import { TemplatePage } from "../views/TemplatePage";
import { AdminPage } from "../views/AdminPage";
import { ProfilePage } from "../views/ProfilePage";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <TitlePage />
                } />
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
                {/* <Route path="/creatingDoc" element={
                    <CreatingDocPage />
                } /> */}
                <Route path="/adminPanel" element={
                    <ProtectedRoute>
                        <AdminPage />
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;