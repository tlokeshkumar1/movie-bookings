import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useMovieStore } from '../store/movies';

export default function Booking() {
  const navigate = useNavigate();
  const { movies, setSelectedMovie } = useMovieStore();
  const [search, setSearch] = useState('');

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleMovieClick = (movie: typeof movies[0]) => {
    setSelectedMovie(movie);
    navigate('/selection');
  };

  return (
    <div>
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => handleMovieClick(movie)}
            className="cursor-pointer group"
          >
            <div className="aspect-[16/9] rounded-lg overflow-hidden mb-2">
              <img
                src={movie.image}
                alt={movie.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-medium">
              {movie.name} ({movie.year})
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}