import { create } from 'zustand';
import { MovieState } from '../types';

const MOVIES = [
  {
    id: '1',
    name: 'Maharshi',
    year: 2019,
    image: 'https://daex9l847wg3n.cloudfront.net/shemoutputimages/Maharshi/62bc7df8dde7159b43000070/large_16_9_1678345784.webp'
  },
  {
    id: '2',
    name: 'Lucky Bhaskar',
    year: 2022,
    image: 'https://images.unsplash.com/photo-1628432136678-43ff9be34064?w=800&h=600&fit=crop',
  },
  {
    id: '3',
    name: 'Goodachari',
    year: 2018,
    image: 'https://wallpapercave.com/wp/wp8714584.jpg'
  },
  {
    id: '4',
    name: 'Major',
    year: 2021,
    image: 'https://images.unsplash.com/photo-1628432136678-43ff9be34064?w=800&h=600&fit=crop'
  },
  {
    id: '5',
    name: 'Avengers: Endgame',
    year: 2019,
    image: 'https://images.unsplash.com/photo-1628432136678-43ff9be34064?w=800&h=600&fit=crop'
  },
  {
    id: '6',
    name: 'Hit: The Second Case',
    year: 2020,
    image: 'https://images.unsplash.com/photo-1628432136678-43ff9be34064?w=800&h=600&fit=crop'
  }
];

export const useMovieStore = create<MovieState>((set) => ({
  movies: MOVIES,
  selectedMovie: null,
  setSelectedMovie: (movie) => set({ selectedMovie: movie })
}));