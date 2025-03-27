import { lazy } from "react";

export const App = lazy(() => import("./App.tsx"));
export const Login = lazy(() => import("./pages/Login/Login.tsx"));
export const Signup = lazy(() => import("./pages/Signup/Signup.tsx"));
export const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
export const NotFound = lazy(() => import("./pages/NotFound.tsx"));
