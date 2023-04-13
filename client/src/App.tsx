import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Auth from "./pages/Auth";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/welcome" element={<Auth authRoute='welcome'/>} />
                    <Route path="/login" element={<Auth authRoute='login'/>} />
                    <Route path="/register" element={<Auth authRoute='register'/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
