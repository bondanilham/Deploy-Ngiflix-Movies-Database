import { useNavigate } from "react-router";


export default function Cards({movie}){
    const navigate = useNavigate()

    const handleDetails = () => {
        navigate(`/pub/movies/${movie.id}`)
    }
    
    return(
        <>
            <div className="relative w-54 h-80 rounded-lg overflow-hidden hover:scale-110 duration-300 group">
                <img
                    src={movie.imgUrl}
                    alt={`${movie.title} Pposter`}
                    className="h-full w-full object-cover"
                />
                <div className="flex flex-col absolute inset-0 opacity-0 group-hover:opacity-95 transition-opacity duration-300 justify-end p-4 bg-linear-to-t from-[#00000088] from-[10%] to-[#ffffff44]">
                    <h3 className="text-white text-lg font-bold">{movie.title}</h3>
                    <p className="text-gray-300 text-sm mt-1">{movie.Genre.name} • ⭐️ {movie.rating}</p>
                    <button 
                        className="mt-3 opacity-100 bg-blue-600 text-white p-4 pt-1.5 pb-1.5 rounded hover:bg-blue-700 w-full"
                        onClick={handleDetails}
                    >
                    Details
                    </button>
                    
                </div>
            </div>
        </>
    )
}