import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResetPassword from "./views/auth/ResetPassword";
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
          <Route path="/auth/resetpassword" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
