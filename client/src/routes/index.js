import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import App from "../App";
import CheckEmailPage from "../pages/CheckEmailPage";
import CheckPasswordPage from "../pages/CheckPasswordPage";
import Home from "../pages/Home";
import MessagePage from "../components/MessagePage";
import ForgotPassword from "../pages/ForgotPassword";
import AuthLayouts from "../layout";
const router = createBrowserRouter([
{
    path: "/",
    element: <App/>,
    children: [
        {
            path: "register",
            element: <AuthLayouts><RegisterPage/></AuthLayouts> 
        },
        {
            path: "email",
            element: <AuthLayouts><CheckEmailPage/></AuthLayouts>
        },
        {
            path: "password",
            element: <AuthLayouts><CheckPasswordPage/></AuthLayouts>
        },
        {
            path: "forgot-password",
            element: <AuthLayouts><ForgotPassword/></AuthLayouts>
        },
        {
            path: "",
            element: <Home/>,
            children: [
                {
                    path: ":userId",
                    element: <MessagePage/>
                }
            ]
        }
    ]
}
])

export default router