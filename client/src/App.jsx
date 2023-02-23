import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/inject-style";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";

import Header from "./components/Header";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <div className="container">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Dashboard />}/>
                        <Route path="/register" element={<Register />}/>
                        <Route path="/login" element={<Login />}/>
                    </Routes>
                </div>
            </BrowserRouter>
            <ToastContainer />
        </>
    )
}

export default App;