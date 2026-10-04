import { useNavigate} from "react-router";
import Form from "../components/Form";
import axios from "axios"
import { baseUrl } from "../constants/baseUrl";
import Toastify from "toastify-js"
import BackButton from "../components/BackButton";

export default function AddMovie() {
    const navigate = useNavigate()

    async function handleSubmit(e, form) {
        e.preventDefault()
        try {
            const {data} = await axios.post(`${baseUrl}/movies`, form, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`,
                },
            })

            Toastify({
                text: data.message,
                duration: 3000,
                close: true,
                gravity: "bottom",
                position: "right",
                style: { background: "#3ad81e", color: "#000000" },
            }).showToast();

            navigate("/movies")
        } catch (error) {
            console.log(error.response)
            Toastify({
                text: error.response.data.message,
                duration: 3000,
                close: true,
                gravity: "bottom",
                position: "right",
                style: { background: "#F87171", color: "#000000" },
            }).showToast();
        }
    }

    return (
        <div className="bg-linear-to-b from-[#292929] to-[#1b1b1b] min-h-screen p-8 text-white">
            <div className="max-w-3xl mx-auto">
                <BackButton />                
                <Form condition="add" handleSubmit={handleSubmit} />
            </div>
        </div>
    )
}