import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router";
import { baseUrl } from "../constants/baseUrl";
import Toastify from "toastify-js"
import SubmitButton from "../components/SubmitButton";

export default function AddStaff() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    async function handleRegister(e) {
        e.preventDefault()
        setLoading(true)

        try {
            const {data} = await axios.post(`${baseUrl}/users/add-user`, {
                username,
                email,
                password
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            Toastify({
                text: data.message,
                duration: 3000,
                close: true,
                gravity: "bottom",
                position: "right",
                style: { background: "#3ad81e", color: "#000000" }
            }).showToast();

            navigate("/movies")
        } catch (error) {
            console.log(error.response);
            Toastify({
                text: error.response?.data?.message,
                duration: 3000,
                close: true,
                gravity: "bottom",
                position: "right",
                style: { background: "#F87171", color: "#000000" }
            }).showToast();
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-linear-to-b from-[#292929] to-[#1b1b1b] min-h-screen p-8 text-white flex justify-center items-center">
            <div className="bg-[#1b1b1b] p-8 rounded-2xl shadow-2xl border border-[#292929] w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-8 text-white">
                    Register Staff
                </h1>
                
                <form onSubmit={handleRegister} className="flex flex-col gap-5">
                    <div>
                        <p className="block mb-2 font-semibold">Username</p>
                        <input 
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-[#292929] border border-gray-600 rounded-xl p-3 text-white"
                            placeholder="Enter username"
                        />
                    </div>

                    <div>
                        <p className="block mb-2 font-semibold">Email</p>
                        <input 
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#292929] border border-gray-600 rounded-xl p-3 text-white"
                            placeholder="Enter email address"
                        />
                    </div>

                    <div>
                        <p className="block mb-2 font-semibold">Password</p>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#292929] border border-gray-600 rounded-xl p-3 text-white"
                            placeholder="Enter password"
                        />
                    </div>

                    <SubmitButton text="Submit"/>

                </form>
            </div>
        </div>
    )
}
