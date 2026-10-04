import { useEffect, useState } from "react";
import axios from "axios"
import { baseUrl } from "../constants/baseUrl";
import { useParams, useNavigate } from "react-router";

export default function MovieDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    
    const [movie, setMovie] = useState({})
    const [loading, setLoading] = useState(false)

    async function fetchMovieDetails() {
        setLoading(true)
        try {
            const { data } = await axios.get(`${baseUrl}/pub/movies/${id}`)
            console.log(data.data, "<<<<<<<<<<<<<<<<<<");
            setMovie(data.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMovieDetails()
    }, [])

    return (
        <>
        
            <div className="bg-linear-to-b from-[#292929] from-70% to-[#1b1b1b] to-90% min-h-screen p-8 text-white">
                
                <div className="max-w-6xl mx-auto">
                    <button 
                        onClick={() => navigate('/pub/movies')}
                        className="mb-6 flex items-center text-[#ffa31a] hover:text-orange transition-colors font-semibold cursor-pointer"
                    >
                        <span className="mr-2">&gt; Back to Movies</span> 
                    </button>


                    {loading ? (
                        <div className="flex flex-col justify-center items-center">
                            <img src="/src/assets/loading.gif" alt="Loading..." className="w-100" />
                            <p className="mt-2 text-white">Loading movie details...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 bg-[#1b1b1b] p-8 rounded-2xl shadow-2xl">
                            <div className="">
                                <img 
                                    src={movie.imgUrl} 
                                    alt={`${movie.title} poster`} 
                                    className="w-full"
                                />
                            </div>

                            <div className="md:col-span-2 flex flex-col justify-between">
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{movie.title}</h1>
                                    
                                    <div className="flex flex-wrap gap-3 mb-6">
                                        <p className="bg-[#ffa31a] text-black font-bold px-3 py-1 rounded-full text-sm shadow">
                                            {movie.Genre?.name}
                                        </p>
                                        <p className="bg-gray-700 text-white font-bold px-3 py-1 rounded-full text-sm shadow flex items-center">
                                            ⭐ {movie.rating} / 10
                                        </p>
                                        <p className="bg-white px-3 text-black font-bold py-1 rounded-full text-sm shadow">
                                            Added by: @{movie.User?.username}
                                        </p>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-2 text-[#ffa31a]">Synopsis</h3>
                                    <p className="text-gray-300 text-lg text-justify mb-8">
                                        {movie.synopsis}
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <a 
                                        href={movie.trailerUrl} 
                                        target="_blank" 
                                        className="flex items-center justify-center bg-red-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-red-900 cursor-pointer w-fit"
                                    > 
                                        Watch Trailer on YouTube
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            </>
    )
}