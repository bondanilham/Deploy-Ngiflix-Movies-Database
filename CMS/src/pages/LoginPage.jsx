import { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router";
import { baseUrl } from "../constants/baseUrl";
import Toastify from "toastify-js"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    if (localStorage.access_token) {
        Toastify({
            text: "You are already logged in",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#ff0000",
                color: "#000000"
            }
        }).showToast();
        return <Navigate to="/movies" />;
    }
    

    async function handleLogin (e){
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await axios.post(`${baseUrl}/users/login`, {
                email,
                password
            })

            localStorage.setItem("access_token", data.access_token); 
            navigate("/movies");

            Toastify({
                text: "Login success!",
                duration: 3000,
                newWindow: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#ffa31a",
                    color: "#000000"
                },
            }).showToast();

        } catch (error) {
            console.log(error.response);
            Toastify({
                text: error.response.data.message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#ff0000", 
                    color: "#000000"
                }
            }).showToast();
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
        <div className="bg-linear-to-b from-[#292929] from-70% to-[#1b1b1b] to-90% min-h-screen flex items-center justify-center p-4">
            <div className="bg-[#1b1b1b] p-8 rounded-2xl shadow-2xl border w-full max-w-md">
{/* ICON */}
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="flex items-center justify-center mb-2">
                        <h1 className="font-bold pt-1 text-white text-4xl">
                            Ngi
                        </h1>
                        <h1 className="bg-[#ffa31a] rounded text-black px-1 pt-1 text-4xl ml-1 font-bold">
                            flix
                        </h1>
                    </div>
                    <p className="text-gray-400">CMS PORTAL</p>
                </div>
                
                
                {/* <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Ngi<span className="bg-[#ffa31a] text-black px-1 rounded ml-1">flix</span>
                    </h1>
                </div> */}

                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    <div>
                        <label htmlFor="email" className="text-white mb-2 text-1xl block">
                            Email Address
                        </label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#292929] text-white p-3 rounded-xl outline-none border border-gray-600"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="text-white text-sm font-semibold mb-2 block">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#292929] text-white p-3 rounded-xl outline-none border border-gray-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 p-3 rounded-xl font-bold text-black transition-all bg-[#ffa31a] hover:bg-orange-500 cursor-pointer"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
        </>
    )
}