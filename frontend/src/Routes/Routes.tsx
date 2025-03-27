import { createBrowserRouter, Navigate, } from "react-router-dom";
import SuspenseWrapper from "./SuspenseWrapper/SuspenseWrapper";
import { App, Dashboard, Login, NotFound, Signup } from "../constants";
import { ProtectedRoute } from "./protectedRouter/ProtectedRoute";

const routes = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute isPublic>
                <SuspenseWrapper>
                    <App />
                </SuspenseWrapper>
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/auth/login" replace />,
            },
        ],
    },
    {
        path: "/auth",
        element: (
            <ProtectedRoute isPublic>
                <SuspenseWrapper>
                    <App />
                </SuspenseWrapper>
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/auth/login" replace />,
            },
            {
                path: "login",
                element: (
                    <SuspenseWrapper>
                        <Login />
                    </SuspenseWrapper>
                ),
            },
            {
                path: "signup",
                element: (
                    <SuspenseWrapper>
                        <Signup />
                    </SuspenseWrapper>
                ),
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <SuspenseWrapper>
                    <Dashboard />
                </SuspenseWrapper>
            </ProtectedRoute>
        ),
    },
    {
        path: "*",
        element: (
            <SuspenseWrapper>
                <NotFound />
            </SuspenseWrapper>
        ),
    },
]);


export default routes;