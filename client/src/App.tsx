import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import DefaultLayout from "./layout/DefaultLayout";
import AuthContextProvider from "./contexts/authContext";
import { privateRoutes, publicRoutes } from "./routes";
import { LOCAL_STORAGE_TOKEN_NAME } from "./contexts/variables";
import NotFound from "./pages/NotFound";
import SongContextProvider from "./contexts/songContext";

function App() {
    function storageChange(e: any) {
        if (e.key === LOCAL_STORAGE_TOKEN_NAME) {
            window.location.reload();
        }
    }
    useEffect(() => {
        window.addEventListener("storage", storageChange, false);
        return () => {
            window.removeEventListener("storage", storageChange, false);
        };
    }, []);

    return (
        <AuthContextProvider>
            <SongContextProvider>
                <Router>
                    <div className="App">
                        <Routes>
                            {publicRoutes.map((route, index): any => {
                                return <Route key={index} path={route.path} element={route.element} />;
                            })}
    
                            {privateRoutes.map((route, index): any => {
                                let Layout = DefaultLayout;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <PrivateRoute>
                                                <Layout>{route.element}</Layout>
                                            </PrivateRoute>
                                        }
                                    />
                                );
                            })}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </Router>
            </SongContextProvider>
        </AuthContextProvider>
    );
}

export default App;
