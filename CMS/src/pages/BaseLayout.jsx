import { Navigate, Outlet } from "react-router";
import Toastify from 'toastify-js'
import NavBar from "../components/NavBar";

export default function BaseLayout() {
    // protecting routes
    if (!localStorage.access_token) {
        Toastify({
            text: "Please login first",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#ff0000",
                color: "#000000"
            }
        }).showToast();
        return <Navigate to="/users/login" />
    }

    return (
        <>
            <NavBar/>
            <Outlet />
        </>
    )
}