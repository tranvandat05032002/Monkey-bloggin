import HomePage from "pages/HomePage";
import SignInPage from "pages/SignInPage";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/auth-context";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
