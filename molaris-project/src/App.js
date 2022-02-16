import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMoralis } from "react-moralis";
import ResetPassword from "./views/auth/ResetPassword";
import SignIn from "./views/auth/SignIn";
import SignUp from "./views/auth/SignUp";
import Layout from "./views/layout/Layout";
import Transaction from "./views/transactions/Transaction";

function App() {
  const { enableWeb3 } = useMoralis();
  const [title, setTile] = useState("Home");

  useEffect(() => {
    enableWeb3();
  }, [enableWeb3]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout title={title} />}>
            <Route path="transaction" element={<Transaction setTitle={setTile} />} />
          </Route>
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/resetpassword" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
