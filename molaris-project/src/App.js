import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./views/auth/SignIn";
import SignUp from "./views/auth/SignUp";
import Dashboard from "./views/dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
