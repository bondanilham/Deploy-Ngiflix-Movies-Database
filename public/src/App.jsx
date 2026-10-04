// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";

// import './App.css'
import PublicHome from './pages/PublicHome';
import BaseLayout from './pages/BaseLayout';
import PublicGenres from "./pages/PublicGenres";
import MovieDetails from "./pages/PublicMovieDetails";

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<BaseLayout/>}>
            <Route path='/pub/movies' element={<PublicHome />} />
            <Route path='/pub/genres' element={<PublicGenres />} />
            <Route path='/pub/movies/:id' element={<MovieDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
