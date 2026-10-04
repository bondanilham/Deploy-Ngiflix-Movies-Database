import { Link } from "react-router";

export default function BackButton() {
    return (
        <Link 
            to="/movies" 
            className="inline-block mb-6 text-[#ffa31a] hover:text-orange-500 font-semibold transition-colors"
        >
            &larr; Back to Movies
        </Link>
    )
}