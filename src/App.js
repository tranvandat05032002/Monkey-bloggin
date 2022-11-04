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
          <Route element={<SignUpPage></SignUpPage>} path="/sign-up"></Route>
          <Route element={<SignInPage></SignInPage>} path="/sign-in"></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
