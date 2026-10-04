import { BrowserRouter, Routes, Route } from "react-router";
import BaseLayout from "./pages/BaseLayout";

import LoginPage from "./pages/LoginPage";
import MoviesPage from "./pages/MoviesPage";
import GenresPage from "./pages/GenresPage";
import AddStaff from "./pages/AddStaff";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";
import PatchMovie from "./pages/PatchMovie";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="users/login" element={<LoginPage />} />
          <Route element={<BaseLayout />}>
            <Route path='/movies' element={<MoviesPage />} />
            <Route path='/add/movies' element={<AddMovie />} />
            <Route path='/movies/edit/:id' element={<EditMovie />} />
            <Route path='/movies/patch/:id' element={<PatchMovie />} />
            <Route path='/genres' element={<GenresPage />} />
            <Route path='/users/register' element={<AddStaff />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
