import { useEffect, useState } from "react";
import axios from "axios"
import { baseUrl } from "../constants/baseUrl";
import Toastify from "toastify-js"
import { useNavigate } from "react-router";

export default function MoviesPage(){
    const navigate = useNavigate()
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchMovies() {
        setLoading(true)
        try {
            const { data } = await axios.get(`${baseUrl}/movies`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            setMovies(data.data)

        } catch (error) {
            console.log(error.response)
            Toastify({
                text: error.response.data.message,
                duration: 3000,
                gravity: "bottom",
                position: "right",
                style: { background: "#c73030", color: "#000000", borderRadius: "8px" }
            }).showToast();
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    async function handleDelete(id) {
        try {
            await axios.delete(`${baseUrl}/movies/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            
            Toastify({
                text: "Movie deleted successfully",
                duration: 3000,
                close: true,
                gravity: "bottom",
                position: "right",
                style: { 
                    background: "#3ad81e", 
                    color: "#000000"
                }
            }).showToast();
            
            fetchMovies()
        } catch (error) {
            console.log(error.response);
            Toastify({
                text: error.response.data.message,
                duration: 3000,
                close: true,
                gravity: "bottom",
                position: "right",
                style: { 
                    background: "#F87171", 
                    color: "#000000"
                }
            }).showToast();
        }
    }

    return (
        <>
            <div className="bg-linear-to-b from-[#292929] to-[#1b1b1b] min-h-screen p-8 text-white">
            <div className="max-w-[1400px] mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Movies List</h1>
                    </div>
                </div>


{/* Table */}
<div className="bg-[#1b1b1b] border border-[#292929] rounded-2xl">
    {loading ? (
        <div className="flex flex-col justify-center items-center">
            <img src="/src/assets/loading.gif" className="w-100" />
            <p className="mt-2 text-white">Loading movies data...</p>
        </div>
    ) : (
        <table className="w-full text-left whitespace-normal border border-gray-700 rounded-2xl">
        <thead>
        <tr className="bg-[#292929] text-[#ffa31a]">
            <th className="p-4 font-semibold">ID</th>
            <th className="p-4 font-semibold">Title</th>
            <th className="p-4 font-semibold">Synopsis</th>
            <th className="p-4 font-semibold">Trailer URL</th>
            <th className="p-4 font-semibold">Poster</th>
            <th className="p-4 font-semibold">Rating</th>
            <th className="p-4 font-semibold">Posted By</th>
            <th className="p-4 font-semibold">Genre</th>
            <th className="p-4 font-semibold text-center">Action</th>
        </tr>
        </thead>
        {console.log(movies)}
        <tbody>
        {movies.map((movie, index) => (
        <tr key={movie.id} className="border-b border-gray-700">
            <td className="p-4 text-center font-semibold">{index+1}</td>
            <td className="p-4 font-bold max-w-[150px] text-balance">
                {movie.title}
            </td>
            <td className="p-4">
                <p className="line-clamp-2 text-sm text-gray-300 whitespace-normal" title={movie.synopsis}>
                    {movie.synopsis}
                </p>
            </td>
            <td className="p-4 max-w-[150px]">
                <a 
                    href={movie.trailerUrl}
                    className="underline text-blue-400 hover:text-blue-600 visited:text-purple-400 truncate block"
                >
                    {movie.trailerUrl}
                </a>
            </td>
            <td className="p-4 flex justify-center">
                <img 
                    src={movie.imgUrl} 
                    alt={`${movie.title} Poster`} 
                    className="h-full object-cover rounded shadow hover:scale-200 duration-500"
                />
            </td>
            <td className="p-4 text-center">
                ⭐ {movie.rating}
            </td>
            <td className="p-4">
                @{movie.User?.username}
            </td>
            <td className="p-4">
                {movie.Genre?.name}
            </td>
            <td className="p-4">
                <div className="flex justify-center gap-2">
                    <button
                        onClick={() => navigate(`/movies/edit/${movie.id}`)} 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-semibold transition-colors cursor-pointer">
                        Edit
                    </button>
                    <button 
                        onClick={() => navigate(`/movies/patch/${movie.id}`)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded text-sm font-semibold transition-colors cursor-pointer">
                        PatchImage
                    </button>
                    <button 
                        onClick={() => handleDelete(movie.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm font-semibold transition-colors cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>
        ))}
        </tbody>
        </table>
    )}
           </div>
        </div>
    </div>
</>
    )
}


