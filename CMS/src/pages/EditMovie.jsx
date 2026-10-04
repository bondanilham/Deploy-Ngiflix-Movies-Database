import { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router";
import Form from "../components/Form";
import axios from "axios"
import { baseUrl } from "../constants/baseUrl";
import Toastify from "toastify-js"
import BackButton from "../components/BackButton";

export default function EditMovie() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [movie, setMovie] = useState({})

    async function fetchMovie() {
        try {
            const { data } = await axios.get(`${baseUrl}/movies/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            
            // console.log(data.data)
            setMovie(data.data)
        } catch (error) {
            console.log(error.response)
            Toastify({
                text: error.response.data.message,
                duration: 3000,
                close: true,
                gravity: "bottom",
                position: "right",
                style: { background: "#F87171", color: "#000000" }
            }).showToast()
        }
    }

    async function handleSubmit(e, formData) {
        e.preventDefault()
        try {
            await axios.put(`${baseUrl}/movies/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            Toastify({
                text: `Succeed edit movie`,
                duration: 3000,
                close: true,
                gravity: "bottom",
                position: "right",
                style: { background: "#3ad81e", color: "#000000" }
            }).showToast()

            navigate("/movies")
        } catch (error) {
            console.log(error.response)
            Toastify({
                text: error.response?.data?.message,
                duration: 3000,
                close: true,
                gravity: "bottom",
                position: "right",
                style: { background: "#F87171", color: "#000000" }
            }).showToast()
        }
    }

    useEffect(() => {
        fetchMovie()
    }, [id])

    return (
        <div className="bg-linear-to-b from-[#292929] to-[#1b1b1b] min-h-screen p-8 text-white">
            <div className="max-w-3xl mx-auto">
                <BackButton/>
                <Form condition="edit" handleSubmit={handleSubmit} movie={movie} />
            </div>
        </div>
    )
}