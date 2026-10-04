import { NavLink, useNavigate } from "react-router";
import Toastify from "toastify-js"

export default function NavBar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        
        Toastify({
            text: "Logged out successfully",
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: { 
                background: "#ffa31a", 
                color: "#000000"
            }
        }).showToast();

        navigate("/users/login");
    };

    return (
        <div className="bg-[#292929]">
            <nav className="grid grid-cols-3 items-center p-5 bg-[#1b1b1b] rounded-b-2xl">
{/* LOGO */}
                <div className="flex items-center">
                    <NavLink to="/movies" className="font-bold pt-1 text-white text-4xl">
                        Ngi
                    </NavLink>
                    <NavLink to="/movies" className="bg-[#ffa31a] rounded text-black px-1 pt-1 text-4xl font-bold">
                        flix
                    </NavLink>
                    <p className="text-[#ffa31a] font-bold ml-3 mt-6 text-sm ">
                        CMS
                    </p>
                </div>
{/* MOVIES */}
                <div className="flex justify-center gap-2">
                    <NavLink 
                        to="/movies" 
                        className={({ isActive }) => 
                            `px-4 py-2 rounded-xl font-semibold transition-all duration-300 
                            ${
                                isActive 
                                ? "bg-[#292929] text-[#ffa31a] shadow-inner" 
                                : "text-gray-400 hover:bg-[#292929] hover:text-white"
                            }`
                        }
                    >
                        Movies
                    </NavLink>
{/* GENRES */}
                    <NavLink 
                        to="/genres" 
                        className={({ isActive }) => 
                            `px-4 py-2 rounded-xl font-semibold transition-all duration-300 
                            ${  isActive ? 
                                "bg-[#292929] text-[#ffa31a] shadow-inner" 
                                : "text-gray-400 hover:bg-[#292929] hover:text-white"
                            }`
                        }
                    >
                        Genres
                    </NavLink>
{/* ADD MOVIES */}
                    <NavLink 
                        to="/add/movies"
                        className={({ isActive }) => 
                            `px-4 py-2 rounded-xl font-semibold transition-all duration-300 
                            ${  isActive ? 
                                "bg-[#292929] text-[#ffa31a] shadow-inner" 
                                : "text-gray-400 hover:bg-[#292929] hover:text-white"
                            }`
                        }
                    >
                        Add Movies
                    </NavLink>
{/* ADD STAFF */}
                    <NavLink 
                        to="/users/register" 
                        className={({ isActive }) => 
                            `px-4 py-2 rounded-xl font-semibold transition-all duration-300 
                            ${
                                isActive 
                                ? "bg-[#292929] text-[#ffa31a] shadow-inner" 
                                : "text-gray-400 hover:bg-[#292929] hover:text-white"
                            }`
                        }
                    >
                        Register
                    </NavLink>
                </div>
{/* LOGOUOT */}
                <div className="flex justify-end pr-2">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center px-5 py-2 bg-red-600 text-white font-bold rounded-xl cursor-pointer gap-2"
                    >
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    )
}