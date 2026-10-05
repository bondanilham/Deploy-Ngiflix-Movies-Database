import { NavLink } from "react-router"

export default function NavBar(){
    return (
        <>
            <nav className="bg-[url('./assets/1154.jpg')] bg-local bg-cover">  
                <header className="grid grid-cols-3 items-center p-5 bg-[#1b1b1b] rounded-b-2xl">
                    <div className="flex">
                        <NavLink to="/pub/movies" className="font-bold pt-1 text-white text-4xl">
                            Ngi
                        </NavLink>

                        <NavLink to="/pub/movies" className="bg-[#ffa31a] rounded text-black pr-1 pt-1 text-4xl">
                            flix
                        </NavLink>
                    </div>

                    <div className="flex justify-center gap-1 text-white">
                        <NavLink 
                            to="/pub/movies" 
                            className={({ isActive }) => 
                                `px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
                                    isActive 
                                    ? "bg-[#292929] text-[#ffa31a] shadow-inner" 
                                    : "text-gray-400 hover:bg-[#292929] hover:text-white"
                                }`
                            }
                        >
                            Movies
                        </NavLink>
                        
                        <NavLink 
                            to="/pub/genres" 
                            className={({ isActive }) => 
                                `px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
                                    isActive 
                                    ? "bg-[#292929] text-[#ffa31a] shadow-inner" 
                                    : "text-gray-400 hover:bg-[#292929] hover:text-white"
                                }`
                            }
                        >
                            Genres
                        </NavLink>
                    </div>

                    <div className="flex justify-end">
                        <a
                            href="https://github.com/bondanilham"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition-transform duration-300"
                        >
                            <img 
                                src=".src/assets/github.webp" 
                                alt="GitHub Profile" 
                                className="w-10 h-10 object-contain" 
                            />
                        </a>
                    </div>
                </header>

                <div className="text-white bg-linear-to-t from-[#00000088] from-[60%] to-[#ffffff44] pb-3">
                <h1 className="text-center pt-5 text-4xl">NGIFLIX</h1>
                <p className="text-center">Your most trusted source of Movies Database</p>
                </div>
            </nav>
        </>
    )
}