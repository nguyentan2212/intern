import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./views/auth/SignUp";
import Dashboard from "./views/dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
