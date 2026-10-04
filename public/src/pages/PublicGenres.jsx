import { useEffect, useState } from "react";
import axios from "axios"
import { baseUrl } from "../constants/baseUrl";
import { useNavigate } from "react-router";

export default function PublicGenres() {
    const [genres, setGenres] = useState([])
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    async function fetchGenres() {
        setLoading(true)
        try {
            const { data } = await axios.get(`${baseUrl}/pub/genres`)
            setGenres(data.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchGenres()
    }, [])

    return (
        <div className="bg-linear-to-b from-[#292929] from-70% to-[#1b1b1b] to-90% min-h-screen p-8 pb-20">
            <h1 className="text-white text-4xl font-bold text-center mb-10">
                Explore Genres
            </h1>

            {loading ? (
                <div className="flex flex-col justify-center items-center">
                    <img src="/src/assets/loading.gif" alt="Loading genres..." className="w-100" />
                    <p className="text-white mt-2">Loading Genres...</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-5xl">
                    {genres.map((genre) => (
                        <div 
                            key={genre.id} 
                            onClick={() => navigate('/pub/movies', { state: { selectedGenre: genre.name } })}
                            className="bg-[#1b1b1b] border border-gray-600 rounded-xl p-8 flex justify-center hover:bg-[#ffa31a]     transition-all duration-300 shadow-lg hover:-translate-y-1 group cursor-pointer"
                        >
                            <h3 className="text-white group-hover:text-black text-2xl font-semibold text-center transition-colors duration-300">
                                {genre.name}
                            </h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}