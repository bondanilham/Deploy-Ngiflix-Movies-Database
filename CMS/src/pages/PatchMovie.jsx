import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios"
import { baseUrl } from "../constants/baseUrl";
import Toastify from "toastify-js"
import BackButton from "../components/BackButton";

export default function PatchMovie() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);

    async function fetchMovie() {
        try {
            const { data } = await axios.get(`${baseUrl}/movies/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            setMovie(data.data)
        } catch (error) {
            console.log(error.response);
            Toastify({
                text: error.response?.data?.message || "Error fetching movie",
                duration: 3000,
                close: true,
                gravity: "bottom",
                position: "right",
                style: { background: "#F87171", color: "#000000" }
            }).showToast();
        }
    }

    async function handleUpload(e) {
        e.preventDefault()
        const file = e.target.files[0]
        if (!file) return

        try {
            const formData = new FormData()
            formData.append("poster", file)

            const {data} = await axios.patch(`${baseUrl}/movies/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });

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
                text: error.response.data.message,
                duration: 3000,
                close: true,
                gravity: "bottom",
                position: "right",
                style: { background: "#F87171", color: "#000000" }
            }).showToast();
        }
    }

    useEffect(() => {
        fetchMovie()
    }, [id])

    return (
        <div className="bg-linear-to-b from-[#292929] to-[#1b1b1b] min-h-screen p-8 text-white">
            <div className="max-w-3xl mx-auto bg-[#1b1b1b] p-8 rounded-2xl">

                <BackButton/>

                <h1 className="text-3xl font-bold mb-8 border-b border-gray-500 pb-4">
                    Update Image
                </h1>

                <div className="flex flex-row gap-8">
                    <div className="w-full md:w-1/2">
                        <p className="text-sm text-gray-400 mb-2">Current Poster:</p>
                        <img 
                            src={movie?.imgUrl} 
                            alt={`${movie?.title} Poster`} 
                            className="w-full h-auto object-cover rounded-xl shadow-lg border border-gray-600"
                        />
                    </div>

                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                        <h2 className="text-2xl font-bold mb-6 text-balance">
                            {movie?.title}
                        </h2>
                        
                        <form>
                            <label className="block mb-2 font-semibold text-gray-300">
                                Select new image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleUpload}
                                className="w-full bg-[#292929] border border-gray-600 rounded-xl p-3 text-white cursor-pointer"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}