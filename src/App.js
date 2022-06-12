import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
