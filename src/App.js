import DashboardLayout from "module/dashboard/DashboardLayout";
import PostAddNew from "module/post/PostAddNew";
import PostDetailsPage from "module/post/PostDetailsPage";
import PostManage from "module/post/PostMange";
import DashboardPage from "pages/DashboardPage";
import HomePage from "pages/HomePage";
import NotFoundPage from "pages/NotFoundPage";
import SignInPage from "pages/SignInPage";
import { Route, Routes } from "react-router-dom";
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
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
          <Route
            path="/:slug"
            element={<PostDetailsPage></PostDetailsPage>}
          ></Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
          </Route>
          <Route path="/post/mange" element={<PostManage></PostManage>}></Route>
          <Route
            path="/mange/add-post"
            element={<PostAddNew></PostAddNew>}
          ></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
