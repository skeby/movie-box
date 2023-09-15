import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import NotFoundPage from './pages/PageNotFound/index.js';

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path = "/" element = {<HomePage />} />
            <Route path = "/movie/:id" element = {<MovieDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;