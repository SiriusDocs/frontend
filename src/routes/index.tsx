import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage } from "../views/AuthPage";
// import { TitlePage } from "../views/TitlePage";
import { RegistPage } from "../views/RegistPage";
// import { MainPage } from "../views/MainPage";
import { CreatingDocPage } from "../views/CreatingDocPage";
import { PublicRoute } from "../components/PublicRoute";
// import { ProtectedRoute } from "../components/ProtectedRoute";
import { TemplatePage } from "../views/TemplatePage";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
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
                <Route path="/createDoc" element={<CreatingDocPage />} />
                <Route path="/createTemplate" element={<TemplatePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;