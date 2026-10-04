import { useEffect, useState } from "react";
import axios from "axios"
import Toastify from "toastify-js"
import { baseUrl } from "../constants/baseUrl";
import SubmitButton from "./SubmitButton";


export default function Form({ condition, handleSubmit, movie }){
    const [genres, setGenres] = useState([])
    const [form, setForm] = useState({
        title: "",
        synopsis: "",
        imgUrl: "",
        trailerUrl: "",
        rating: 1,
        genreId: 0,
    })

    async function fetchGenres() {
        try {
            const { data } = await axios.get(`${baseUrl}/genres`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`,
                },
            })
            setGenres(data.data)
        } catch (error) {
            console.log(error.response);
            Toastify({
                text: error.response.data.message,
                duration: 3000,
                close: true,
                gravity: "bottom",
                position: "right",
                style: { 
                    background: "#ff0000", 
                    color: "#000000"
                }
            }).showToast();
        }
    }

    function getFormData(key, event) {
        let value = event

        if (key === "genreId" || key === "rating") {
            value = Number(value)
        }

        setForm((prevData) => ({
            ...prevData,
            [key]: value,
        }))
    }

    useEffect(() => {
        fetchGenres()
    }, [])

    useEffect(() => {
        if (movie) {
            setForm({
                title: movie.title,
                synopsis: movie.synopsis,
                imgUrl: movie.imgUrl,
                trailerUrl: movie.trailerUrl,
                rating: movie.rating,
                genreId: movie.genreId,
            })
        }
    }, [movie])
    
    return (
    <>
        <form 
            onSubmit={(e) => handleSubmit(e, form)} 
            className="bg-[#1b1b1b] p-8 rounded-2xl shadow-2xl w-full">
            <h1 className="text-3xl font-bold text-white mb-8 border-b border-gray-700 pb-4">
                {condition === "edit" ? "Edit" : "Add"} Movie
            </h1>
{/* bikin  */}
            <div className="grid grid-cols gap-6">
                <div>
                    <p className="text-white font-semibold mb-2 block">Title</p>
                    <input
                        type="text"
                        className="w-full bg-[#292929] text-white p-3 rounded-xl outline-none focus:border-[#ffa31a] "
                        value={form.title}
                        onChange={(e) => getFormData("title", e.target.value)}
                    />
                </div>

                <div>
                    <p className="text-white font-semibold mb-2 block">Trailer URL</p>
                    <input
                        type="text"
                        className="w-full bg-[#292929] text-white p-3 rounded-xl outline-none focus:border-[#ffa31a] "
                        value={form.trailerUrl}
                        onChange={(e) => getFormData("trailerUrl", e.target.value)}
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="text-white font-semibold mb-2 block">Synopsis</label>
                    <textarea
                        name="" id=""
                        className="w-full bg-[#292929] text-white p-3 rounded-xl outline-none focus:border-[#ffa31a]  min-h-[100px]"
                        value={form.synopsis}
                        onChange={(e) => getFormData("synopsis", e.target.value)}
                    />
                </div>

                <div>
                    <label className="text-white font-semibold mb-2 block">Image URL</label>
                    <input
                        type="text"
                        className="w-full bg-[#292929] text-white p-3 rounded-xl outline-none focus:border-[#ffa31a] "
                        value={form.imgUrl}
                        onChange={(e) => getFormData("imgUrl", e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-white font-semibold mb-2 block">Rating</label>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            className="w-full bg-[#292929] text-white p-3 rounded-xl outline-none focus:border-[#ffa31a] "
                            value={form.rating}
                            onChange={(e) => getFormData("rating", e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <label className="text-white font-semibold mb-2 block">Genre</label>
                        <select
                            className="w-full bg-[#292929] text-white p-3 rounded-xl outline-none focus:border-[#ffa31a] "
                            value={form.genreId}
                            onChange={(e) => getFormData("genreId", e.target.value)}
                        >
                            <option value="0" disabled>Select Genre</option>
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <SubmitButton text={condition === "edit" ? "Update Movie" : "Add Movie"} />
        </form>
    </>
    )
}
