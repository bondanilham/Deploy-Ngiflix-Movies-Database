import { useEffect, useState } from "react";
import axios from "axios"
import { baseUrl } from "../constants/baseUrl";
import Toastify from "toastify-js"

export default function GenresPage() {
    const [genres, setGenres] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchGenres() {
        setLoading(true)
        try {
            const { data } = await axios.get(`${baseUrl}/genres`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            setGenres(data.data)

        } catch (error) {
            console.log(error.response)
            Toastify({
                text: error.response.data.message,
                duration: 3000,
                gravity: "bottom",
                position: "right",
                style: { 
                    background: "#c73030", 
                    color: "#000000"
                }
            }).showToast();
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchGenres()
    }, [])

    return (
        <>
            <div className="bg-linear-to-b from-[#292929] to-[#1b1b1b] min-h-screen p-8 text-white">
                <div className="max-w-[1000px] mx-auto">
                    {/* Header Section */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">Genres List</h1>
                        </div>
                    </div>
                    <div className="bg-[#1b1b1b] border border-[#292929] rounded-2xl">
                        {loading ? (
                            <div className="flex flex-col justify-center items-center">
                                <img src="/src/assets/loading.gif" className="w-100" />
                                <p className="mt-2 text-white">Loading genres data...</p>
                            </div>
                        ) : (
                            <table className="w-full text-left whitespace-normal border border-gray-700 rounded-2xl">
                                <thead>
                                    <tr className="bg-[#292929] text-[#ffa31a]">
                                        <th className="p-4 font-semibold text-center w-24">No</th>
                                        <th className="p-4 font-semibold">Genre Name</th>
                                    </tr>
                                </thead>
{/* LOOPING TABEL */}
                                <tbody>
                                    {genres.map((genre, index) => (
                                        <tr key={genre.id} className="border-b border-gray-700">
                                            <td className="p-4 text-center font-semibold">{index + 1}</td>
                                            <td className="p-4 text-xl">{genre.name}</td>
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