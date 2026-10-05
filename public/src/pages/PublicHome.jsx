import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import axios from "axios"
import { baseUrl } from "../constants/baseUrl";
import { useLocation } from "react-router";

export default function PublicHome(){
    const location = useLocation()

    const [loading, setLoading] = useState(false)
    const [genres, setGenres] = useState([])
    const [movies, setMovies] = useState([])

    const [filter, setFilter] = useState(location.state ? location.state.selectedGenre : "")
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("") 
    const [page, setPage] = useState(1)

    const [currentPage, setCurrentPage] = useState(0)
    const [maxPage, setMaxPage] = useState(0)


    async function fetchGenres(){
        try {
            const {data} = await axios.get(`${baseUrl}/pub/genres`)
            // console.log(data.data, "INI GENREE"); 
            setGenres(data.data)
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false)
        }
    }
    
    async function fetchMovies(){
        setLoading(true)
        try {
            const {data} = await axios.get(`${baseUrl}/pub/movies?sort=${sort}&filter=${filter}&search=${search}&page=${page}`)
            // console.log(data); 
            setMovies(data.data)
            console.log(data,"<<<<<<<<<<<<<<<<");
            setCurrentPage(data.meta.currentPage)
            setMaxPage(data.meta.maxPage)
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false)
        }
    }

    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const handleNext = () => {
        if (page < maxPage) {
            setPage(page + 1)
        }
    }
    
    useEffect(() =>{
        fetchGenres()
    }, [])

    useEffect(()=>{
        fetchMovies()
    }, [page, sort, filter, search])

    
    // console.log(genres, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    return (
        <>
            <div className="bg-linear-to-b from-[#292929] from-70% to-[#1b1b1b] to-90% min-h-screen">

{/* FILTER / SEARCH / SORT BY */}
                <div className="flex p-3 justify-around">
                    <div className="flex-wrap gap-1 justify-center">
                        <p className="p-1 text-white">Filter:</p>
{/* FILTER */}
                        <div className="bg-[#ffa31a] p-1 rounded">
                            <select 
                                name="genre" 
                                id="" 
                                className=""
                                defaultValue=""
                                onChange={(e) => {
                                    setFilter(e.target.value)
                                    setPage(1)
                                }}
                            >
                                <option value="">Pilih Genre</option>
                            {/* looping genres */}
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.name}>
                                    {genre.name}
                                </option>
                            ))}
                            </select>
                        </div>
                    </div>
                    <div>
{/* SEARCH */}
                    <form action="" className="gap-0 pt-3" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            name="search"
                            placeholder="Search Movies"
                            id=""
                            className="bg-white p-1 pl-3 rounded-l-2xl"
                            onChange={(e) => {
                                setSearch(e.target.value)
                                setPage(1)
                            }}
                        />
                        <button type="submit" className="rounded-r-2xl bg-white p-1 pr-3 cursor-pointer">
                        🔍
                        </button>
                    </form>
                    </div>
{/* SORT BY */}
                    <div className="flex-wrap">
                    <p className="text-white p-1">Sort By:</p>
                    <div className="flex gap-2">
                        <button onClick={() => {setSort("DESC"); setPage(1)}} className={`rounded p-1 mb-1 cursor-pointer transition-colors ${sort === "DESC" ? "bg-[#ffa31a] text-black font-bold" : "bg-[#ffa31a] text-black hover:bg-orange-500"}`}>Newest</button>
                        <button onClick={() => {setSort("ASC"); setPage(1)}} className={`rounded p-1 mb-1 cursor-pointer transition-colors ${sort === "ASC" ? "bg-[#ffa31a] text-black font-bold" : "bg-[#ffa31a] text-black hover:bg-orange-500"}`}>Oldest</button>
                    </div>
                    </div>
                </div>

{/* CARD */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 mx-auto max-w-7xl justify-items-center">
                    {/* {movies.map((movie,index)=>{
                        return <Cards key={movie.id} movie={movie} index={index}/>
                    })} */}
                    {loading ? (
                        <div className="col-span-full flex flex-col justify-center items-center h-full">
                            <img src="/src/assets/loading.gif" alt="Loading..." className="w-full" />
                        </div>
                    ) : movies.length > 0 ? (
                        movies.map((movie,index)=>{
                            return <Cards key={movie.id} movie={movie} index={index}/>
                        })
                    ) : (
                        <div className="col-span-full flex justify-center items-center h-full">
                            <p className="text-white text-xl">Movie not found.</p>
                        </div>
                    )}
                </div>
{/* PAGINATION */}
                <div className="p-3 flex text-white gap-3 justify-center">
                    <button 
                        onClick={handlePrev} 
                        disabled={page <= 1}
                        className={`px-3 py-1 rounded-lg ${page <= 1 ? 'bg-gray-600 opacity-50 cursor-not-allowed' : 'bg-[#ffa31a] hover:bg-orange-500 text-black'} cursor-pointer`}
                    >
                        &lt;
                    </button>
                    
                    <p className="font-semibold">{currentPage} / {maxPage}</p>
                    
                    <button 
                        onClick={handleNext}
                        disabled={page >= maxPage}
                        className={`px-3 py-1 rounded-lg ${page >= maxPage ? 'bg-gray-600 opacity-50 cursor-not-allowed' : 'bg-[#ffa31a] hover:bg-orange-500 text-black'} cursor-pointer`}
                    >
                        &gt;
                    </button>
                </div>
                <div className="items-center">
                    <h2 className="text-white text-3xl font-bold text-center mb-8 tracking-wide">
                        Testimonies
                    </h2>
                    <div className="flex text-white justify-center gap-3">
                    <div>
                        <a className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium">
                        <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">
                            "The best Movie DB I've ever used."
                        </h5>
                        <p className="text-body">
                            -Christopher Nolan, director of Interstellar
                        </p>
                        </a>
                    </div>
                    <div>
                        <a className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium">
                        <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">
                            "HEEHEEEEE. SHAMONE!"
                        </h5>
                        <p className="text-body">-Michael Jackson</p>
                        </a>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}