import { React } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from "./pages/Home"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Register from "./pages/Register"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

const route = createBrowserRouter([
  {
    path: "/",
    element: 
      <ProtectedRoute> 
        <Home />
      </ProtectedRoute>,
    errorElement : <NotFound />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/logout",
    element: <Logout />
  },
  
])

function App() {
  return (
    <RouterProvider router={route} />
  );
}

export default App;



//register will bring the ability to register username and password in {"/api/register"} and then u need to login in {"/api/token"} to get yout AccesToken