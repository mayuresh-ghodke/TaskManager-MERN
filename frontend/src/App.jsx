import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GoogleSuccess from "./pages/GoogleSuccess";

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>}/>
                <Route path="/google-success" element={<GoogleSuccess />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;